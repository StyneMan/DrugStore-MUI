/* eslint-disable @typescript-eslint/no-explicit-any */
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
import CurrentRegister from "./tabs/end_of_day";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
    orientation="vertical"
    variant="scrollable"
    {...props}
    style={{ width: "18%" }}
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
  backgroundColor: "white",
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
  const [groupedSales, setGroupedSales] = React.useState<any>();
  const sales = useSelector((state: RootState) => state.purchase.sales);

  // console.log("SALES ", sales);

  React.useEffect(() => {
    if (sales) {
      // Group transactions by date
      const groupedTransactions = sales.reduce((grouped, transaction) => {
        const date = new Date(`${transaction?.updated_at}`).toLocaleDateString(
          "en-GB"
        );

        console.log("DATE FORMATTED :: ", date);

        // Check if there's already a group for the date, if not, create one
        if (!grouped[date]) {
          grouped[date] = [];
        }

        // Add the current transaction to the group
        grouped[date].push(transaction);

        return grouped;
      }, {});

      const sortedGroups = Object.keys(groupedTransactions)
        .sort(
          ([dateA], [dateB]) => Date.parse(`${dateA}`) - Date.parse(`${dateB}`)
        )
        .map((date) => ({
          date: date,
          transactions: groupedTransactions[date],
        }));

      setGroupedSales(sortedGroups);
    }
  }, [sales]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box height={"100vh"} width={"100vw"}>
      <Toolbar />
      <br />
      <br />
      <Box
        display="flex"
        flexDirection={"row"}
        justifyContent={"start"}
        alignItems={"center"}
        px={3}
        py={2}
        zIndex={500}
        width={"100%"}
        position={"fixed"}
        bgcolor={"#ECF0F4"}
      >
        <IconButton onClick={() => navigate("/dashboard/")}>
          <ArrowBack sx={{ color: "black" }} />
        </IconButton>
        <Typography color={"black"} fontSize={21} fontWeight={800} px={1}>
          Report
        </Typography>
      </Box>
      <br />
      <Box
        m={4}
        sx={{
          flexGrow: 1,
          display: "flex",
        }}
      >
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ py: 2, mt: 10, position: "fixed", width: "20%" }}
        >
          <StyledTab label="Sales Summary" {...a11yProps(0)} />
          <StyledTab label="Drawer History" {...a11yProps(1)} />
          <StyledTab label="End of the day" {...a11yProps(2)} />
        </StyledTabs>
        <Box width={"78%"} left={"20%"} position={"absolute"}>
          <TabPanel value={value} index={0}>
            <SalesSummary data={groupedSales} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            <CurrentRegister />
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
};

export default Reports;
