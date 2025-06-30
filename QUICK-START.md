# 🚀 Quick Start Guide - LinguaVerse

## ⚡ Fast Start (Recommended)

### Option 1: Use the PowerShell Script (Windows)
```powershell
.\start-dev.ps1
```

### Option 2: Use the Batch Script (Windows)
```cmd
start-dev.bat
```

### Option 3: Manual Start
```bash
npm run dev-clean
```

## 🔧 Why Port 3000 Gets Busy

The port 3000 conflict happens because:
- Previous development servers are still running
- Other applications are using port 3000
- Windows sometimes doesn't release the port properly

## 🛠️ Quick Fix Commands

### Kill all processes on port 3000:
```powershell
# PowerShell
netstat -ano | Select-String ":3000" | ForEach-Object { ($_ -split '\s+')[4] } | ForEach-Object { Stop-Process -Id $_ -Force }

# Command Prompt
for /f "tokens=5" %a in ('netstat -ano ^| findstr :3000') do taskkill /PID %a /F
```

### Clean start:
```bash
# Remove .next directory
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# Start on specific port
npm run dev-clean
```

## 📱 Access Your App

- **Local:** http://localhost:3000
- **Network:** http://192.168.31.219:3000 (for mobile testing)

## 🎯 What to Do Next

1. **Open your browser** to http://localhost:3000
2. **Test the landing page** - Beautiful hero section
3. **Try translation** - Works in demo mode
4. **Sign up/login** - Full authentication system
5. **Explore features** - Voice, history, profile

## 🚨 Troubleshooting

### If you see "Port 3000 is in use":
1. Run the PowerShell script: `.\start-dev.ps1`
2. Or manually kill processes and restart
3. The scripts will handle this automatically

### If you see build errors:
1. Delete `.next` folder
2. Run `npm install`
3. Start with `npm run dev-clean`

---

**💡 Pro Tip:** Always use `npm run dev-clean` or the scripts to avoid port conflicts! 