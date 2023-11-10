import {
  app,
  BrowserWindow,
  screen,
  ipcMain,
  // contextBridge,
  // ipcRenderer,
  // Menu,
} from "electron";
// import * as path from "path";
import * as path from "node:path";
import electron from "electron";
import { exposeIpcMainRxStorage } from "rxdb/plugins/electron";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { getDatabase } from "./database";
import fs from "fs";
import { jsonc } from "jsonc";

let mainWindow: BrowserWindow | null;

// Set up the RxDB database path
const databasePath = path.join(app.getPath("userData"), "mydb");
const storagePath = path.join(
  app.getPath("userData"),
  "virtualrx_drugstore.json"
);
let db;

// Create or load the RxDB database
// async function initDatabase() {
//   addPouchPlugin(require('pouchdb-adapter-leveldb')); // Use the appropriate adapter
//   const db = await createRxDatabase({
//     name: databasePath,
//     adapter: 'leveldb', // Use the appropriate adapter
//   });
//   return db;
// }

function getDeviceDimensions() {
  const mainScreen = screen.getPrimaryDisplay();
  const width = mainScreen.bounds.width;
  const height = mainScreen.bounds.height;
  return { width, height };
}

// async function handleFileOpen() {
//   const { cancelled, filePaths } = await dialog.showOpenDialog({});
//   if (!cancelled) {
//     return filePaths[0];
//   }
// }

async function createWindow() {
  const { height, width } = getDeviceDimensions();
  mainWindow = new BrowserWindow({
    minWidth: width * 0.75,
    minHeight: height * 0.99,
    width: 1400,
    height: 850,
    webPreferences: {
      preload: path.join(__dirname, "../../out/preload/preload.js"),
      webSecurity: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
    },
  });

  mainWindow.webContents.openDevTools();

  if (fs.existsSync(storagePath)) {
    const dbSource = fs.readFileSync(storagePath, "utf8");

    ipcMain.handle("dbContent", () => jsonc.parse(dbSource));
    ipcMain.handle("ping", () => databasePath);
    // alert("EXISTS")
    // myRxDBData = JSON.parse(savedData);
  } else {
    // Create database here since it has not been created before
    db = await getDatabase(databasePath);
    const storage = getRxStorageDexie();

    exposeIpcMainRxStorage({
      key: "main-storage",
      storage,
      ipcMain: electron.ipcMain,
    });

    ipcMain.handle("ping", () => databasePath);
  }

  // Vite DEV server URL
  mainWindow.loadURL("http://localhost:5173");

  // Save your RxDB data before quitting the app
  // mainWindow.on("close", () => {
  //   if (db) {
  //     fs.writeFileSync(storagePath, JSON.stringify(db));
  //   }
  // });

  // mainWindow.on("closed", () => {
  //   // Close the database when the application window is closed
  //   // db.destroy().then(() => {
  //     app.quit();
  //   // });
  // });
}

app.on("ready", async function () {
  createWindow();
});

app.on("before-quit", () => {
  // Close the database and save it before quitting
  saveAndCloseDatabase();
});

async function saveAndCloseDatabase() {
  if (db) {
    // Use the exportJSON method to export the database
    const jsonData = await db.exportJSON();
    fs.writeFileSync(storagePath, jsonc.stringify(jsonData, undefined, 2));
    app.quit();
  } else {
    app.quit();
  }
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// app.on("activate", () => {
//   if (mainWindow == null) {
//     createWindow();43581
//   }
// });
