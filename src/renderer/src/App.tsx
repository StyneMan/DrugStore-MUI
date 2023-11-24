import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/auth/login";
import HomeScreen from "./screens/home";
import Dashboard from "./components/dashboard";
import Activity from "./screens/activity";
import Reports from "./screens/reports";
import Customers from "./screens/customers";
import Support from "./screens/support";
import AddCustomer from "./screens/customers/add_customer";
import { Backdrop, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PaymentMethod from "./screens/home/payment_method";
import { setOnline } from "./redux/slices/loader";
import APIService from "./service/api_service";
import { getDatabase } from "../../main/database";
import { setDatabasePath } from "./redux/slices/database";
import { setProducts } from "./redux/slices/product";
import { setFilteredProducts } from "./redux/slices/search";
import { setCategories } from "./redux/slices/categories";
import { RootState } from "./redux/store";
import { Toaster } from "react-hot-toast";
import { setCustomerMeta, setCustomers } from "./redux/slices/customers";
import {
  setBusinessLocations,
  setCurrentBusinessLocation,
} from "./redux/slices/business_locations";
import useSales from "./hooks/useSales";
import { setSales, setSalesMeta } from "./redux/slices/purchase";
import useProducts from "./hooks/useProducts";
import useCategories from "./hooks/useCategories";

function App() {
  const dispatch = useDispatch();
  const userId: number = parseInt(`${localStorage.getItem("userId") ?? 0}`);
  const location_ID: number = parseInt(
    `${localStorage.getItem("location_id") ?? 0}`
  );
  const business_ID: number = parseInt(
    `${localStorage.getItem("business_id") ?? 0}`
  );
  const accessToken = localStorage.getItem("accessToken");
  // const [dbPath, setDBPath] = React.useState("");
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);
  const isOnline = useSelector((state: RootState) => state.loader.isOnline);
  const shouldReload = useSelector(
    (state: RootState) => state.loader.shouldReload
  );
  const { data: salesData } = useSales(location_ID, userId);
  const { data: productData } = useProducts();
  const { data: categoriesData } = useCategories();

  // console.log("SALES DATA :::  ", salesData);

  const getDbPath = async () => {
    const response = await window.electron?.ping();
    // const hasInternet = await window.electron.isOnline();
    // setDBPath(response);
    // dispatch(setOnline(hasInternet));
    localStorage.setItem("dbPath", response);
    dispatch(setDatabasePath(response));
  };

  React.useEffect(() => {
    if (salesData) {
      dispatch(setSales(salesData?.data));
      dispatch(setSalesMeta(salesData?.meta));
      // console.log("SALES DATA :  ", salesData);
      window.electron.sendSalesSummaryDataToMain(
        JSON.stringify(salesData?.data)
      );
    }

    if (productData) {
      window.electron.sendDataToMain(JSON.stringify(productData?.data));
      dispatch(setProducts(productData?.data));
      dispatch(setFilteredProducts(productData?.data));
    }

    if (categoriesData) {
      window.electron.sendCategoriesDataToMain(
        JSON.stringify(categoriesData?.data)
      );
      dispatch(setCategories(categoriesData?.data));
    }

  }, [salesData, productData, categoriesData, dispatch]);


  React.useEffect(() => {
    getDbPath();
  });

  const checkOnlineStatus = async () => {
    try {
      const online = await fetch("https://www.google.com");
      return online.status >= 200 && online.status < 300; // either true or false
    } catch (err) {
      return false; // definitely offline
    }
  };

  React.useEffect(() => {
    const inte = setInterval(async () => {
      const result = await checkOnlineStatus();
      dispatch(setOnline(result));
      console.log("CURRENT STATUS :: ", result ? "ONLINE" : "OFFLINE");
    }, 3000);

    return () => {
      clearInterval(inte);
    };
  });

  React.useEffect(() => {
    const loadCart = async () => {
      try {
        const dbPath = localStorage.getItem("dbPath");

        const carts = await window.electron.carts();
        const drafts = await window.electron.drafts();

        const db = await getDatabase(`${dbPath}`);
        console.log("CART FROM MAIN :: ", carts);
        console.log("DRAFT FROM MAIN :: ", drafts);

        const sanitizedCart = JSON.parse(JSON.parse(carts));
        const sanitizedDraft = JSON.parse(JSON.parse(drafts));

        console.log("SANITIZED  CART  FROM  MAIN   :: ", sanitizedCart);
        console.log("SANITIZED  DRAFT  FROM  MAIN   :: ", sanitizedDraft);

        // Now insert into rxdb
        await db?.carts?.insert(sanitizedCart);
        await db?.drafts?.insert(sanitizedDraft);

        window.electron.sendCartDataToMain(JSON?.parse(carts));
        window.electron.sendDraftDataToMain(JSON?.parse(drafts));
      } catch (error) {
        console.log(error);
      }
    };
    loadCart();
    setTimeout(() => {
      loadCart();
    }, 6000);
  }, []);

  React.useEffect(() => {
    const initLogic = async () => {
      if (isOnline && accessToken) {
        APIService.getBusinessLocations()
          .then(async (res) => {
            console.log("BUSINESS LOCATIONS REPORT ==>> ", res.data);
            dispatch(setBusinessLocations(res?.data));
            window.electron.sendBusinessLocationDataToMain(
              JSON.stringify(res?.data)
            );

            if (
              localStorage.getItem("locationId") &&
              localStorage.getItem("businessId")
            ) {
              const locationID = localStorage.getItem("locationId");
              const bizID = localStorage.getItem("businessId");

              console.log("LOCATION ID CHECKINSON HERE ::  ", locationID);
              console.log("BUSINESS ID CHECKINSON HERE ::  ", bizID);

              const currLocation = res?.data?.filter(
                (item) =>
                  `${item?.business_id}`.toLowerCase() ===
                    `${bizID}`.toLowerCase() &&
                  `${item?.location_id}`.toLowerCase() ===
                    `${locationID}`.toLowerCase()
              );
              console.log("CURRENT BUSINESS LOCATION ===>>> ", currLocation);
              dispatch(setCurrentBusinessLocation(currLocation[0]));
            }
          })
          .catch((error) => {
            console.log("ERRO BIZ METHOD ==> ", error);
          });

        APIService.getProductsStockReport()
          .then((res) => {
            console.log("STOCK REPORT ==>> ", res);
          })
          .catch((error) => {
            console.log("ERRO STOCK REPORT ==> ", error);
          });


        APIService.getCustomers()
          .then(async (res) => {
            console.log("CUSTOMERS ==>> ", res);
            window.electron.sendCustomersDataToMain(JSON.stringify(res?.data));
            dispatch(setCustomerMeta(res?.meta));
            const filtered = res?.data?.filter(
              (item) => item?.type.toLowerCase() === "customer"
            );
            dispatch(setCustomers(filtered));
          })
          .catch((error) => {
            console.log("ERRO STOCK REPORT ==> ", error);
          });

        if (salesData) {
          dispatch(setSales(salesData?.data));
          dispatch(setSalesMeta(salesData?.meta));
          // console.log("SALES DATA :  ", salesData);
          window.electron.sendSalesSummaryDataToMain(
            JSON.stringify(salesData?.data)
          );
        }
      } else {

        try {
          // BUSINESS LOCATIONS
          const businessLocations = await window.electron.bizLocations();
          const copybusinessLocations = businessLocations ?? [];
          dispatch(
            setBusinessLocations(JSON.parse(JSON.parse(copybusinessLocations)))
          );
          console.log(
            "OFFLINE BUSINESS LOCATIONS :: ",
            JSON.parse(copybusinessLocations)
          );
          window.electron.sendBusinessLocationDataToMain(
            JSON.parse(businessLocations)
          );

          if (
            localStorage.getItem("locationId") &&
            localStorage.getItem("businessId")
          ) {
            const data = JSON.parse(JSON.parse(copybusinessLocations));
            console.log("LOCATION ID, BIZ ID, ", data);
            if (data) {
              const currLocation = data.filter(
                (item) =>
                  `${item?.location_id}`.toLowerCase() ===
                    localStorage.getItem("locationId")?.toLowerCase() &&
                  `${item?.business_id}`.toLowerCase() ===
                    localStorage.getItem("businessId")?.toString().toLowerCase()
              );

              console.log("CURRENT BUSINESS LOCATION ==> ", currLocation);
              dispatch(setCurrentBusinessLocation(currLocation[0]));
            }
          }

          // CATEGORIES
          const categories = await window.electron.categories();
          dispatch(setCategories(JSON.parse(JSON.parse(categories))));
          window.electron.sendCategoriesDataToMain(JSON.parse(categories));


          // PRODUCTS
          const products = await window.electron.products();
          console.log("OFFLINE PRODUCTS :: ", products);
          dispatch(setProducts(JSON.parse(JSON.parse(products))));
          dispatch(setFilteredProducts(JSON.parse(JSON.parse(products))));
          window.electron.sendDataToMain(JSON.parse(products));


          // CUSTOMERS
          const customers = await window.electron.customers();
          dispatch(setCustomers(JSON.parse(JSON.parse(customers))));
          window.electron.sendCustomersDataToMain(JSON.parse(customers));


          // SALES SUMMARY
          const salesSummary = await window.electron.salesSummary();
          window.electron.sendSalesSummaryDataToMain(JSON.parse(salesSummary));
          const salesParsed = JSON.parse(JSON.parse(salesSummary));
          if (location_ID && business_ID) {
            const filteredSales = salesParsed?.filter(
              (item) =>
                item?.location_id === location_ID &&
                item?.business_id === business_ID
            );
            dispatch(setSales(filteredSales));
          }
        } catch (error) {
          console.log("ERROOR :: ", error);
        }
      }

      // PENDING SELLS
      const pendingSells = await window.electron.pendingSells();
      window.electron.sendPendingSellsDataToMain(JSON.parse(pendingSells));

    };
    initLogic();
    
  }, [isOnline, accessToken, shouldReload, salesData, dispatch, location_ID, business_ID]);

  return (
    <>
      <Toaster />
      <Backdrop open={isLoading} sx={{ zIndex: 10000 }}>
        <CircularProgress color="secondary" />
      </Backdrop>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        {/* <Route path='/home' element={<HomeScreen />} /> */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route
            path="/dashboard"
            element={<Navigate to="/dashboard/home" replace />}
          />
          <Route path="/dashboard/home" element={<HomeScreen />} />
          <Route path="/dashboard/activity" element={<Activity />} />
          <Route path="/dashboard/reports" element={<Reports />} />
          <Route path="/dashboard/customers" element={<Customers />} />
          <Route path="/dashboard/customers/new" element={<AddCustomer />} />
          <Route path="/dashboard/supports" element={<Support />} />
          <Route path="/dashboard/paymentmethod" element={<PaymentMethod />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
