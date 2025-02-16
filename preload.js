// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  initiateDownload: (downloadUrl) => ipcRenderer.send('initiate-download', downloadUrl),
});
