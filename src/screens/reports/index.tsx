import { ArrowBack } from "@mui/icons-material";
import { IconButton, Toolbar } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SalesSummary from "./tabs/sales_summary";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <>{children}</>
        </Box>
      )}
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
    style={{ width: "18%"}}
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
  paddingLeft: 24,
  paddingRight: 24,
  backgroundColor: 'white',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  height: 16,
  color: "grey",
  "&.Mui-selected": {
    color: "#000",
    fontWeight: theme.typography.fontWeightBold,
    backgroundColor: "white",
    fontFamily: "Inter",
    borderRadius: 10,
    paddingLeft: 16,
    paddingRight: 16,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "gray",
  },
}));

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Reports = () => {
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box height={"100vh"} width={"100vw"}>
      <Toolbar />
      <Toolbar />
      <Box
        display="flex"
        flexDirection={"row"}
        justifyContent={"start"}
        alignItems={"center"}
        px={3}
      >
        <IconButton onClick={() => navigate("/dashboard/")}>
          <ArrowBack sx={{ color: "black" }} />
        </IconButton>
        <Typography color={"black"} fontSize={21} fontWeight={800} px={1}>
          Report
        </Typography>
      </Box>
      <Box m={4} sx={{
            flexGrow: 1,
            display: "flex",
          }}>
          <StyledTabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ py: 2 }}
          >
            <StyledTab label="Sales Summary" {...a11yProps(0)} />
            <StyledTab label="Drawer History" {...a11yProps(1)} />
            <StyledTab label="End of the day" {...a11yProps(2)} />
          </StyledTabs>
         <Box width={'100%'} >
         <TabPanel value={value} index={0}>
            <SalesSummary />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
         </Box>
        </Box>
    </Box>
  );
};

export default Reports;
