# 🔧 Troubleshooting Guide - LinguaVerse

## 🚨 Common Errors & Solutions

### 1. Webpack Cache Error (EPERM: operation not permitted)

**Error Message:**
```
[webpack.cache.PackFileCacheStrategy] Caching failed for pack: Error: EPERM: operation not permitted
```

**Why This Happens:**
- 🔒 **Windows file system locks** - Files are being used by another process
- 🛡️ **Antivirus software** - Interfering with file operations  
- ☁️ **OneDrive sync** - Your project is in OneDrive which can cause conflicts
- 💾 **Webpack cache corruption** - Cache files got corrupted

**Quick Fix:**
```powershell
# Use the improved startup script
.\start-dev.ps1
```

**Manual Fix:**
```powershell
# 1. Kill all Node.js processes
taskkill /f /im node.exe

# 2. Remove cache directories
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm cache clean --force

# 3. Restart
npm run dev-clean
```

### 2. Port 3000 Already in Use

**Error Message:**
```
⚠ Port 3000 is in use, trying 3001 instead.
```

**Quick Fix:**
```powershell
# Use the startup script
.\start-dev.ps1
```

**Manual Fix:**
```powershell
# Find and kill processes on port 3000
netstat -ano | Select-String ":3000" | ForEach-Object { ($_ -split '\s+')[4] } | ForEach-Object { Stop-Process -Id $_ -Force }
```

### 3. Build Errors (EINVAL: invalid argument, readlink)

**Error Message:**
```
Error: EINVAL: invalid argument, readlink '.next/static/chunks/app'
```

**Quick Fix:**
```powershell
# Use the startup script
.\start-dev.ps1
```

**Manual Fix:**
```powershell
# Remove corrupted .next directory
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm install
npm run dev-clean
```

## 🛠️ Prevention Tips

### 1. Always Use the Startup Script
```powershell
.\start-dev.ps1
```
This script automatically:
- ✅ Kills conflicting processes
- ✅ Cleans cache directories
- ✅ Handles OneDrive conflicts
- ✅ Starts server properly

### 2. Avoid OneDrive Conflicts
If possible, move your project outside OneDrive:
```powershell
# Move to C:\Projects\linguaverse-landing
# Instead of C:\Users\shiva\OneDrive\Desktop\linguaverse-landing
```

### 3. Disable Antivirus for Development
Add your project folder to antivirus exclusions:
- Windows Defender
- Other antivirus software

### 4. Use Alternative Cache Strategy
If issues persist, the `next.config.mjs` already disables webpack cache in development.

## 🚀 Recommended Workflow

1. **Always start with:**
   ```powershell
   .\start-dev.ps1
   ```

2. **If you get errors:**
   - Check this troubleshooting guide
   - Use the manual fixes above
   - Restart your computer if needed

3. **For production builds:**
   ```bash
   npm run build
   npm start
   ```

## 📞 Still Having Issues?

1. **Check Windows Event Viewer** for file system errors
2. **Update Node.js** to latest LTS version
3. **Clear all caches:**
   ```powershell
   npm cache clean --force
   Remove-Item -Recurse -Force node_modules
   npm install
   ```

4. **Restart your computer** - Sometimes Windows needs a fresh start

---

**💡 Pro Tip:** The `start-dev.ps1` script handles 90% of these issues automatically! 