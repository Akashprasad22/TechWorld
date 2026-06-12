# 🔧 TROUBLESHOOTING GUIDE

## 🚨 "Site Can't Be Reached" - SOLUTIONS

### **Step 1: Use the New Startup Script**
```bash
start-project.bat
```
This will:
- Kill any existing processes on ports 3000/5000
- Start backend server first
- Start frontend client
- Test connections
- Give you clear status

### **Step 2: Manual Start (if script doesn't work)**

#### **Start Backend First:**
```bash
cd c:\Users\akash\OneDrive\Desktop\amazon
node server/server.js
```
Wait for "Server running on port 5000" message

#### **Start Frontend (in separate terminal):**
```bash
cd c:\Users\akash\OneDrive\Desktop\amazon\client
npm start
```
Wait for "Compiled successfully!" message

### **Step 3: Check Port Conflicts**

#### **Kill Processes on Ports:**
```bash
npx kill-port 3000
npx kill-port 5000
```

#### **Check What's Running:**
```bash
netstat -ano | findstr :3000
netstat -ano | findstr :5000
```

### **Step 4: Verify Dependencies**

#### **Reinstall All Dependencies:**
```bash
cd c:\Users\akash\OneDrive\Desktop\amazon
npm run install-all
```

#### **Check Node.js Version:**
```bash
node --version
npm --version
```

### **Step 5: Test Individual Servers**

#### **Test Backend:**
```bash
curl http://localhost:5000
```
Should return: `{"message": "MERN E-commerce API is running!"}`

#### **Test Frontend:**
Open http://localhost:3000 directly in browser

### **Step 6: Check MongoDB**

#### **Make Sure MongoDB is Running:**
- Check MongoDB service is running
- Try connecting with MongoDB Compass
- Connection string: `mongodb://127.0.0.1:27017/techhub`

### **Step 7: Browser Issues**

#### **Clear Browser Cache:**
- Press Ctrl+Shift+Delete
- Clear cache and cookies
- Restart browser

#### **Try Different Browser:**
- Chrome, Firefox, Edge
- Incognito/Private mode

#### **Check Firewall/Antivirus:**
- Temporarily disable firewall
- Add Node.js to antivirus exceptions
- Check if ports 3000/5000 are blocked

### **Step 8: Network Issues**

#### **Check Hosts File:**
```
C:\Windows\System32\drivers\etc\hosts
```
Make sure localhost is not blocked

#### **Reset Network:**
```bash
ipconfig /flushdns
netsh winsock reset
```

---

## 🎯 **QUICK FIX SEQUENCE**

1. **Run**: `start-project.bat`
2. **Wait**: 10-15 seconds
3. **Open**: http://localhost:3000
4. **If still fails**: Try manual start
5. **Check ports**: `netstat -ano | findstr :3000`
6. **Kill processes**: `npx kill-port 3000 && npx kill-port 5000`
7. **Reinstall**: `npm run install-all`
8. **Restart**: `start-project.bat`

---

## 📞 **COMMON ERRORS & SOLUTIONS**

### **"Port already in use"**
```bash
npx kill-port 3000
npx kill-port 5000
```

### **"Module not found"**
```bash
npm run install-all
```

### **"MongoDB connection failed"**
- Start MongoDB service
- Check connection string in .env
- Use: `mongodb://127.0.0.1:27017/techhub`

### **"Compiled with warnings"**
- Ignore warnings for now
- Focus on getting servers running
- Fix warnings later

### **"Site can't be reached"**
- Wait 10-15 seconds after starting servers
- Check both terminals for success messages
- Try http://localhost:3000 and http://localhost:5000

---

## 🚀 **SUCCESS INDICATORS**

### **✅ Backend Success:**
```
✅ MongoDB Connected Successfully!
🚀 Server is running on port 5000
📍 URL: http://localhost:5000
```

### **✅ Frontend Success:**
```
Compiled successfully!
You can now view techhub-client in the browser.
  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

### **✅ Browser Success:**
- Homepage loads with your e-commerce interface
- Can navigate between pages
- Products display correctly
- Cart functionality works

---

## 🆘 **IF NOTHING WORKS**

### **Last Resort Options:**
1. **Restart Computer** - Clears all port conflicts
2. **Use Different Ports** - Edit .env to use 3001/5001
3. **Check System Resources** - Close other applications
4. **Reinstall Node.js** - Fresh installation
5. **Use Different IDE** - Try VS Code instead

---

**🎯 Most Common Solution: Run `start-project.bat` and wait 10-15 seconds!**
