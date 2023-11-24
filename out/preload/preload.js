"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electron", {
  ping: () => electron.ipcRenderer.invoke("ping"),
  auth: () => electron.ipcRenderer.invoke("auth"),
  dbContent: () => electron.ipcRenderer.invoke("dbContent"),
  isOnline: () => electron.ipcRenderer.invoke("isOnline"),
  bizLocations: () => electron.ipcRenderer.invoke("bizLocations"),
  categories: () => electron.ipcRenderer.invoke("categories"),
  customers: () => electron.ipcRenderer.invoke("customers"),
  products: () => electron.ipcRenderer.invoke("products"),
  carts: () => electron.ipcRenderer.invoke("carts"),
  drafts: () => electron.ipcRenderer.invoke("drafts"),
  pendingSells: () => electron.ipcRenderer.invoke("pendingSells"),
  salesSummary: () => electron.ipcRenderer.invoke("salesSummary"),
  sendAuthToMain: (data) => {
    electron.ipcRenderer.send("data-from-auth", data);
  },
  sendDataToMain: (data) => {
    electron.ipcRenderer.send("data-from-renderer", data);
  },
  sendCategoriesDataToMain: (data) => {
    electron.ipcRenderer.send("data-from-categories", data);
  },
  sendCustomersDataToMain: (data) => {
    electron.ipcRenderer.send("data-from-customers", data);
  },
  sendPaymentMethodDataToMain: (data) => {
    electron.ipcRenderer.send("data-from-payment-method", data);
  },
  sendCartDataToMain: (data) => {
    electron.ipcRenderer.send("data-from-cart", data);
  },
  sendDraftDataToMain: (data) => {
    electron.ipcRenderer.send("data-from-draft", data);
  },
  sendBusinessLocationDataToMain: (data) => {
    electron.ipcRenderer.send("data-from-business-locations", data);
  },
  sendPendingSellsDataToMain: (data) => {
    electron.ipcRenderer.send("data-from-pending-sells", data);
  },
  sendSalesSummaryDataToMain: (data) => {
    electron.ipcRenderer.send("data-from-sales-summary", data);
  }
});
