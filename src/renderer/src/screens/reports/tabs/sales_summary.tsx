import { Box, Card, Grid, Typography } from "@mui/material";
import SalesCard from "../../../components/cards/sales_card";
import { NumericFormat } from "react-number-format";

interface Props {
  data;
}

export default function SalesSummary({ data }: Props) {
  let tSales = 0;

  return (
    <Box>
      {data &&
        data?.map((item, index: number) => {
          const count = 0;
          tSales = count;
          return (
            <Box key={index} width={"100%"} mb={6}>
              <Typography
                gutterBottom
                fontSize={22}
                fontWeight={900}
                color={"black"}
              >
                {item?.date}
              </Typography>
              {/* Todays header */}
              <Grid container spacing={1} mb={-1}>
                {/* Order No Column */}
                <Grid
                  item
                  md={1}
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"start"}
                  alignItems={"start"}
                >
                  <Typography
                    fontSize={13}
                    fontWeight={300}
                    textAlign={"center"}
                  >
                    Order No
                  </Typography>
                </Grid>

                {/* Total Amount Column */}
                <Grid
                  item
                  md={2}
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"center"}
                  alignItems={"start"}
                >
                  <Typography
                    fontSize={13}
                    fontWeight={300}
                    textAlign={"center"}
                  >
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
                  <Typography
                    fontSize={13}
                    fontWeight={300}
                    textAlign={"center"}
                  >
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
                  <Typography
                    fontSize={13}
                    fontWeight={300}
                    textAlign={"center"}
                  >
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
                  <Typography
                    fontSize={13}
                    fontWeight={300}
                    textAlign={"center"}
                  >
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
                  <Typography
                    fontSize={13}
                    fontWeight={300}
                    textAlign={"start"}
                  >
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
                  <Typography
                    fontSize={13}
                    fontWeight={300}
                    textAlign={"center"}
                  >
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
                  <Typography
                    fontSize={13}
                    fontWeight={300}
                    textAlign={"center"}
                  >
                    Date
                  </Typography>
                </Grid>
              </Grid>
              {item?.transactions?.map((it, index: number) => {
               
                tSales = tSales + parseFloat(`${it?.final_total}`);
                return <SalesCard key={index} data={it} />;
              })}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={3} md={3}>
                  <Box
                    p={2.5}
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"start"}
                    alignItems={"center"}
                    component={Card}
                    elevation={0.0}
                  >
                    <Typography fontSize={14} pr={1}>Total Sales:</Typography>
                    <NumericFormat
                      style={{ fontSize: 14, fontFamily: "sans-serif" }}
                      value={tSales?.toFixed(2)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₦"}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <Box
                    p={2.5}
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"start"}
                    alignItems={"center"}
                    component={Card}
                    elevation={0.0}
                  >
                    <Typography fontSize={14} pr={1}>Amount Due:</Typography>
                    <NumericFormat
                      style={{ fontSize: 14, fontFamily: "sans-serif" }}
                      value={0?.toFixed(2)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₦"}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <Box
                    p={2.5}
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"start"}
                    alignItems={"center"}
                    component={Card}
                    elevation={0.0}
                  >
                    <Typography fontSize={14} pr={1}>Cash in Drawer:</Typography>
                    <NumericFormat
                      style={{ fontSize: 14, fontFamily: "sans-serif" }}
                      value={30000?.toFixed(2)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₦"}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          );
        })}
    </Box>
  );
}
