# Node.js Installation Instructions

## Windows
1. Go to https://nodejs.org/
2. Download the **LTS** (Long Term Support) version
3. Run the installer
4. Make sure "Add to PATH" is checked during installation
5. Restart your command prompt/PowerShell

## Verification
Open a new command prompt and run:
```bash
node -v
npm -v
```

You should see version numbers like:
```
v18.18.0
9.8.1
```

## If Still Not Working
1. Check if Node.js is installed:
   ```bash
   where node
   where npm
   ```

2. If not found, reinstall Node.js with PATH option

3. Add Node.js to PATH manually:
   - Find Node.js installation (usually `C:\Program Files\nodejs\`)
   - Add to System Environment Variables PATH
   - Restart command prompt

## MongoDB (Optional)
The application works without MongoDB, but for full functionality:
1. Download MongoDB Community Server
2. Install with default settings
3. Start MongoDB service

## Quick Start After Installation
```bash
# Run the setup script
setup.bat

# Or manually:
npm install
npm run install-client
npm run dev
```
