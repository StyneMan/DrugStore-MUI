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
import { Toaster } from "react-hot-toast";
import { setOnline } from "./redux/slices/loader";
import APIService from "./service/api_service";
import { getDatabase } from "../../main/database";
import { setDatabasePath } from "./redux/slices/database";
import { setProducts } from "./redux/slices/product";
import { setFilteredProducts } from "./redux/slices/search";
import { setCategories } from "./redux/slices/categories";
import { RootState } from "./redux/store";
import { setPaymentMethods } from "./redux/slices/purchase";

function App() {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('accessToken');
  const [dbPath, setDBPath] = React.useState("");
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);
  const isOnline = useSelector((state: RootState) => state.loader.isOnline);
  // const filteredProducts = useSelector(
  //   (state: RootState) => state.search.filteredProducts
  // );
  // const sorting = useSelector((state: RootState) => state.search.sorting);

  const getDbPath = async () => {
    const response = await window.electron.ping();
    const content = await window.electron.dbContent();
    console.log("DB PATH  ===>>> ", content);
    setDBPath(response);
    localStorage.setItem("dbPath", response);
    dispatch(setDatabasePath(response));
    // console.log("DB CONT ===>>> ", response);
  };

  React.useEffect(() => {
    getDbPath();
  }, []);

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
    const initLogic = async () => {
      if (dbPath && isOnline && accessToken) {
        APIService.getBusinessLocations()
          .then(async (res) => {
            console.log("LOCATIONS REPORT ==>> ", res);
            try {
              const db = await getDatabase(dbPath);
              const existingData = await db?.business_locations.find().exec();

              if (existingData) {
                const convertedData = res?.data?.map((element: any) => {
                  return {
                    ...element,
                    id: element?.id.toString(),
                  };
                });

                await db?.business_locations.remove();

                await db?.business_locations.bulkInsert(convertedData);
              } else {
                const convertedData = res?.data?.map((element: any) => {
                  return {
                    ...element,
                    id: element?.id.toString(),
                  };
                });

                await db?.business_locations.bulkInsert(convertedData);
              }
            } catch (error) {
              console.log("ERROR BIX LOCS ", error);
            }
          })
          .catch((error) => {
            console.log("ERRO BIZ METHOD ==> ", error);
            // getDatabase(dbPath).then(async (db) => {
            //   const existingData = await db?.business_locations.find().exec();

            //   console.log("SADF ", existingData);
            // });
          });

        APIService.getPaymentMethods()
          .then(async (res) => {
            // console.log("pAYMENT METHODS ==>> ", res);
            try {
              const db = await getDatabase(dbPath);
              const obj = {
                id: new Date().getTime().toString(),
                methods: { ...res },
                timestamp: new Date().toISOString(),
              };

              const mArray = Object.values(res);
              dispatch(setPaymentMethods(mArray));

              const existingData = await db?.paymentmethods.findOne().exec();

              if (existingData) {
                // Document exists, update it
                await db?.paymentmethods.remove();
                await db?.paymentmethods?.insert(obj);
              } else {
                // Document doesn't exist, insert it
                await db?.paymentmethods?.insert(obj);
              }
            } catch (error) {
              console.log("PAY METTHODS ERROR ", error);
            }
          })
          .catch((error) => {
            console.log("ERRO PAYMENT METHOD ==> ", error);
          });

        APIService.getProductsStockReport()
          .then((res) => {
            console.log("STOCK REPORT ==>> ", res);
          })
          .catch((error) => {
            console.log("ERRO STOCK REPORT ==> ", error);
          });

        APIService.getCategories()
          .then(async (res) => {
            console.log("CATEGORIES REPORT ==>> ", res);
            try {
              const db = await getDatabase(dbPath);
              const existingData = await db?.categories.find().exec();

              if (existingData) {
                const convertedData = res?.data?.map((element: any) => {
                  return {
                    ...element,
                    id: element?.id.toString(),
                  };
                });

                await db?.categories.remove();

                await db?.categories.bulkInsert(convertedData);
              } else {
                const convertedData = res?.data?.map((element: any) => {
                  return {
                    ...element,
                    id: element?.id.toString(),
                  };
                });

                await db?.categories.bulkInsert(convertedData);
              }
            } catch (error) {
              console.log("CATEGORY ERR ", error);
            }
          })
          .catch((error) => {
            console.log("ERRO CATEGORIES CATEGORIES ==> ", error);
          });

        APIService.getProducts()
          .then(async (res) => {
            console.log("PRODUCTS ==>> ", res);
            try {
              const db = await getDatabase(dbPath);
              const existingData = await db?.products.find().exec();

              if (existingData && existingData?.length > 0) {
                console.log("SOMETHING DEY HERE ALREADY PRODUCTS !!!");

                dispatch(setProducts(existingData));
                dispatch(setFilteredProducts(existingData));

                const convertedData = res?.data?.map((element: any) => {
                  return {
                    ...element,
                    id: element?.id.toString(),
                  };
                });

                await db?.products.remove();

                await db?.products.bulkInsert(convertedData);
              } else {
                const convertedData = res?.data?.map((element: any) => {
                  return {
                    ...element,
                    id: element?.id.toString(),
                  };
                });

                await db?.products.bulkInsert(convertedData);
              }
            } catch (error) {
              console.log("KJK ", error);
            }
          })
          .catch((error) => {
            console.log("ERRO STOCK REPORT ==> ", error);
          });

        APIService.getUsers()
          .then(async (res) => {
            console.log("CUSTOMERS USERS ==>> ", res);
            try {
              const db = await getDatabase(dbPath);
              const existingData = await db?.users.find().exec();

              if (existingData && existingData?.length > 0) {
                console.log("SOMETHING DEY HERE ALREADY PRODUCTS !!!");

                // Empty the array
                existingData?.splice(0, existingData.length);

                // await db?.products.remove();

                // Filter out customers
                const customers = res?.data?.filter(
                  (item: any) => item?.user_type === "user_customer"
                );

                customers?.forEach(async (element: any) => {
                  await db?.products.upsert({
                    ...element,
                    id: element?.id.toString(),
                  });
                });
              } else {
                // Filter out customers
                const customers = res?.data?.filter(
                  (item: any) => item?.user_type === "user_customer"
                );
                customers?.forEach(async (elem: any) => {
                  await db?.users.insert({
                    ...elem,
                    id: elem?.id.toString(),
                  });
                });
              }
            } catch (error) {
              console.log("KJK ", error);
            }
          })
          .catch((error) => {
            console.log("ERRO STOCK REPORT ==> ", error);
          });
      } else {
        // Load from stored data in DB
        console.log("LOAD FROM DB HERE >>>>");
        const dbPath = localStorage.getItem("dbPath");
        console.log("DB PATH :: ", dbPath);

        try {
          const db = await getDatabase(`${dbPath}`);

          // BUSINESS LOCATIONS
          const offlineBizLocationsData = await db?.categories.find().exec();
          console.log(
            "OFFLINE BUSINESS LOCATIONS :: ",
            offlineBizLocationsData
          );

          // CATEGORIES
          const offlineCategoriesData = await db?.categories.find().exec();
          console.log("OFFLINE CATEGORIES :: ", offlineCategoriesData);
          dispatch(setCategories(offlineCategoriesData));

          // PRODUCTS
          const offlineProdData = await db?.products.find().exec();
          console.log("OFFLINE PRODUCTS :: ", offlineProdData);
          dispatch(setProducts(offlineProdData));
          dispatch(setFilteredProducts(offlineProdData));

          // PAYMENT METHODS
          const offlinePaymentMethodsData = await db?.paymentmethods
            .find()
            .exec();
          console.log("OFFLINE PAYMENT METHODS :: ", offlinePaymentMethodsData);
          if (offlinePaymentMethodsData) {
            const mArray = Object.values(
              offlinePaymentMethodsData[0]?._data?.methods
            );
            dispatch(setPaymentMethods(mArray));
          }
        } catch (error) {
          console.log("ERROOR :: ", error);
        }
      }
    };
    initLogic();
  }, [isOnline, accessToken]);

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
