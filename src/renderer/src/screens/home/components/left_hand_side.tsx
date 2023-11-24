import {
  AppBar,
  Box,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
} from "@mui/material";
import React from "react";
import WindowIcon from "@mui/icons-material/Window";
import ViewListIcon from "@mui/icons-material/ViewList";
import CategoriesTab, { CategoryProducts } from "../tabs/categories";
import ProductTab, { ProductListViewTab } from "../tabs/products";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getDatabase } from "../../../../../main/database";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 0,
    width: "100%",
    backgroundColor: "#635ee7",
  },
});

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: 16,
  marginRight: theme.spacing(1),
  fontFamily: "Inter",
  paddingLeft: 16,
  paddingRight: 16,
  height: 16,
  color: "grey",
  "&.Mui-selected": {
    color: "#000",
    fontWeight: theme.typography.fontWeightBold,
    backgroundColor: "#DAE1E7",
    fontFamily: "Inter",
    borderRadius: 10,
    paddingLeft: 16,
    paddingRight: 16,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "gray",
  },
}));

export default function LeftHandSide() {
  const [value, setValue] = React.useState(0);
  const [productViewType, setProductViewType] = React.useState("gridview");
  const isItemClicked = useSelector(
    (state: RootState) => state.category.isItemClicked
  );

  const selectedCategoryItems = useSelector(
    (state: RootState) => state.category.selectedCategoryItems
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log("VENT ", event);
    
  };

  const getCarts = async () => {
    try {
      const db = await getDatabase(`${localStorage.getItem("dbPath")}`);
      const existingData = await db?.carts.find().exec();
      console.log("CARTS RESP :: ", existingData);
    } catch (error) {
      console.log("err", error);
    }
  };

  React.useEffect(() => {
    getCarts();
  }, []);

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <AppBar
        sx={{
          bgcolor: "#ECF0F4",
          zIndex: 10,
          maxWidth: "58%",
          left: 0,
          px: 4,
          pb: 2,
        }}
        elevation={0}
      >
        <Toolbar />
        <Toolbar />

        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <StyledTab label="Categories" />
          <StyledTab label="Products" />
          <Box
            flex={1}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"end"}
            alignItems={"center"}
          >
            {value === 1 && (
              <Box>
                <IconButton onClick={() => setProductViewType("gridview")}>
                  <WindowIcon
                    sx={{
                      color: productViewType === "gridview" ? "black" : "grey",
                    }}
                  />
                </IconButton>

                <IconButton onClick={() => setProductViewType("listview")}>
                  <ViewListIcon
                    sx={{
                      color: productViewType === "listview" ? "black" : "grey",
                    }}
                  />
                </IconButton>
              </Box>
            )}
          </Box>
        </StyledTabs>
      </AppBar>
      <Toolbar />

      <Box
        height={"100vh"}
        ml={4}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
          height: "96vh",
          scrollbarColor: "red blue",
        }}
        display={"flex"}
        flexDirection={"column"}
      >
        <Toolbar />
        <Toolbar />
        <CustomTabPanel value={value} index={0}>
          {isItemClicked ? (
            <CategoryProducts data={selectedCategoryItems} />
          ) : (
            <CategoriesTab />
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {productViewType === "gridview" ? (
            <ProductTab />
          ) : (
            <ProductListViewTab />
          )}
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
