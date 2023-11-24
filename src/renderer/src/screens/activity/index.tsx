/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowBack } from "@mui/icons-material";
import { Button, IconButton, Toolbar } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { MActivity, tempActivities } from "../../data/activities";
import ItemContent from "./components/item_content";

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

interface TabButtonProps {
  value: number;
  setValue: any;
  index: number;
  amount: string;
  time: string;
}

const TabButton = ({
  index,
  setValue,
  value,
  amount,
  time,
}: TabButtonProps) => (
  <Button
    sx={{
      bgcolor: value === index ? "#D9D9D9" : "white",
      py: 2,
      px: 1,
      my: 1,
    }}
    onClick={() => setValue(index)}
  >
    <Box
      width={"100%"}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"start"}
        alignItems={"center"}
      >
        <Box
          bgcolor={value === index ? "#F8F8F8" : "#D9D9D9"}
          borderRadius={12}
          width={24}
          height={24}
        />
        <Typography fontSize={16} fontWeight={700} color={"black"} px={2}>
          {amount}
        </Typography>
      </Box>
      <Typography fontSize={12} fontWeight={700} color={"black"} px={2}>
        {time}
      </Typography>
    </Box>
  </Button>
);

const Activity = () => {
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);

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
          Activity
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
          sx={{ py: 2, mt: 2, position: "fixed", width: "25%" }}
        >
          <Typography variant="body2" fontWeight={600} pt={2}>
            TODAY
          </Typography>
          <Box
            overflow={"scroll"}
            height={"90vh"}
            display={"flex"}
            flexDirection={"column"}
          >
            {tempActivities.map((item: MActivity, index: number) => (
              <TabButton
                key={index}
                value={value}
                setValue={setValue}
                amount={item?.amount}
                time={item?.time}
                index={index}
              />
            ))}
          </Box>
        </StyledTabs>
        <Box width={"75%"} left={"25%"} position={"absolute"}>
          {tempActivities.map((item: MActivity, index: number) => (
            <TabPanel key={index} value={value} index={index}>
              <ItemContent activity={item} />
            </TabPanel>
          ))}

          {/* <TabPanel value={value} index={0}>
            Item One
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
          <TabPanel value={value} index={3}>
            Item Four
          </TabPanel>
          <TabPanel value={value} index={4}>
            Item Five
          </TabPanel> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Activity;
