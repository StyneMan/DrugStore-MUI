import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentMethod = () => {
  const currLocation = useLocation();
  const navigate = useNavigate();
  const { paymentMethod } = currLocation?.state;

  return (
    <Box
      height={"100vh"}
      width={"100vw"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
    >
      <Toolbar />
      <Toolbar />
      <Box display="flex" flexDirection={"row"} px={3}>
        <IconButton onClick={() => navigate("/dashboard/")}>
          <ArrowBack sx={{ color: "black" }} />
        </IconButton>
      </Box>
      <Box
        mx={4}
        px={4}
        flex={1}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"start"}
        alignItems={"center"}
      >
        <Typography
          fontSize={22}
          gutterBottom
          color={"black"}
          fontWeight={900}
          textTransform={"capitalize"}
        >
          {`${paymentMethod} payment for walk-in customer`}
        </Typography>
        <Card
          sx={{
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
            border: "none",
            borderRadius: 2,
            minWidth: "64%",
            mt: 2,
            mb: 4,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            px={4}
            pb={4}
            width={"65%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"start"}
            alignItems={"stretch"}
          >
            <Toolbar />
            <Box
              px={4}
              py={1}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography color={"black"} fontSize={16} fontWeight={700}>
                Credit Limit
              </Typography>

              <Typography color={"black"} fontSize={20} fontWeight={700}>
                ₦30,000
              </Typography>
            </Box>

            <Divider />

            <Box
              px={4}
              pt={2}
              pb={1}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography fontSize={16} fontWeight={500}>
                Sub Total
              </Typography>

              <Typography color={"black"} fontSize={16} fontWeight={700}>
                ₦30,000
              </Typography>
            </Box>

            <Box
              px={4}
              py={1}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography fontSize={16} fontWeight={500}>
                Total Discount
              </Typography>

              <Typography color={"black"} fontSize={16} fontWeight={700}>
                20%
              </Typography>
            </Box>

            <Box
              px={4}
              py={1}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography fontSize={16} fontWeight={500}>
                Tax
              </Typography>

              <Typography color={"black"} fontSize={16} fontWeight={700}>
                ₦235
              </Typography>
            </Box>

            <Box
              px={4}
              pt={1}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography fontSize={16} fontWeight={500}>
                Total
              </Typography>

              <Typography color={"black"} fontSize={16} fontWeight={700}>
                ₦10, 235
              </Typography>
            </Box>
            <Toolbar />
            <Typography textAlign={"center"}>Amount Due</Typography>
            <Typography textAlign={'center'} fontSize={28} color={'black'} fontWeight={900} >₦10,700</Typography>
          </Box>
        </Card>
        <Button
          variant="contained"
          sx={{ textTransform: "capitalize", px: 6, py: 2 }}
        >
          {`Add order on ${paymentMethod}`}
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentMethod;
