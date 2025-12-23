# 🔨 Building FocusFlow Windows Executable (.exe)

## Overview

FocusFlow can be packaged as a standalone Windows executable using **electron-builder**. This guide covers the complete build process.

---

## Prerequisites

✅ **Node.js 18+** - Download from https://nodejs.org/  
✅ **npm 8+** - Included with Node.js  
✅ **Windows 7 or later** - For running the build  
✅ **Administrator privileges** - Required for build process  

### Verify Installation

```powershell
node --version  # Should be v18.0.0 or higher
npm --version   # Should be 8.0.0 or higher
```

---

## Step 1: Clone & Install

```powershell
# Clone the repository
git clone https://github.com/solecitofo/FocusFlow.git
cd FocusFlow

# Install dependencies
npm install
```

Expected time: **2-5 minutes**

---

## Step 2: Build for Windows

### ⚠️ IMPORTANT: Run as Administrator

FocusFlow uses Electron which creates symbolic links during build. This requires **Administrator privileges**.

### Option A: PowerShell (Recommended)

1. **Right-click PowerShell**
2. **Select "Run as Administrator"**
3. **Navigate to project:**
   ```powershell
   cd C:\Users\YourUsername\Desktop\FocusFlow
   ```
4. **Run build command:**
   ```powershell
   npm run package-win
   ```

### Option B: Command Prompt (CMD)

1. **Right-click Command Prompt (cmd.exe)**
2. **Select "Run as Administrator"**
3. **Navigate and build:**
   ```cmd
   cd C:\Users\YourUsername\Desktop\FocusFlow
   npm run package-win
   ```

### Option C: Batch Script (Automated)

Save as `build-focusflow.bat`:
```batch
@echo off
REM Run as Administrator required!
cd /d "%~dp0"
call npm run package-win
pause
```

Then right-click → "Run as Administrator"

---

## Step 3: Monitor Build Progress

The build process includes:

```
1. Vite build (React + Electron assets)
   └─ Optimizes JavaScript, CSS, images
   └─ Takes ~30-60 seconds

2. electron-builder packaging
   └─ Creates unpacked distribution
   └─ Takes ~30-90 seconds
   
3. Final verification
   └─ Generates FocusFlow.exe
   └─ Size: ~172 MB
```

### Expected Output

```
✔ Vite build successful
✔ electron-builder packaging
✔ FocusFlow.exe created
✔ Build complete!
```

---

## Step 4: Verify Build Output

### Find Your Executable

```powershell
cd C:\Users\YourUsername\Desktop\FocusFlow
dir .\dist\win-unpacked\FocusFlow.exe
```

Should show:
```
Directory: C:\...\FocusFlow\dist\win-unpacked

Mode    Size      Name
----    ----      ----
-a---  172000KB  FocusFlow.exe
```

### Test the Executable

1. **Double-click** `FocusFlow.exe` from File Explorer
2. **Or run from PowerShell:**
   ```powershell
   .\dist\win-unpacked\FocusFlow.exe
   ```
3. **Verify:**
   - Window opens with FocusFlow logo
   - Can add tasks
   - Can complete tasks
   - See reward animations

---

## Step 5: Distribute the Executable

### For Direct Distribution

```powershell
# Copy executable to distribution folder
Copy-Item .\dist\win-unpacked\FocusFlow.exe .\FocusFlow-v1.0.0.exe

# Users can now run directly without installation
# No DLL dependencies, includes Chromium runtime
```

### For GitHub Releases

```powershell
# Tag version
git tag v1.0.0
git push origin v1.0.0

# GitHub Actions auto-builds and creates release
# FocusFlow.exe appears in GitHub Releases page
```

### For Installation Package (Optional - NSIS)

To create a professional installer instead of portable .exe:

1. **Edit `package.json`** build config:
   ```json
   "win": {
     "target": ["nsis"]
   }
   ```

2. **Run build:**
   ```powershell
   npm run package-win
   ```

3. **Output:**
   - `release/FocusFlow Setup 1.0.0.exe` (installer)

---

## Troubleshooting

### ❌ "Permission denied" or "Access denied"

**Cause:** Not running as Administrator

**Fix:**
```powershell
# Right-click PowerShell → "Run as Administrator"
# Then run: npm run package-win
```

### ❌ "asar module not found" or symlink errors

**Cause:** Electron-builder symlink creation failed

**Fix:** Already handled in `package.json`:
```json
"build": {
  "asar": false
}
```

This disables .asar binary packing that requires special permissions.

### ❌ "Port 5173 already in use"

**Cause:** Vite dev server still running

**Fix:**
```powershell
# Kill the process
Get-Process node | Stop-Process

# Then retry build
npm run package-win
```

### ❌ "dist directory not found"

**Cause:** Vite build failed

**Fix:**
```powershell
# Clean and rebuild
Remove-Item dist -Recurse -Force
npm run build
npm run package-win
```

