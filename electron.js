const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('express');

let mainWindow;
let server;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const isDev = process.env.NODE_ENV === 'development';
  const startUrl = isDev
    ? 'http://localhost:5173'
    : 'http://localhost:3000';

  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

// Servir archivos estáticos en producción
const startServer = () => {
  const app_server = express();
  const distPath = path.join(__dirname, 'build');
  
  app_server.use(express.static(distPath));
  
  // Express 5: usa regex para catch-all y evitar errores de path-to-regexp
  app_server.get(/.*/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
  
  server = app_server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
};

app.on('ready', () => {
  const isDev = process.env.NODE_ENV === 'development';
  if (!isDev) {
    startServer();
  }
  createWindow();
});

app.on('window-all-closed', () => {
  if (server) server.close();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
