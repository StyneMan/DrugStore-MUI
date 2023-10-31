import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { SalesSummaryModel, todaySalesSummary } from "../../../data/salessummary";
import SalesCard from "../../../components/cards/sales_card";

export default function SalesSummary() {
  return (
    <Box width={'100%'} >
       
        <Typography fontSize={22} fontWeight={900} color={"black"}>
        Today
        </Typography>
        {/* Todays header */}
      <Grid container spacing={1}>
        {/* Order No Column */}
        <Grid
          item
          md={1}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"start"}
          alignItems={"start"}
        >
          <Typography fontSize={13} fontWeight={300} textAlign={"center"}>
            Order No
          </Typography>
        </Grid>

        {/* Total Amount Column */}
        <Grid
          item
          md={2}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"start"}
          alignItems={"start"}
        >
          <Typography fontSize={13} fontWeight={300} textAlign={"center"}>
            Total Amount
          </Typography>
        </Grid>

        {/* No of items Column */}
        <Grid
          item
          md={1}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"start"}
          alignItems={"start"}
        >
          <Typography fontSize={13} fontWeight={300} textAlign={"center"}>
            No of Items
          </Typography>
        </Grid>

        {/* Mode of Payment Column */}
        <Grid
          item
          md={2}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"start"}
          alignItems={"start"}
        >
          <Typography fontSize={13} fontWeight={300} textAlign={"center"}>
            Mode of Payment
          </Typography>
        </Grid>

        {/* Amount Paid Column */}
        <Grid
          item
          md={2}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"start"}
          alignItems={"start"}
        >
          <Typography fontSize={13} fontWeight={300} textAlign={"center"}>
            Amount Paid
          </Typography>
        </Grid>

        {/* Amount Due Column */}
        <Grid
          item
          md={2}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"start"}
          alignItems={"start"}
        >
          <Typography fontSize={13} fontWeight={300} textAlign={"center"}>
            Amount Due
          </Typography>
        </Grid>

        {/* Time Column */}
        <Grid
          item
          md={1}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"start"}
          alignItems={"start"}
        >
          <Typography fontSize={13} fontWeight={300} textAlign={"center"}>
            Time
          </Typography>
        </Grid>

        {/* Date Column */}
        <Grid
          item
          md={1}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"start"}
          alignItems={"start"}
        >
          <Typography fontSize={13} fontWeight={300} textAlign={"center"}>
            Date
          </Typography>
        </Grid>
      </Grid>
      {
        todaySalesSummary?.map((item: SalesSummaryModel, index: number) => (
            <SalesCard key={index} data={item}  />
        ))
      }
    </Box>
  );
}
