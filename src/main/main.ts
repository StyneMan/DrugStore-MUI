
import {
  app,
  BrowserWindow,
  screen,
  ipcMain,
  // contextBridge,
} from "electron";
import * as path from "node:path";
import electron from "electron";
import { exposeIpcMainRxStorage } from "rxdb/plugins/electron";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { getDatabase } from "./database";
import fs from "fs";
// import isOnline from "is-online";


let mainWindow: BrowserWindow | null;

// Set up the RxDB database path
const databasePath = path.join(app.getPath("userData"), "mydb");
const storagePath = path.join(
  app.getPath("userData"),
  "virtualrx_drugstore.json"
);
const salesStoragePath = path.join(
  app.getPath("userData"),
  "virtualrx_drugstore_sales.json"
);
const pendingSellsStoragePath = path.join(
  app.getPath("userData"),
  "virtualrx_drugstore_pending_sells.json"
);

let productsJson: unknown[] = [];
let customersJson: unknown[] = [];
let categoriesJson: unknown[] = [];
let cartsJson: unknown[] = [];
let draftsJson: unknown[] = [];
let businessLocationsJson: unknown[] = [];
let salesSummaryJson: unknown[] = [];
let pendingSellsJson: unknown[] = [];
let paymentMethodsJson: unknown = {};
let authJson: unknown = {};


function getDeviceDimensions() {
  const mainScreen = screen.getPrimaryDisplay();
  const width = mainScreen.bounds.width;
  const height = mainScreen.bounds.height;
  return { width, height };
}

