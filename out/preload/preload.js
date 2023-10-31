"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electron", {
  ping: () => electron.ipcRenderer.invoke("ping")
});
