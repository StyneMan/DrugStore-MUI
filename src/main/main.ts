import { app, BrowserWindow, screen } from "electron";
import * as path from 'path';
import electron from "electron";
import { exposeIpcMainRxStorage } from "rxdb/plugins/electron";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { getDatabase } from "../renderer/src/database";

let mainWindow: BrowserWindow | null;

// Set up the RxDB database path
const databasePath = path.join(app.getPath('userData'), 'mydb');
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
 
function createWindow() {
  const { height, width } = getDeviceDimensions();
  mainWindow = new BrowserWindow({
    minWidth: width * 0.75,
    minHeight: height * 0.99,
    width: 1400,
    height: 850,
    webPreferences: {
      // preload: path.join(__dirname, '../preload/preload.js'), 
      webSecurity: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
    },
  }); 
  
  mainWindow.webContents.openDevTools();

  // Vite DEV server URL
  mainWindow.loadURL("http://localhost:5173"); 
  mainWindow.on("closed", () => (mainWindow = null));
}



app.on("ready", async function () {
  // const dbSuffix = new Date().getTime(); // we add a random timestamp in dev-mode to reset the database on each start

  db = await getDatabase(databasePath);

  electron.ipcMain.handle("getDBSuffix", () => "drugstore_suffix1");

  const storage = getRxStorageDexie()
  
  exposeIpcMainRxStorage({
    key: "main-storage",
    storage, 
    ipcMain: electron.ipcMain,
  });   

  // await getDatabase("drugstore");

  // // show heroes table in console
  // db.heroes.find().sort('name').$.subscribe(heroDocs => {
  //     console.log('### got heroes(' + heroDocs.length + '):');
  //     heroDocs.forEach(doc => console.log(
  //         doc.name + '  |  ' + doc.color
  //     ));
  // });

  // createWindow();
  // createWindow();
});

app.on('before-quit', () => {
  // Close the database and save it before quitting
  saveAndCloseDatabase()
});

function saveAndCloseDatabase() {
  if (db) {
    db.destroy().then(() => {
      app.quit();
    });
  } else {
    app.quit();
  }
}


app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow == null) {
    createWindow();
  }
});
