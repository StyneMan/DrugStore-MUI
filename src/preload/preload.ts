import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  ping: () => ipcRenderer.invoke("ping"),
  dbContent: () => ipcRenderer.invoke("dbContent"),
});

// contextBridge.exposeInMainWorld('electron', {
//   dbContent: () => ipcRenderer.invoke('dbContent')
// })

// contextBridge.exposeInMainWorld("electron", {
//   ping: () => ipcRenderer.invoke("ping"),
// });

// // const { contextBridge, ipcRenderer } = require('electron')

// contextBridge.exposeInMainWorld("electronAPI", {
//   openFile: () => ipcRenderer.invoke("dialog:openFile"),
// });

// contextBridge.exposeInMainWorld("electronAPI", {
//   handleCounter: (callback: any) => ipcRenderer.on("update-counter", callback),
// });

// window.getDBSuffix = () => ipcRenderer.invoke('getDBSuffix');
