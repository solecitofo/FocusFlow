# FocusFlow - AI Coding Agent Guide

**Project Type:** Electron + React desktop app for ADHD task management

## Architecture Overview

FocusFlow is a **single-file monolithic React component** (`src/App.jsx`) wrapped in an Electron desktop app. All UI views and logic coexist in one component with view-switching via state (`currentView`).

### Core Structure
- **Backend:** Electron main process (`electron.js`) handles window lifecycle and dev/prod routing
- **Frontend:** React component (`src/App.jsx`, 575 lines) with embedded view components
- **Styling:** Tailwind CSS 4.1 (via CDN in HTML + PostCSS pipeline)
- **Icons:** Lucide React for UI icons
- **Build:** Vite (dev server @ localhost:5173, prod build to `dist/`)

### Data Flow
```
[Electron Window] → [Vite Dev Server] → [React App] → [window.storage API] → [Electron Persistence]
```
The app uses `window.storage.get/set()` to persist tasks/completedTasks (expects IPC bridge in Electron).

## View Navigation Pattern

The app uses a string-based view router in `currentView` state:
- `'home'` - Dashboard with time, 4 quick action buttons
- `'quick'` - Fast task capture (title only)
- `'detailed'` - Rich task capture (title + description)
- `'list'` - Active tasks grid
- `'detail'` - Single task detail/edit/complete
- `'achievements'` - Completed tasks + reward suggestions

Each view is a nested component function (e.g., `HomeView()`, `TaskListView()`) that returns JSX.

## Key Development Workflows

### Running Dev Server
```bash
npm run dev          # Starts Vite @ http://localhost:5173
npm run electron-dev # Launches Electron window pointing to dev server
```
Run both terminals in parallel. Changes auto-reload via Vite HMR.

### Building & Packaging
```bash
npm run build              # Vite build to dist/
npm run package-win        # Windows NSIS installer
npm run package-mac        # macOS DMG
npm run package-linux      # Linux AppImage
```
Electron-builder reads `build` config in `package.json`.

## Code Patterns & Conventions

### Task Data Structure
```javascript
{
  id: timestamp,
  title: string,
  description?: string,
  type: 'quick' | 'detailed',
  createdAt: ISO8601,
  completedAt?: ISO8601 // Only in completedTasks array
}
```

### Reward System
- `rewards[]` array of emoji + motivational messages
- `showRewardAnimation()` picks random reward, displays modal for 4 seconds
- Triggered on task completion via `completeTask()`

### Locale & Formatting
- Spanish UI (`es-ES` locale for dates/times)
- Uses `toLocaleTimeString()`, `toLocaleDateString()` with Spanish options
- Time updates every 1 second via `setInterval` in `useEffect`

### Styling Conventions
- **Gradients:** `bg-gradient-to-br from-[COLOR1]-[SHADE] to-[COLOR2]-[SHADE]` per view
- **Colors by View:**
  - Quick capture: Blue (`blue-600`)
  - Detailed capture: Purple (`purple-600`)
  - Task list: Green (`green-600`)
  - Achievements: Yellow/Orange (`yellow-600`, `orange-600`)
- **Rounded corners:** `rounded-3xl` for cards, `rounded-2xl` for buttons/inputs
- **Shadows:** `shadow-lg` / `shadow-2xl` with hover elevation via `-translate-y-1`
- **Inline CSS:** Global animations (`@keyframes fade-in`, `bounce-in`) in `<style>` tag at bottom

### State Management (Current)
All state in root component:
- `currentView`, `tasks`, `completedTasks`, `selectedTask`, `isEditing`
- `currentTime` synced via `setInterval()`
- No Context API or external state management yet

## Critical Integration Points

### Electron IPC (Not Yet Implemented)
The code references `window.storage.get/set()` but Electron main process doesn't expose this API. To enable persistence:
1. Add IPC preload script (context isolation recommended)
2. Expose `storage` object via `contextBridge`
3. Implement main-process listeners for `storage:get` / `storage:set`

### Vite Dev Server Integration
`electron.js` checks `process.env.NODE_ENV === 'development'` to load from localhost:5173 instead of dist/index.html. Dev tools auto-open.

## Common Additions

When adding features, follow these patterns:

**New View?** Create nested component function in App.jsx, add case to final render block, update `currentView` values.

**New Task Property?** Update task creation in `addTask()`, structure example above, serialization in `saveData()`.

**UI Consistency?** Match existing gradient color scheme and spacing (8px grid, `px-6 py-4` padding).

**Localization?** All UI strings are Spanish; keep `toLocaleString` calls with `'es-ES'` locale.

## File Structure & Key Paths

- [`src/App.jsx`](src/App.jsx) - Entire React application (575 lines)
- [`electron.js`](electron.js) - Electron main process window/routing
- [`vite.config.js`](vite.config.js) - Build config (relative base `./` for packaged app)
- [`package.json`](package.json) - Scripts, deps, electron-builder config
- [`src/index.css`](src/index.css) - Tailwind imports + component layer
- [`index.html`](index.html) - Entry point (loads Tailwind CDN, main.jsx)
