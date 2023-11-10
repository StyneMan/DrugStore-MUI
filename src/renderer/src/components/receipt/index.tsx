import { Box, Button, Divider, Grid, Toolbar, Typography } from "@mui/material";
import React from "react";
import brandLogo from "../../assets/images/virtualrx_logo.svg";
import { usePDF } from "react-to-pdf";

interface ReceiptProps {
  paymentMethod: string;
  tax: number;
  total: number;
  subTotal: number;
}

export default function Receipt({
  paymentMethod,
  subTotal,
  tax,
  total,
}: ReceiptProps) {
  const { toPDF, targetRef } = usePDF();

  return (
    <Box
      px={2}
      pb={2}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"center"}
    >
      <Box
        ref={targetRef}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"start"}
        alignItems={"center"}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <img src={brandLogo} alt="" width={128} />
        </Box>
        <Typography fontSize={22} fontWeight={900} pt={2}>
          Invoice #33j
        </Typography>
        <Box
          pt={2}
          px={2}
          width={"50%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="body2" textAlign={"center"}>
            {`4/6 Ikorodu-Epe Rd, opposite Sabo Market, Ikorodu 104101, Lagos.2349079772482, 09079772482contactus@Drugstoreng.com`}
          </Typography>
        </Box>
        <br />
        {/* Header Sections */}
        <Grid container spacing={2} py={2}>
          <Grid item sm={5} md={5}>
            <Typography color={"gray"}>Description</Typography>
          </Grid>
          <Grid item sm={1} md={1}>
            <Typography color={"gray"}>Qty</Typography>
          </Grid>
          <Grid item sm={3} md={3}>
            <Typography color={"gray"}>Unit Price</Typography>
          </Grid>
          <Grid item sm={3} md={3}>
            <Typography color={"gray"}>Total</Typography>
          </Grid>
        </Grid>
        <Box height={1.1} width={"100%"} bgcolor={"#ccc"} />
        <Box p={2} width={"90%"}>
          <Grid
            px={1}
            py={0.25}
            container
            spacing={2}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              fontSize={14}
              color={"gray"}
              component={Grid}
              item
              sm={6}
              md={6}
            >
              Sub Total: ₦{subTotal}
            </Typography>
            <Typography
              fontSize={14}
              color={"gray"}
              component={Grid}
              item
              sm={6}
              md={6}
            >
              Cash Paid: ₦20,000
            </Typography>
          </Grid>

          <Grid
            px={1}
            py={0.25}
            container
            spacing={2}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              fontSize={14}
              color={"gray"}
              component={Grid}
              item
              sm={6}
              md={6}
            >
              Tax: ₦{tax}
            </Typography>
            <Typography
              fontSize={14}
              color={"gray"}
              component={Grid}
              item
              sm={6}
              md={6}
            >
              Change: ₦20,000
            </Typography>
          </Grid>

          <Grid
            px={1}
            py={0.25}
            container
            spacing={2}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              fontSize={14}
              color={"gray"}
              component={Grid}
              item
              sm={6}
              md={6}
            >
              Total Discount: ₦18,000
            </Typography>
            <Typography
              fontSize={14}
              color={"gray"}
              component={Grid}
              item
              sm={6}
              md={6}
            >
              Note: Nil
            </Typography>
          </Grid>

          <Grid
            px={1}
            py={0.25}
            container
            spacing={2}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              fontSize={14}
              color={"gray"}
              component={Grid}
              item
              sm={6}
              md={6}
            >
              Total: ₦{total}
            </Typography>
          </Grid>
        </Box>
        <Box height={1.1} width={"100%"} bgcolor={"#ccc"} />
        <Box
          p={2}
          width={"40%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography fontSize={14} color={"gray"}>
            Date: {`12th Feb, 2023`}
          </Typography>
          <Typography fontSize={14} color={"gray"}>
            Staff: {`Sarah Olatoye`}
          </Typography>
          <Typography fontSize={14} color={"gray"}>
            Device: {`Till 09`}
          </Typography>
        </Box>
        <br />
      </Box>
      <Button
        onClick={() => toPDF()}
        fullWidth
        variant="contained"
        sx={{ p: 1 }}
      >
        Print
      </Button>
    </Box>
  );
}
