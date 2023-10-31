import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  ping: () => ipcRenderer.invoke('ping')
})


// window.getDBSuffix = () => ipcRenderer.invoke('getDBSuffix');
