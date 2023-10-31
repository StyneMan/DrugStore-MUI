import { Box, Card, Divider, Grid, Toolbar, Typography } from "@mui/material";
import React from "react";
import {
  RegisterModel,
  tempCurrentRegiser,
} from "../../../data/current_registers";
import ProductSoldTable from "../components/product_sold_table";
import CashDenominations from "../components/cash_denominations";

export default function CurrentRegister() {

  // const [open, setOpen] = React.useState();

  return (
    <Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"100%"}
      >
        <Typography fontSize={22} fontWeight={900} color={"black"}>
          Current Register
        </Typography>
        <Typography>
          10th July, 2023 7:20 PM - 10th July, 2023 7:20 PM
        </Typography>
      </Box>
      <Grid container spacing={2} py={4}>
        <Grid item sm={6} md={7}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"start"}
            alignItems={"stretch"}
            width={"96%"}
          >
            {/* Header Section */}
            <Grid container spacing={2} mb={1}>
              <Grid item sm={5} md={5}>
                <Typography textAlign={"left"}>Payment Method</Typography>
              </Grid>
              <Grid item sm={4} md={4}>
                <Typography textAlign={"left"}>Sell</Typography>
              </Grid>
              <Grid item sm={3} md={3}>
                <Typography textAlign={"left"}>Expenses</Typography>
              </Grid>
            </Grid>
            <Card sx={{ borderRadius: 3 }}>
              <Box p={1}>
                {tempCurrentRegiser.map(
                  (item: RegisterModel, index: number) => (
                    <Grid key={index} container spacing={2} p={3}>
                      <Grid item sm={5} md={5}>
                        <Typography textAlign={"start"}>
                          {item?.paymentMethod}
                        </Typography>
                      </Grid>
                      <Grid item sm={4} md={4}>
                        <Typography textAlign={"start"}>
                          {item?.sellAmount}
                        </Typography>
                      </Grid>
                      <Grid item sm={3} md={3}>
                        <Typography textAlign={"start"}>
                          {item?.expenses}
                        </Typography>
                      </Grid>
                    </Grid>
                  )
                )}
              </Box>
            </Card>
          </Box>
        </Grid>
        <Grid
          item
          sm={6}
          md={5}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"end"}
          alignItems={"end"}
        >
          <Card sx={{ width: "80%", borderRadius: 3 }}>
            <Box
              p={4}
              display={"flex"}
              flexDirection="column"
              justifyContent={"start"}
              alignItems={"stretch"}
            >
              <Box
                display={"flex"}
                flexDirection="row"
                justifyContent={"space-between"}
                alignItems={"center"}
                py={1}
              >
                <Typography>Total Sales</Typography>

                <Typography>₦90,000</Typography>
              </Box>
              <Box
                py={1}
                display={"flex"}
                flexDirection="row"
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography>Total Refund</Typography>

                <Typography>₦90,000</Typography>
              </Box>
              <Box
                py={1}
                display={"flex"}
                flexDirection="row"
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography>Total Payment</Typography>

                <Typography>₦90,000</Typography>
              </Box>
              <Box
                py={1}
                display={"flex"}
                flexDirection="row"
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography>Credit Sales</Typography>

                <Typography>₦90,000</Typography>
              </Box>
              <br />
              <Divider />
              <br />
              <Box
                display={"flex"}
                flexDirection="row"
                justifyContent={"space-between"}
                alignItems={"center"}
                pt={1}
              >
                <Typography>Total Sales</Typography>

                <Typography>₦90,000</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Toolbar />
      <Typography fontSize={22} fontWeight={900} color={"black"} gutterBottom>
        Details of products Sold
      </Typography>
      <Box width={"75%"}>
        <ProductSoldTable />
      </Box>

      <Toolbar />
      <Typography fontSize={22} fontWeight={900} color={"black"} gutterBottom>
        Details of products Sold (By Brand)
      </Typography>
      <Box width={"75%"}>
        <ProductSoldTable />
      </Box>

      <Toolbar />
      <Typography fontSize={22} fontWeight={900} color={"black"} gutterBottom>
        Cash Denominations
      </Typography>
      <Box width={"60%"}>
        <CashDenominations />
      </Box>
    </Box>
  );
}
