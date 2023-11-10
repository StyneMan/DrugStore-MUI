import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
// import Button from '@mui/material/Button';
import List from "@mui/material/List";
// import Divider from '@mui/material/Divider';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import MenuIcon from "@mui/icons-material/Menu"
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import {
  AppBar,
  Avatar,
  Button,
  Card,
  IconButton,
  Popper,
  Toolbar,
  Typography,
} from "@mui/material";

import logo from "../../assets/images/virtualrx_logo.svg";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Searchbar from "../search";

import { styled, useTheme } from "@mui/material/styles";

import SyncIcon from "@mui/icons-material/Sync";
import GridViewIcon from "@mui/icons-material/GridView";
import ReportIcon from "@mui/icons-material/Report";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import ProfileDropDownContent from "../profile/dropdown_content";
import APIService from "../../service/api_service";
import { useDispatch, useSelector } from "react-redux";
// import useProducts from "../../hooks/useProducts";
import { setProducts } from "../../redux/slices/product";
// import useCategories from "../../hooks/useCategories";
import { setFilteredProducts } from "../../redux/slices/search";
import { setCategories } from "../../redux/slices/categories";
import { getDatabase } from "../../../../main/database";
import { Wifi, WifiOff } from "@mui/icons-material";
import { setPaymentMethods } from "../../redux/slices/purchase";

type Anchor = "top" | "left" | "bottom" | "right";

interface ListItemButtonProps {
  children: React.ReactNode;
}

const MListItemButton = styled(ListItemButton)<ListItemButtonProps>(
  ({ theme }) => ({
    background: "tranparent",
    color: "#8A95BF",
    padding: "12px",
    height: "100%",
    width: "100%",
    textAlign: "start",
    borderRadius: "16px",
    textTransform: "capitalize",
    "&:hover": {
      background: "#fff",
      color: theme.palette.primary.main,
    },
  })
);