async function createWindow() {
  const { height, width } = getDeviceDimensions();
  mainWindow = new BrowserWindow({
    minWidth: width * 0.75,
    minHeight: height * 0.99,
    width: 1400,
    height: 850,
    webPreferences: {
      preload: path.join(__dirname, "../../dist/preload/preload.js"),
      webSecurity: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
    },
  });

  // contextBridge.exposeInMainWorld('electron', {});

  // mainWindow.webContents.openDevTools();

  try {
    ipcMain.handle("isOnline", async () => false);

    if (fs.existsSync(storagePath)) {
      const dbSource = fs.readFileSync(storagePath, "utf8");

      ipcMain.handle("dbContent", () => JSON.parse(dbSource));
      ipcMain.handle("ping", () => databasePath);

      if (databasePath) {
       await getDatabase(databasePath);
        const storage = getRxStorageDexie();
        exposeIpcMainRxStorage({
          key: "main-storage",
          storage,
          ipcMain: electron.ipcMain,
        });
      }

      const parseData = JSON.parse(dbSource);

      console.log("PARSED DATA FROM FS :: ", parseData);

      const authContent = parseData?.collections[0]?.content;
      console.log("AUTH  MAIN ", authContent);
      ipcMain.handle("auth", () => JSON.stringify(authContent));

      const bizLocationsContent = parseData?.collections[3]?.content;
      const copy = bizLocationsContent;
      console.log("BUSINESS LOCATIONS MAIN ", copy);
      ipcMain.handle("bizLocations", () => JSON.stringify(copy));


      const categoriesContent = parseData?.collections[2]?.content;
      const categoriesCopy = categoriesContent;
      ipcMain.handle("categories", () => JSON.stringify(categoriesCopy));
      

      const productsContent = parseData?.collections[1]?.content;
      const productCopy = productsContent;
      ipcMain.handle("products", () => JSON.stringify(productCopy));


      const customersContent = parseData?.collections[5]?.content;
      const customersCopy = customersContent;
      ipcMain.handle("customers", () => JSON.stringify(customersCopy));


      const cartsContent = parseData?.collections[6]?.content;
      const cartsCopy = cartsContent;
      console.log("CART MAIN  COPY CHECKER   ", cartsCopy);
      ipcMain.handle("carts", () => JSON.stringify(cartsCopy));


      const draftsContent = parseData?.collections[7]?.content;
      const draftsCopy = draftsContent;
      console.log("CART MAIN  COPY CHECKER   ", draftsCopy);
      ipcMain.handle("drafts", () => JSON.stringify(draftsCopy));

    }

    if (fs.existsSync(salesStoragePath)) {
      const dbSource = fs.readFileSync(salesStoragePath, "utf8");
      const parseData = JSON.parse(dbSource);

      const salesContent = parseData?.sales;
      console.log("SALES  MAIN ", salesContent);
      ipcMain.handle("salesSummary", () => JSON.stringify(salesContent));
    }

    if (fs.existsSync(pendingSellsStoragePath)) {
      const dbSource = fs.readFileSync(pendingSellsStoragePath, "utf8");
      const parseData = JSON.parse(dbSource);

      console.log("PARSED DATA FROM FS PENDING SELLS :: ", parseData);

      const pendingSellsContent = parseData?.pending_sells;
      console.log("PENDING SELLS  MAIN ", pendingSellsContent);
      ipcMain.handle("pendingSells", () => JSON.stringify(pendingSellsContent));
    }

    // Vite DEV server URL
    mainWindow.loadURL("http://localhost:5173");

    mainWindow.on("closed", () => {
      // Close the database when the application window is closed
      // db.destroy().then(() => {
      // setTimeout(() => {
      app.quit();
      // }, 7000);
      // });
    });


    ipcMain.on("data-from-auth", (_event, data) => {
      authJson = data;
    });

    ipcMain.on("data-from-renderer", (_event, data) => {
      productsJson = data;
    });

    ipcMain.on("data-from-categories", (_event, data) => {
      categoriesJson = data;
    });

    ipcMain.on("data-from-customers", (_event, data) => {
      customersJson = data;
    });

    ipcMain.on("data-from-payment-method", (_event, data) => {
      paymentMethodsJson = data;
    });

    ipcMain.on("data-from-cart", (_event, data) => {
      cartsJson = data;
    });

    ipcMain.on("data-from-draft", (_event, data) => {
      draftsJson = data;
    });

    ipcMain.on("data-from-business-locations", (_event, data) => {
      // console.log("BUSINESS LOCATIONS   :::  :::  ::: ", data);
      businessLocationsJson = data;
    });

    ipcMain.on("data-from-sales-summary", (_event, data) => {
      // console.log("SALES SUMMARY :: :: ::", data);
      salesSummaryJson = data;
    });

    ipcMain.on("data-from-pending-sells", (_event, data) => {
      console.log("PENDING SELLS :: :: ::", data);
      pendingSellsJson = data;
    });
  } catch (error) {
    console.log("ERROR ORC : ", error);
  }
}

app.on("ready", async function () {
  createWindow();
});

app.on("before-quit", () => {
  // Close the database and save it before quitting
  saveAndCloseDatabase();
});

async function saveAndCloseDatabase() {
  try {
    const json = {
      collections: [
        { name: "auth", content: authJson },
        { name: "products", content: productsJson },
        { name: "categories", content: categoriesJson },
        { name: "business_locations", content: businessLocationsJson },
        { name: "payment_methods", content: paymentMethodsJson },
        { name: "customers", content: customersJson },
        { name: "carts", content: cartsJson },
        { name: "drafts", content: draftsJson },
        { name: "sales", content: draftsJson },
      ],
    };
    const salesJson = {
      sales: salesSummaryJson,
    };
    const pendingJson = {
      pending_sells: pendingSellsJson,
    };

    fs.writeFileSync(storagePath, JSON.stringify(json));
    fs.writeFileSync(salesStoragePath, JSON.stringify(salesJson));
    fs.writeFileSync(pendingSellsStoragePath, JSON.stringify(pendingJson));

    setTimeout(() => {
      app.quit();
    }, 3000);
  } catch (error) {
    console.log("ERRO ON SAVE ", error);
  }
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

