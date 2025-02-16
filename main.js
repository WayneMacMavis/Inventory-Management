// main.js (Electron's main process)
const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Ensure this path is correct
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadURL('http://localhost:3000'); // Replace with your React app's URL
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle download initiation from renderer process
ipcMain.on('initiate-download', (event, downloadUrl) => {
  const savePath = path.join(app.getPath('downloads'), 'downloaded-file.ext'); // Replace with desired file name and extension
  const downloadItem = session.defaultSession.downloadURL(downloadUrl);

  downloadItem.setSavePath(savePath);

  downloadItem.on('updated', (event, state) => {
    if (state === 'interrupted') {
      console.log('Download is interrupted but can be resumed');
    } else if (state === 'progressing') {
      if (downloadItem.isPaused()) {
        console.log('Download is paused');
      } else {
        console.log(`Received bytes: ${downloadItem.getReceivedBytes()}`);
      }
    }
  });

  downloadItem.once('done', (event, state) => {
    if (state === 'completed') {
      console.log('Download successfully to ' + savePath);
    } else {
      console.log(`Download failed: ${state}`);
    }
  });
});
