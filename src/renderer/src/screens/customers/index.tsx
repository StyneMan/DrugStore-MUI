import { AddCircleOutlineOutlined, ArrowBack } from "@mui/icons-material";
import { Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
// import React from "react";
import CustomerTable from "../../components/tables/customer_table";
import { useNavigate } from "react-router-dom";

const Customers = () => {
  const navigate = useNavigate();

  return (
    <Box height={"100vh"} width={"100vw"}>
      <Toolbar />
      <Toolbar />
      <Box
        display="flex"
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        pl={3}
      >
        <Box
          display="flex"
          flexDirection={"row"}
          justifyContent={"start"}
          alignItems={"center"}
        >
          <IconButton onClick={() => navigate("/dashboard/")}>
            <ArrowBack sx={{ color: "black" }} />
          </IconButton>
          <Typography color={"black"} fontSize={21} fontWeight={800} px={1}>
            Customers
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{ mx: 4 }}
          startIcon={<AddCircleOutlineOutlined />}
          onClick={() => navigate("/dashboard/customers/new")}
        >
          Add New Customer
        </Button>
      </Box>
      <Box m={4}>
        <CustomerTable />
      </Box>
    </Box>
  );
};

export default Customers;
