// Test script to verify server functionality
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/',
  method: 'GET',
  timeout: 2000
};

const req = http.request(options, (res) => {
  console.log(`✅ Server responded with status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log('✅ Server response:', response.message);
      console.log('✅ Database status:', response.status);
      console.log('🎉 Server is working correctly!');
    } catch (error) {
      console.log('✅ Server responded but with non-JSON data');
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (error) => {
  console.log('❌ Server connection failed:', error.message);
  console.log('💡 Make sure the server is running with: npm run server');
});

req.on('timeout', () => {
  console.log('❌ Server request timed out');
  console.log('💡 Make sure the server is running on port 5000');
  req.destroy();
});

req.end();
