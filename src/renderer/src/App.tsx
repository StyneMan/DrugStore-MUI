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
import { getDatabase } from "./database";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.loader.isLoading);
  //

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
    }, 5000);

    return () => {
      clearInterval(inte);
    };
  });

  // const { data: productsData } = useProducts();

  React.useEffect(() => {
    APIService.getPaymentMethods()
      .then(async (res) => {
        console.log("pAYMENT METHODS ==>> ", res);
        try {
          const db = await getDatabase("drugstore");
          const obj = {
            id: new Date().getTime().toString(),
            methods: { ...res },
            timestamp: new Date().toISOString(),
          };

          const existingData = await db?.paymentmethods.findOne().exec();

          if (existingData) {
            // Document exists, update it
            await existingData.update({
              $set: obj,
            });
          } else {
            // Document doesn't exist, insert it
            await db?.paymentmethods.insert(obj);
          }
        } catch (error) {
          console.log("KJK ", error);
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

    // APIService.getCategories()
    //   .then(async (res) => {
    //     console.log("CATEGORIES REPORT ==>> ", res);
    //     try {
    //       const db = await getDatabase("drugstore");
    //       const obj = {
    //         id: new Date().getTime().toString(),
    //         methods: { ...res },
    //         timestamp: new Date().toISOString(),
    //       };

    //       const existingData = await db?.paymentmethods.findOne().exec();

    //       if (existingData) {
    //         // Document exists, update it
    //         await existingData.update({
    //           $set: obj,
    //         });
    //       } else {
    //         // Document doesn't exist, insert it
    //         await db?.paymentmethods.insert(obj);
    //       }
    //     } catch (error) {
    //       console.log("KJK ", error);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("ERRO STOCK REPORT ==> ", error);
    //   });
  }, [dispatch]);

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
