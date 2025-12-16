# 🎯 FocusFlow - Quick Start Guide

**FocusFlow** is an ADHD-friendly desktop task management application for Windows, macOS, and Linux.

## 📥 Installation (Windows Users)

### Option 1: Run Portable Executable (Recommended)
```
1. Download FocusFlow.exe from GitHub Releases
2. Double-click FocusFlow.exe
3. Start managing tasks!
```
- No installation required
- Runs on Windows 7+
- All data stored locally

### Option 2: Build from Source
```bash
git clone https://github.com/solecitofo/FocusFlow.git
cd FocusFlow
npm install
npm run package-win  # Requires admin PowerShell
```

---

## 🚀 Using FocusFlow

### Views & Features

| View | Purpose | Gradient |
|------|---------|----------|
| **Home** | Dashboard with time & quick actions | Blue |
| **Quick Capture** | Fast task entry (title only) | Blue |
| **Detailed Capture** | Rich task (title + description) | Purple |
| **Task List** | All active tasks grid | Green |
| **Task Detail** | Edit/complete individual task | Teal |
| **Achievements** | Completed tasks + rewards | Yellow/Orange |

### Basic Workflow

1. **Add Task** → Quick or Detailed capture
2. **View Tasks** → Task list shows all active items
3. **Complete Task** → Click "Completar" button
4. **Get Reward** → Random motivational message appears
5. **View Achievements** → See completed tasks history

---

## ⚙️ Development Setup

### Requirements
- Node.js 18+ (https://nodejs.org)
- npm 8+
- Git

### Setup (3 steps)
```bash
# 1. Clone repository
git clone https://github.com/solecitofo/FocusFlow.git
cd FocusFlow

# 2. Install dependencies
npm install

# 3. Start development (2 terminals)
# Terminal 1:
npm run dev

# Terminal 2:
npm run electron-dev
```

Auto-reloads on file changes via HMR.

---

## 🔨 Building for Production

### Windows Executable
```bash
# Requires administrator privileges
npm run package-win
```
Output: `dist/win-unpacked/FocusFlow.exe` (172 MB)

### macOS Bundle
```bash
npm run package-mac
```

### Linux AppImage
```bash
npm run package-linux
```

---

## 📂 Project Structure

```
FocusFlow/
├── src/
│   ├── App.jsx              # Main React component
│   ├── assets/              # Logos, illustrations, icons
│   │   ├── logos/           # FocusFlow branding
│   │   ├── illustrations/   # Empty state & mascot
│   │   └── icons/           # UI icon templates
│   ├── index.css            # Tailwind styles
│   └── main.jsx             # Vite entry
├── electron.js              # Desktop app main process
├── package.json             # Dependencies & build config
├── vite.config.js           # Build settings
├── index.html               # HTML template
├── README.md                # Full documentation
├── PROJECT_COMPLETION.md    # What's included
└── GIT_CLEANUP_SOLUTION.md  # Build troubleshooting
```

---

## 🎨 Customization

### Change Branding
Replace images in `src/assets/`:
- `logos/focusflow-logo.png` - App logo
- `illustrations/mascot.png` - Achievement mascot
- `illustrations/empty-state.png` - Empty tasks image

### Modify Colors
Edit gradients in `src/App.jsx`:
```javascript
// Change gradient colors (Tailwind classes)
bg-gradient-to-br from-blue-600 to-blue-400  // Current
bg-gradient-to-br from-purple-600 to-purple-400  // New
```

### Change Language
All Spanish strings are in `src/App.jsx`. Change locale:
```javascript
// Current: es-ES (Spanish)
// Change to: en-US (English) or your locale
toLocaleString('es-ES')  →  toLocaleString('en-US')
```

---

## 🔧 Troubleshooting

### "Admin required for build"
FocusFlow uses Electron which requires admin privileges for symbolic links on Windows.

**Solution:** Run PowerShell as Administrator, then:
```powershell
npm run package-win
```

### "npm not found"
Node.js not installed.

**Solution:** Download from https://nodejs.org (LTS version)

### "Port 5173 in use"
Vite dev server port conflict.

**Solution:** Kill the process or change port in `vite.config.js`:
```javascript
server: { port: 5174 }  // Use different port
```

### "Assets not loading"
Check browser console in dev tools.

**Solution:** Ensure `src/assets/` folder exists and images are present

---

## 📚 Documentation

- **[Full README](README.md)** - Comprehensive guide
- **[Project Completion](PROJECT_COMPLETION.md)** - What's built
- **[Git Cleanup Solution](GIT_CLEANUP_SOLUTION.md)** - Build troubleshooting
- **[Assets Guide](src/ASSETS_GUIDE.md)** - How to use images
- **[Windows Install](INSTALL_WINDOWS.md)** - User installation steps
- **[Copilot Instructions](.github/copilot-instructions.md)** - AI dev guide

---

## 🔗 Links

- **Repository:** https://github.com/solecitofo/FocusFlow
- **Issues:** https://github.com/solecitofo/FocusFlow/issues
- **Releases:** https://github.com/solecitofo/FocusFlow/releases

---

## 📋 System Requirements

**Minimum:**
- Windows 7+ / macOS 10.12+ / Linux (Ubuntu 18+)
- 200 MB free disk space
- 512 MB RAM

**Recommended:**
- Windows 10+ / macOS 11+ / Linux (Ubuntu 20+)
- 1 GB free disk space
- 2 GB RAM

---

## 💡 Tips

1. **Use Quick Capture** for rapid task entry
2. **Use Detailed Capture** for complex tasks with context
3. **Complete tasks** to see rewards and celebrate progress
4. **Review Achievements** for motivation and task history
5. **Reload app** (Ctrl+R or Cmd+R) if UI seems stuck

---

## 🤝 Contributing

Found a bug or want to suggest a feature?

1. Open an issue on GitHub
2. Fork the repository
3. Create a feature branch
4. Submit a pull request

See [Full README](README.md) for detailed contribution guide.

---

## 📄 License

FocusFlow is open source. See LICENSE file for details.

---

**Questions?** Check [Full README](README.md) or [Project Completion](PROJECT_COMPLETION.md)

Made with ❤️ for ADHD task management.