### ❌ "Build file too large" (GitHub error)

**Cause:** Pushing .exe to git repository

**Fix:** Already handled in `.gitignore`:
```
dist/
release/
*.exe
```

Never commit build artifacts to git. Only source code.

---

## Build Command Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite dev server (localhost:5173) |
| `npm run build` | Build React/Vite bundle to dist/ |
| `npm run electron-dev` | Launch Electron with dev server |
| `npm run package-win` | Full Windows build (Vite + electron-builder) |
| `npm run package-mac` | Full macOS build |
| `npm run package-linux` | Full Linux build |

---

## Build Output Explanation

### Directory Structure After Build

```
FocusFlow/
├── dist/
│   ├── index.html              # HTML entry point
│   ├── favicon.ico             # Favicon
│   └── assets/
│       ├── index-*.js          # Bundled React code
│       ├── index-*.css         # Bundled styles
│       └── *.png               # Optimized images
│
├── release/  (if NSIS installer enabled)
│   ├── FocusFlow Setup 1.0.0.exe
│   └── builder-effective-config.yaml
│
└── dist/win-unpacked/          ← YOUR EXECUTABLE
    ├── FocusFlow.exe           (172 MB, portable)
    ├── electron.exe
    ├── resources/
    │   └── app/
    │       ├── dist/           (React build)
    │       ├── electron.js
    │       └── package.json
    └── [Chromium runtime & dependencies]
```

---

## Performance Metrics

### Build Time

| Stage | Duration |
|-------|----------|
| npm install | 2-5 min (first time only) |
| npm run build (Vite) | 30-60 sec |
| electron-builder | 30-90 sec |
| **Total** | **1-3 min** |

### Output Size

| Component | Size |
|-----------|------|
| Electron runtime | ~150 MB |
| React app bundle | ~5 MB |
| Assets (PNG) | ~2 MB |
| **Total executable** | **~172 MB** |

---

## Advanced Options

### Custom Build Configuration

Edit `vite.config.js` for Vite options:
```javascript
export default {
  build: {
    minify: 'terser',        // Minification
    sourcemap: false,        // No source maps
    rollupOptions: {}        // Rollup config
  }
}
```

Edit `package.json` `build` section for electron-builder:
```json
"build": {
  "appId": "com.tdah.focusflow",
  "productName": "FocusFlow",
  "win": {
    "certificateFile": "",   // For code signing
    "certificatePassword": ""
  }
}
```

### Code Signing (Optional)

For code-signed executable (removes "Unknown Publisher" warning):

```json
"win": {
  "target": ["portable"],
  "certificateFile": "path/to/certificate.pfx",
  "certificatePassword": "your-password",
  "signingHashAlgorithms": ["sha256"],
  "timeStampServer": "http://timestamp.comodoca.com"
}
```

---

## What Gets Included in the Executable

✅ React 18 application code  
✅ Tailwind CSS styling  
✅ Lucide React icons  
✅ Custom Canva assets (logo, illustrations)  
✅ Electron runtime (Chromium browser)  
✅ Node.js integration  
✅ localStorage for data persistence  

❌ node_modules/ (bundled differently)  
❌ Source maps  
❌ Development dependencies  

---

## Distribution Recommendations

### For Single Users
```
$ .\FocusFlow.exe
→ Works immediately, no installation
```

### For Multiple Users
```
Option 1: Share FocusFlow.exe file directly
Option 2: Create ZIP archive with FocusFlow.exe
Option 3: Create NSIS installer for professional deployment
Option 4: Host on GitHub Releases for auto-updates
```

### For Organization
```
1. Build executable
2. Host on secure server or GitHub
3. Distribute link to users
4. Users download and run
5. All data stored locally (no server required)
```

---

## Validation Checklist

Before distributing, verify:

- [ ] FocusFlow.exe exists in `dist/win-unpacked/`
- [ ] File size is approximately 172 MB
- [ ] Double-click opens the application
- [ ] Logo displays correctly
- [ ] Can add tasks without errors
- [ ] Can complete tasks
- [ ] See reward animation on completion
- [ ] All UI elements render properly
- [ ] No console errors (F12 dev tools)

---

## Additional Resources

- [Electron Builder Docs](https://www.electron.build/)
- [Vite Build Guide](https://vitejs.dev/guide/build.html)
- [Windows NSIS Installer](https://www.electron.build/win)
- [GitHub Actions CI/CD](.github/workflows/build.yml)

---

## Next Steps

1. ✅ Build executable with `npm run package-win`
2. ✅ Test by running `FocusFlow.exe`
3. ✅ Distribute to users
4. ✅ Users run without installation
5. ✅ Updates: Rebuild and re-distribute (or implement auto-update)

---

**Questions?** Check [README.md](README.md) or [Project Completion](PROJECT_COMPLETION.md)

Built with electron-builder & Vite for Windows 🎉

