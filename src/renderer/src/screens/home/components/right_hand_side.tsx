import { ArrowDropDown } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Card,
  Popper,
  Tab,
  Tabs,
  Toolbar,
} from "@mui/material";
import React from "react";
import CustomerDropdown from "./customer_dropdown";
import Orders from "../tabs/orders";
import Drafts from "../tabs/drafts";
import OrderSummary from "./order_summary";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

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

export default function RightHandSide() {
  const [value2, setValue2] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const currentCustomer = useSelector(
    (state: RootState) => state.customers.currentCustomer
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleChange2 = (event: React.SyntheticEvent, newValue: number) => {
    setValue2(newValue);
    console.log("EVENT N", event);
  };

  return (
    <Box
      height={"100vh"}
      borderLeft={1}
      borderColor={"#bbb"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
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
              <Button
                variant="text"
                endIcon={<ArrowDropDown />}
                onClick={handleClick}
                sx={{ border: "1px solid gray", color: "gray", minWidth: 156 }}
              >
                {`${currentCustomer?.name || "Customer Name"}`}
              </Button>
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
                  mt={2}
                  width={"24vw"}
                  minWidth={256}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"start"}
                  alignItems={"stretch"}
                >
                  <Card elevation={10} sx={{ p: 2 }}>
                    <CustomerDropdown setAnchorEl={setAnchorEl} />
                  </Card>
                </Box>
              </Popper>
            </Box>
          </StyledTabs>
        </AppBar>
        <Toolbar />
        <CustomTabPanel value={value2} index={0}>
          <Orders />
        </CustomTabPanel>
        <CustomTabPanel value={value2} index={1}>
          <Drafts />
        </CustomTabPanel>
      </Box>
      <Box padding={1} pl={2}>
        <OrderSummary />
      </Box>
    </Box>
  );
}
