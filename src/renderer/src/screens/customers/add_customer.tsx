import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import NewCustomerForm from "../../components/forms/new_customer";

export default function AddCustomer() {
  const [customerType, setCustomerType] = React.useState("");
  const navigate = useNavigate();
  return (
    <Box height={"100vh"} width={"100vw"}>
      <Toolbar />
      <Toolbar />
      <Box
        bgcolor={"#ECF0F4"}
        position="fixed"
        left={0}
        right={0}
        zIndex={500}
        display="flex"
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        px={3}
      >
        <Box
          display="flex"
          flexDirection={"row"}
          justifyContent={"start"}
          alignItems={"center"}
        >
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack sx={{ color: "black" }} />
          </IconButton>
          <Typography color={"black"} fontSize={21} fontWeight={800} px={1}>
            New Customer
          </Typography>
        </Box>
        <Select
          size="small"
          value={customerType}
          name="gender"
          sx={{ minWidth: 175 }}
          onChange={(e) => setCustomerType(e?.target?.value)}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled aria-disabled value="">
            <em>Customer Type</em>
          </MenuItem>
          {["Individual", "Business"].map((item) => (
            <MenuItem key={item} value={item?.toLowerCase()}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Toolbar />
      <NewCustomerForm />
    </Box>
  );
}