export default function Dashboard() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const theme = useTheme();
  const navigate = useNavigate();
  const currlocation = useLocation();
  const [showSearchbar, setShowSearchbar] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const dispatch = useDispatch();
  const isOnline = useSelector((state) => state.loader.isOnline);
  // const dbasePath = useSelector((state) => state.database.dbasePath);
  // const filteredProducts = useSelector(
  //   (state) => state.search.filteredProducts
  // );

  // const { data: productsData } = useProducts();
  // const { data: categoriesData } = useCategories();

  // const commitCategories = async (data: any) => {
  //   try {
  //     const db = await getDatabase(`${localStorage.getItem("dbPath")}`);

  //     const obj = {
  //       id: new Date().getTime().toString(),
  //       data: data,
  //       timestamp: new Date().toISOString(),
  //     };

  //     // Check for existing data
  //     const existingData = await db?.categories.find().exec();

  //     if (existingData) {
  //       await Promise.all(existingData.map((data) => data.remove()));
  //     }

  //     const resp = await db?.categories.insert(obj);
  //     console.log("INSERTED CATEGORY RESPONSE :: ", resp);
  //   } catch (error) {
  //     console.log("ERROR", error);
  //   }
  // };

  // async function getProducts() {
  //   try {
  //     const db = await getDatabase(dbasePath);

  //     db.products.find().$.subscribe(async function (products) {
  //       if (!products) {
  //         // heroesList.innerHTML = 'Loading..';
  //         console.log("EMPTY DATABASE ::: ");
  //         return;
  //       }

  //       console.log("PRODUCTS FOUND ::: ", products);
  //       dispatch(setProducts(products));

  //       if (filteredProducts?.length < 0) {
  //         dispatch(setFilteredProducts(products));
  //       }
  //     });
  //   } catch (error) {
  //     console.log("CATCH ERROR ::: ", error);
  //   }
  // }

  // React.useEffect(() => {
  //   getProducts();
  // }, []);

  // React.useEffect(() => {
  //   // console.log("My PRODUCTS DSHBBOARD ==>> ", productsData);
  //   // console.log("My CATEGORIES DSHBBOARD ==>> ", categoriesData);
  //   if (productsData) {
  //     dispatch(setProducts(productsData));
  //     dispatch(setFilteredProducts(productsData?.data));
  //   }
  // }, [ dispatch, productsData]);

  // React.useEffect(() => {
  //   if (categoriesData && isOnline) {
  //     commitCategories(categoriesData?.data);
  //   }
  // }, [categoriesData, isOnline]);

  React.useEffect(() => {
    const dbPath = localStorage.getItem("dbPath");
    const initLogic = async () => {
      if (dbPath && isOnline) {
        APIService.getPaymentMethods()
          .then(async (res) => {
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
              console.log("K PAYMET JK ", error);
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
        //       const db = await getDatabase(dbPath);
        //       const existingData = await db?.categories.find().exec();

        //       if (existingData && existingData?.length > 0) {
        //         console.log("SOMETHING DEY HERE ALREADY CATEGORY !!!");
        //         dispatch(setCategories(existingData));

        //         existingData?.splice(0, existingData.length);
        //         // await db?.categories.remove();

        //         res?.data?.forEach(async (element: any) => {
        //           await db?.categories?.upsert({
        //             ...element,
        //             id: element?.id.toString(),
        //           });
        //         });
        //       } else {
        //         res?.data?.forEach(async (elem: any) => {
        //           await db?.categories?.insert({
        //             ...elem,
        //             id: elem?.id.toString(),
        //           });
        //         });
        //       }
        //     } catch (error) {
        //       console.log("CAT ERR ", error);
        //     }
        //   })
        //   .catch((error) => {
        //     console.log("ERRO CATEGORIES CATEGORIES ==> ", error);
        //   });

        // APIService.getProducts()
        //   .then(async (res) => {
        //     try {
        //       const db = await getDatabase(dbPath);
        //       const existingData = await db?.products.find().exec();

        //       if (existingData && existingData?.length > 0) {
        //         console.log("SOMETHING DEY HERE ALREADY PRODUCTS !!!");

        //         dispatch(setProducts(existingData));
        //         dispatch(setFilteredProducts(existingData));

        //         // Empty the array
        //         existingData?.splice(0, existingData.length);

        //         // await db?.products.remove();
        //         res?.data?.forEach(async (element: any) => {
        //           await db?.products.upsert({
        //             ...element,
        //             id: element?.id.toString(),
        //           });
        //         });
        //       } else {
        //         res?.data?.forEach(async (elem: any) => {
        //           await db?.products.insert({
        //             ...elem,
        //             id: elem?.id.toString(),
        //           });
        //         });
        //       }
        //     } catch (error) {
        //       console.log("KJK ", error);
        //     }
        //   })
        //   .catch((error) => {
        //     console.log("ERRO STOCK REPORT ==> ", error);
        //   });

        // APIService.getUsers()
        //   .then(async (res) => {
        //     console.log("CUSTOMERS USERS ==>> ", res);
        //     try {
        //       const db = await getDatabase(dbPath);
        //       const existingData = await db?.users.find().exec();

        //       if (existingData && existingData?.length > 0) {
        //         console.log("SOMETHING DEY HERE ALREADY PRODUCTS !!!");

        //         // dispatch(setProducts(offlineProdData));
        //         // dispatch(setFilteredProducts(offlineProdData));

        //         // Empty the array
        //         existingData?.splice(0, existingData.length);

        //         // await db?.products.remove();

        //         // Filter out customers
        //         const customers = res?.data?.filter(
        //           (item: any) => item?.user_type === "user_customer"
        //         );

        //         customers?.forEach(async (element: any) => {
        //           await db?.products.upsert({
        //             ...element,
        //             id: element?.id.toString(),
        //           });
        //         });
        //       } else {
        //         // Filter out customers
        //         const customers = res?.data?.filter(
        //           (item: any) => item?.user_type === "user_customer"
        //         );
        //         customers?.forEach(async (elem: any) => {
        //           await db?.users.insert({
        //             ...elem,
        //             id: elem?.id.toString(),
        //           });
        //         });
        //       }
        //     } catch (error) {
        //       console.log("KJK ", error);
        //     }
        //   })
        //   .catch((error) => {
        //     console.log("ERRO STOCK REPORT ==> ", error);
        //   });
      } else {
        // Load from stored data in DB
        console.log("LOAD FROM DB HERE >>>>");
        const dbPath = localStorage.getItem("dbPath");
        console.log("DB PATH :: ", dbPath);

        try {
          const db = await getDatabase(`${dbPath}`);

          // CATEGORIES
          const offlineBizLocationsData = await db?.categories.find().exec();
          console.log(
            "OFFLINE BUSINESS LOCATIONS :: ",
            offlineBizLocationsData
          );
          // dispatch(setCategories(offlineCategoriesData));

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
  }, [isOnline]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const drawerListItems = [
    {
      title: "Front Till",
      route: "/dashboard/home",
      icon: GridViewIcon,
      key: "home",
    },
    {
      title: "Customers",
      route: "/dashboard/customers",
      icon: GridViewIcon,
      key: "customers",
    },
    {
      title: "Report",
      route: "/dashboard/reports",
      icon: ReportIcon,
      key: "report",
    },
    {
      title: "Activity",
      route: "/dashboard/activity",
      icon: HistoryToggleOffIcon,
      key: "activity",
    },
    {
      title: "Support",
      route: "/dashboard/supports",
      icon: ContactSupportIcon,
      key: "support",
    },
  ];

  const handleItemClick = (
    e: React.MouseEvent<HTMLElement>,
    index: number,
    route: string,
    anchor: Anchor
  ) => {
    setSelectedIndex(index);
    // toggleDrawer(anchor, false);
    setState({ ...state, [anchor]: false });
    navigate(route);
  };

  const activeRootStyle = {
    color: theme.palette.primary.main,
    fontWeight: "fontWeightMedium",
    background: "white",
    textAlign: "start",
    borderRadius: "16px",
    textTransform: "capitalize",
  };

  React.useEffect(() => {
    if (currlocation.pathname === "/dashboard/home") {
      setSelectedIndex(0);
      setShowSearchbar(true);
    } else if (currlocation.pathname === "/dashboard/customers") {
      setSelectedIndex(1);
      setShowSearchbar(false);
    } else if (currlocation.pathname === "/dashboard/reports") {
      setSelectedIndex(2);
      setShowSearchbar(false);
    } else if (currlocation.pathname === "/dashboard/activity") {
      setSelectedIndex(3);
    } else if (currlocation.pathname === "/dashboard/supports") {
      setSelectedIndex(4);
      setShowSearchbar(false);
    }
  }, [currlocation]);

  React.useEffect(() => {
    // Get all products from  API
    APIService.getProducts()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });
  }, []);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
    //   sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
    //   role="presentation"
    //   onClick={toggleDrawer(anchor, false)}
    //   onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {drawerListItems?.map((data, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{
              display: "block",
              ...(index === selectedIndex && activeRootStyle),
            }}
          >
            <MListItemButton
              sx={{
                minHeight: 48,
                display: "flex",
                flexDirection: "column",
                justifyContent: state[anchor] ? "initial" : "center",
                px: 2.5,
                my: 1,
              }}
              onClick={(e) => handleItemClick(e, index, data?.route, anchor)}
              selected={index === selectedIndex}
            >
              <data.icon />
              {state[anchor] && <Box pr={data.key === "explore" ? 2 : 3} />}
              <ListItemText
                primary={data.title}
                sx={{ opacity: state[anchor] ? 1 : 0 }}
              />
            </MListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <AppBar position="fixed" sx={{ bgcolor: "#ECF0F4", p: 2 }}>
            <Toolbar
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                flex={1}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"start"}
                alignItems={"start"}
              >
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer(anchor, true)}
                  edge="start"
                  // sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                  <DensitySmallIcon sx={{ color: "#0F408A" }} />
                </IconButton>
                <Box px={2}>
                  <img src={logo} alt="" width={100} />
                </Box>
              </Box>
              {showSearchbar && (
                <Box ml={6} mr={4} flex={4}>
                  <Searchbar />
                </Box>
              )}
              <Box
                flex={1}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"end"}
                alignItems={"center"}
              >
                {isOnline ? (
                  <Wifi color="success" fontSize="large" sx={{ mr: 2 }} />
                ) : (
                  <WifiOff color="error" fontSize="large" sx={{ mr: 2 }} />
                )}

                <IconButton onClick={handleClick}>
                  <Avatar
                    sx={{ width: 56, height: 56 }}
                    src="https://images.generated.photos/yHB68S2StFH13k8q8doQsZa0Ol3MAgQnZ2LrdDoMvCs/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MDE2NDQ5LmpwZw.jpg"
                  />
                </IconButton>
                <Popper
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  placement="bottom-end"
                  sx={{ zIndex: 500 }}
                >
                  <Box
                    bgcolor={"white"}
                    zIndex={2000}
                    mt={4}
                    width={"20vw"}
                    minWidth={150}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"start"}
                    alignItems={"stretch"}
                  >
                    <Card elevation={10} sx={{ p: 2 }}>
                      <ProfileDropDownContent />
                    </Card>
                  </Box>
                </Popper>
              </Box>
            </Toolbar>
          </AppBar>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <main>
            <Outlet />
          </main>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            sx={{ width: 250 }}
            onClose={toggleDrawer(anchor, false)}
          >
            <Box
              width={200}
              py={4}
              px={2}
              height="100%"
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"start"}
                alignItems={"center"}
              >
                <img src={logo} alt="" width={128} />
                <br />
                {list(anchor)}
              </Box>
            </Box>
            <Box
              pb={4}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textTransform: "capitalize",
                  color: "black",
                }}
              >
                <SyncIcon fontSize="large" />
                <Typography fontSize={21}>Sync</Typography>
              </Button>
            </Box>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
