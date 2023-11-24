import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
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
import ProfileDropDownContent from "../profile/dropdown_content";
import { useDispatch, useSelector } from "react-redux";
import {
  Info,
  InsertChartOutlined,
  PersonSearchOutlined,
  SupportAgentOutlined,
  WidgetsOutlined,
  Wifi,
  WifiOff,
} from "@mui/icons-material";
import { RootState } from "../../redux/store";
import toast from "react-hot-toast";
import APIService from "../../service/api_service";
import { setProducts } from "../../redux/slices/product";
import { setFilteredProducts } from "../../redux/slices/search";
import { setCategories } from "../../redux/slices/categories";
import {
  setBusinessLocations,
  setCurrentBusinessLocation,
} from "../../redux/slices/business_locations";

import "./spin.css";
import { setSales, setSalesMeta } from "../../redux/slices/purchase";

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

  const userId: number = parseInt(`${localStorage.getItem("userId") ?? 0}`);
  const location_ID: number = parseInt(
    `${localStorage.getItem("location_id") ?? 0}`
  );

  const currlocation = useLocation();
  const [isRotating, setRotating] = React.useState(false);
  const [showSearchbar, setShowSearchbar] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const dispatch = useDispatch();
  const isOnline = useSelector((state: RootState) => state.loader.isOnline);
  // const pendingSells = useSelector((state: RootState) => state.purchase);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleSync = async () => {
    if (!isOnline) {
      toast.error("Internet connection is required!", {
        icon: <Info color="error" />,
        style: {
          backgroundColor: "#fadcdcf6",
          color: theme.palette.error.dark,
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 16,
          paddingBottom: 16,
          fontSize: 21,
        },
        position: "top-center",
      });
    } else {
      // Start spinning icon here
      setRotating(true);

      // Perform sync here
      try {
        // PRODUCT SYNC
        const productData = await APIService.getProducts();
        if (productData) {
          window.electron.sendDataToMain(JSON.stringify(productData?.data));
          dispatch(setProducts(productData?.data));
          dispatch(setFilteredProducts(productData?.data));
        }

        // CATEGORY SYNC
        const categoryData = await APIService.getCategories();
        if (categoryData) {
          window.electron.sendCategoriesDataToMain(
            JSON.stringify(categoryData?.data)
          );
          dispatch(setCategories(categoryData?.data));
        }

        // BUSINESS LOCATION SYNC
        const businessLocationsData = await APIService.getBusinessLocations();
        if (businessLocationsData) {
          dispatch(setBusinessLocations(businessLocationsData?.data));
          window.electron.sendBusinessLocationDataToMain(
            JSON.stringify(businessLocationsData?.data)
          );

          if (
            localStorage.getItem("locationId") &&
            localStorage.getItem("businessId")
          ) {
            const locationID = localStorage.getItem("locationId");
            const bizID = localStorage.getItem("businessId");

            const currLocation = businessLocationsData?.data?.filter(
              (item) =>
                `${item?.business_id}`.toLowerCase() ===
                  `${bizID}`.toLowerCase() &&
                `${item?.location_id}`.toLowerCase() ===
                  `${locationID}`.toLowerCase()
            );
            dispatch(setCurrentBusinessLocation(currLocation[0]));
          }
        }

        // SALES REPORT SYNC
        const salesData = await APIService.getSalesReport(location_ID, userId);
        if (salesData) {
          dispatch(setSales(salesData?.data));
          dispatch(setSalesMeta(salesData?.meta));
          // console.log("SALES DATA :  ", salesData);
          window.electron.sendSalesSummaryDataToMain(
            JSON.stringify(salesData?.data)
          );
        }

        setRotating(false);

        // PENDING SELLS
      } catch (error) {
        console.error("ERROR IN SYNC :: :: ", error);
      }
    }
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
      icon: PersonSearchOutlined,
      key: "customers",
    },
    {
      title: "Report",
      route: "/dashboard/reports",
      icon: InsertChartOutlined,
      key: "report",
    },
    {
      title: "Activity",
      route: "/dashboard/activity",
      icon: WidgetsOutlined,
      key: "activity",
    },
    {
      title: "Support",
      route: "/dashboard/supports",
      icon: SupportAgentOutlined,
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
                className="spinBtn"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textTransform: "capitalize",
                  color: "black",
                }}
                onClick={() => handleSync()}
              >
                <SyncIcon
                  className={isRotating ? "spin" : "no-spin"}
                  fontSize="large"
                />
                <Typography>Sync</Typography>
              </Button>
              {/* <Typography color={"gray"}>Last Sync: 12:30pm</Typography> */}
            </Box>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
