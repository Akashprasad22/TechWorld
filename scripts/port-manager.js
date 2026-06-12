#!/usr/bin/env node

/**
 * Port Management Utility
 * Helps manage port conflicts and processes
 */

const { exec } = require('child_process');
const net = require('net');

const commands = {
  check: 'Check if a port is in use',
  kill: 'Kill process on a specific port',
  list: 'List all processes on specified ports',
  free: 'Check and free ports if needed'
};

function showHelp() {
  console.log('🔧 Port Management Utility');
  console.log('');
  console.log('Usage:');
  console.log('  node scripts/port-manager.js <command> [options]');
  console.log('');
  console.log('Commands:');
  Object.entries(commands).forEach(([cmd, desc]) => {
    console.log(`  ${cmd.padEnd(10)} - ${desc}`);
  });
  console.log('');
  console.log('Examples:');
  console.log('  node scripts/port-manager.js check 5000');
  console.log('  node scripts/port-manager.js kill 5000');
  console.log('  node scripts/port-manager.js list 5000,5001,5002');
  console.log('  node scripts/port-manager.js free 5000');
}

function checkPort(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.listen(port, () => {
      server.once('close', () => {
        resolve(false); // Port is free
      });
      server.close();
    });
    
    server.on('error', () => {
      resolve(true); // Port is in use
    });
  });
}

async function isPortInUse(port) {
  const inUse = await checkPort(port);
  console.log(`📍 Port ${port}: ${inUse ? '🔴 IN USE' : '🟢 FREE'}`);
  return inUse;
}

function killProcessOnPort(port) {
  return new Promise((resolve, reject) => {
    const command = process.platform === 'win32' 
      ? `netstat -ano | findstr :${port}`
      : `lsof -ti:${port}`;
    
    console.log(`🔍 Checking processes on port ${port}...`);
    
    exec(command, (error, stdout, stderr) => {
      if (error || !stdout) {
        console.log(`✅ No process found on port ${port}`);
        resolve(false);
        return;
      }
      
      console.log(`📋 Found processes on port ${port}:`);
      console.log(stdout);
      
      if (process.platform === 'win32') {
        // Windows: Parse netstat output to get PID
        const lines = stdout.trim().split('\n');
        let killed = false;
        
        for (const line of lines) {
          const parts = line.trim().split(/\s+/);
          const pid = parts[parts.length - 1];
          
          if (pid && pid !== 'PID' && !isNaN(pid)) {
            console.log(`🔄 Killing process ${pid} on port ${port}...`);
            
            exec(`taskkill /PID ${pid} /F`, (killError, killStdout, killStderr) => {
              if (killError) {
                console.log(`❌ Failed to kill process ${pid}: ${killError.message}`);
              } else {
                console.log(`✅ Killed process ${pid} on port ${port}`);
                killed = true;
              }
            });
          }
        }
        
        setTimeout(() => resolve(killed), 1000);
      } else {
        // Unix/Linux: Kill process directly
        const pids = stdout.trim().split('\n').filter(pid => pid.trim());
        
        pids.forEach(pid => {
          console.log(`🔄 Killing process ${pid} on port ${port}...`);
          exec(`kill -9 ${pid}`, (killError) => {
            if (killError) {
              console.log(`❌ Failed to kill process ${pid}: ${killError.message}`);
            } else {
              console.log(`✅ Killed process ${pid} on port ${port}`);
            }
          });
        });
        
        setTimeout(() => resolve(pids.length > 0), 1000);
      }
    });
  });
}

async function listPorts(portString) {
  const ports = portString.split(',').map(p => parseInt(p.trim())).filter(p => !isNaN(p));
  
  if (ports.length === 0) {
    console.log('❌ Invalid port numbers provided');
    return;
  }
  
  console.log(`🔍 Checking ports: ${ports.join(', ')}`);
  console.log('');
  
  for (const port of ports) {
    await isPortInUse(port);
  }
}

async function freePort(port) {
  console.log(`🔧 Attempting to free port ${port}...`);
  
  const inUse = await isPortInUse(port);
  
  if (!inUse) {
    console.log(`✅ Port ${port} is already free`);
    return true;
  }
  
  const killed = await killProcessOnPort(port);
  
  if (killed) {
    console.log(`⏳ Waiting 2 seconds for port to be released...`);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const stillInUse = await isPortInUse(port);
    if (!stillInUse) {
      console.log(`✅ Port ${port} is now free`);
      return true;
    } else {
      console.log(`❌ Port ${port} is still in use`);
      return false;
    }
  } else {
    console.log(`❌ Could not free port ${port}`);
    return false;
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    showHelp();
    return;
  }
  
  const command = args[0].toLowerCase();
  
  switch (command) {
    case 'check':
      if (args.length < 2) {
        console.log('❌ Please specify a port number');
        console.log('Usage: node scripts/port-manager.js check <port>');
        return;
      }
      const portToCheck = parseInt(args[1]);
      if (isNaN(portToCheck)) {
        console.log('❌ Invalid port number');
        return;
      }
      await isPortInUse(portToCheck);
      break;
      
    case 'kill':
      if (args.length < 2) {
        console.log('❌ Please specify a port number');
        console.log('Usage: node scripts/port-manager.js kill <port>');
        return;
      }
      const portToKill = parseInt(args[1]);
      if (isNaN(portToKill)) {
        console.log('❌ Invalid port number');
        return;
      }
      await killProcessOnPort(portToKill);
      break;
      
    case 'list':
      if (args.length < 2) {
        console.log('❌ Please specify ports (comma-separated)');
        console.log('Usage: node scripts/port-manager.js list <port1,port2,port3>');
        return;
      }
      await listPorts(args[1]);
      break;
      
    case 'free':
      if (args.length < 2) {
        console.log('❌ Please specify a port number');
        console.log('Usage: node scripts/port-manager.js free <port>');
        return;
      }
      const portToFree = parseInt(args[1]);
      if (isNaN(portToFree)) {
        console.log('❌ Invalid port number');
        return;
      }
      await freePort(portToFree);
      break;
      
    case 'help':
    case '--help':
    case '-h':
      showHelp();
      break;
      
    default:
      console.log(`❌ Unknown command: ${command}`);
      console.log('');
      showHelp();
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });
}

module.exports = {
  checkPort,
  isPortInUse,
  killProcessOnPort,
  freePort,
  listPorts
};
