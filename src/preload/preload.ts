import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  ping: () => ipcRenderer.invoke("ping"),
  auth: () => ipcRenderer.invoke("auth"),
  dbContent: () => ipcRenderer.invoke("dbContent"),
  isOnline: () => ipcRenderer.invoke("isOnline"),
  bizLocations: () => ipcRenderer.invoke("bizLocations"),
  categories: () => ipcRenderer.invoke("categories"),
  customers: () => ipcRenderer.invoke("customers"),
  products: () => ipcRenderer.invoke("products"),
  carts: () => ipcRenderer.invoke("carts"),
  drafts: () => ipcRenderer.invoke("drafts"),
  pendingSells: () => ipcRenderer.invoke("pendingSells"),
  salesSummary: () => ipcRenderer.invoke("salesSummary"),
  sendAuthToMain: (data: unknown) => {
    ipcRenderer.send('data-from-auth', data);
  },
  sendDataToMain: (data: unknown) => {
    ipcRenderer.send('data-from-renderer', data);
  },
  sendCategoriesDataToMain: (data: unknown) => {
    ipcRenderer.send('data-from-categories', data);
  },
  sendCustomersDataToMain: (data: unknown) => {
    ipcRenderer.send('data-from-customers', data);
  },
  sendPaymentMethodDataToMain: (data: unknown) => {
    ipcRenderer.send('data-from-payment-method', data);
  },
  sendCartDataToMain: (data: unknown) => {
    ipcRenderer.send('data-from-cart', data);
  },
  sendDraftDataToMain: (data: unknown) => {
    ipcRenderer.send('data-from-draft', data);
  },
  sendBusinessLocationDataToMain: (data: unknown) => {
    ipcRenderer.send('data-from-business-locations', data);
  },
  sendPendingSellsDataToMain: (data: unknown) => {
    ipcRenderer.send('data-from-pending-sells', data);
  },
  sendSalesSummaryDataToMain: (data: unknown) => {
    ipcRenderer.send('data-from-sales-summary', data);
  },
});
