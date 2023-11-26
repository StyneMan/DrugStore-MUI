import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {  HashRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/theme.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { SWRConfig } from "swr";
import APIService from "./service/api_service.ts";

import "@mui/material/styles";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <SWRConfig
          value={{
            refreshInterval: 3 * 60 * 1000, // 3 mins
            fetcher: (url) => APIService.fetcher(url),
          }}
        >
          <HashRouter>
            <App />
          </HashRouter>
        </SWRConfig>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

{
  /*
   */
}

declare global {
  interface Window {
    electron;
  }
}
