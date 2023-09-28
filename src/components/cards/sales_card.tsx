import { Box, Card, Grid, Typography } from "@mui/material";
import React from "react";
import { SalesSummaryModel } from "../../data/salessummary";

interface SalesCardProps {
  data: SalesSummaryModel;
}

export default function SalesCard({ data }: SalesCardProps) {
  return (
    <Card elevation={0} sx={{my: 2, p: 3}} >
      <Box display={"flex"}>
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
            <Typography fontSize={13} fontWeight={300} textAlign={"start"}>
              {data?.orderNo}
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
            <Typography fontSize={15} textAlign={"start"}>
              {`₦${data?.totalAmount}`}
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
            <Typography fontSize={13} fontWeight={300} textAlign={"start"}>
              {data?.noItems}
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
            <Typography fontSize={15} textAlign={"start"}>
              {`${data?.modePayment}`}
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
            <Typography fontSize={15} textAlign={"start"}>
              {`₦${data?.amountPaid}`}
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
            <Typography fontSize={15} textAlign={"start"}>
              {`₦${data?.amountDue}`}
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
            <Typography fontSize={13} fontWeight={300} textAlign={"start"}>
              {data?.time}
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
            <Typography fontSize={13} fontWeight={300} textAlign={"start"}>
              {data?.date}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}
