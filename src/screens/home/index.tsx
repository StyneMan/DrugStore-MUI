import {
  AppBar,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Popper,
  SelectChangeEvent,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import CategoriesTab from "./tabs/categories";
import WindowIcon from "@mui/icons-material/Window";
import ViewListIcon from "@mui/icons-material/ViewList";
import ProductTab from "./tabs/products";
import ProductsTable from "../../components/tables/product_table";
import Orders from "./tabs/orders";
import OrderSummary from "./components/order_summary";
import { ArrowDropDown, Search } from "@mui/icons-material";

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

const HomeScreen = () => {
  const [value, setValue] = React.useState(0);
  const [value2, setValue2] = React.useState(0);
  const [productViewType, setProductViewType] = React.useState("gridview");
  const [customers, setCustomers] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;


  const handleCustomers = (event: SelectChangeEvent) => {
    setCustomers(event.target.value);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChange2 = (event: React.SyntheticEvent, newValue: number) => {
    setValue2(newValue);
  };

  return (
    <Box py={1}>
      <Grid container spacing={2} height={"100vh"} width={"100vw"}>
        <Grid item sm={7} md={7} width={"100%"}>
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
                      <IconButton
                        onClick={() => setProductViewType("gridview")}
                      >
                        <WindowIcon
                          sx={{
                            color:
                              productViewType === "gridview" ? "black" : "grey",
                          }}
                        />
                      </IconButton>

                      <IconButton
                        onClick={() => setProductViewType("listview")}
                      >
                        <ViewListIcon
                          sx={{
                            color:
                              productViewType === "listview" ? "black" : "grey",
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
                height: '96vh',
                scrollbarColor: "red blue",
              }}
              display={"flex"}
              flexDirection={"column"}
            >
              <Toolbar />
              <Toolbar />
              <CustomTabPanel value={value} index={0}>
                <CategoriesTab />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                {productViewType === "gridview" ? (
                  <ProductTab />
                ) : (
                  <ProductsTable />
                )}
              </CustomTabPanel>
            </Box>
          </Box>
        </Grid>

        {/* Right side of the home screen */}
        <Grid item sm={5} md={5} width={"100%"} height={"100%"} padding={1} >
          <Box height={"100vh"} borderLeft={1}  borderColor={"#bbb"} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}    >
            <Box>
              <AppBar
                sx={{
                  bgcolor: "#ECF0F4",
                  zIndex: 10,
                  maxWidth: "40.5%",
                  right: 2,
                  pl: 1,
                  pr: 4,
                  pb: 2,
                }}
                elevation={0}
              >
                <Toolbar />
                <Toolbar />

                <StyledTabs
                  value={value2}
                  onChange={handleChange2}
                  aria-label="styled tabs example2"
                >
                  <StyledTab label="Orders" />
                  <StyledTab label="Drafts" />
                  <Box
                    flex={1}
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"end"}
                    alignItems={"center"}
                  >
                    <Button variant="text" endIcon={<ArrowDropDown />} onClick={handleClick} sx={{ border: '1px solid gray', color: 'gray' }}  >
                      Customer Name
                    </Button>
                    <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-end" sx={{ zIndex: 500 }} >
                      <Box
                        bgcolor={"white"}
                        zIndex={2000}
                        mt={2}
                        width={"20vw"}
                        minWidth={200}
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"start"}
                        alignItems={"stretch"}
                      >
                        <Card elevation={10} sx={{ p: 3 }}>

                          <Box pb={4}>
                            <Typography gutterBottom fontSize={20} fontWeight={700} >
                              Customers
                            </Typography>
                            <TextField onChange={(e) => { }}
                              fullWidth
                              placeholder="Search Customers"
                              InputProps={{
                                style: {backgroundColor: '#ECF0F4B2'},
                                disableUnderline: true,
                                startAdornment: <Search sx={{color: 'gray'}} />
                              }}
                            />
                          </Box>
                        </Card>
                      </Box>
                    </Popper>
                    {/* <FormControl sx={{ m: 1, width: 200 }}>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={"Customer name"}
                        // onChange={handleCustomers}
                        size="small"
                      >
                        {["Customer name", "John Doe", "Terebina Jakure"].map(
                          (val: string, index: number) => (
                            <MenuItem key={index} value={val}>
                              {val}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl> */}
                  </Box>
                </StyledTabs>
              </AppBar>
              <Toolbar />
              <CustomTabPanel value={value2} index={0}>
                <Orders />
              </CustomTabPanel>
              <CustomTabPanel value={value2} index={1}>
                kjdbkjsdcjsdk
              </CustomTabPanel>
            </Box>
            <Box width={'38%'} padding={4} position={'fixed'} bottom={0}  >
              <OrderSummary />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeScreen;
