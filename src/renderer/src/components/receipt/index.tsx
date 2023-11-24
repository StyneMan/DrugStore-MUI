/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import brandLogo from "../../assets/images/virtualrx_logo.svg";
import { usePDF } from "react-to-pdf";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getDatabase } from "../../../../main/database";
import { NumericFormat } from "react-number-format";

interface ReceiptProps {
  paymentMethod: string;
  tax: number;
  total: number;
  subTotal: number;
}

export default function Receipt({ subTotal, tax, total }: ReceiptProps) {
  const { toPDF, targetRef } = usePDF();
  const [data, setData] = React.useState<any>([]);
  // const [loaded, setLoaded] = React.useState(false);
  const dbasePath = useSelector((state: RootState) => state.database.dbasePath);
  // const change = useSelector((state: RootState) => state.purchase.change);
  const amountPaid = useSelector(
    (state: RootState) => state.purchase.amountPaid
  );

  async function getCarts() {
    try {
      const db = await getDatabase(dbasePath);
      const existingData = await db?.carts.find().exec();

      if (existingData) {
        setData(existingData[0]?._data);
      }
    } catch (error) {
      console.log("CATCH ERROR ::: ", error);
    }
  }

  React.useEffect(() => {
    getCarts();
  });

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
          {` Invoice #${data?.id}`}
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
        <Grid container spacing={2} pt={2}>
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

        <Box py={1} width={"100%"}>
          {data &&
            data.items?.map((el, index: number) => {
              return (
                <Grid key={index} container spacing={2} pb={1}>
                  <Grid item sm={5} md={5}>
                    <Typography color={"gray"} textAlign={"left"}>
                      {el?.name}
                    </Typography>
                  </Grid>
                  <Grid item sm={1} md={1}>
                    <Typography color={"gray"}>{el?.quantity}</Typography>
                  </Grid>
                  <Grid item sm={3} md={3}>
                    <NumericFormat
                      style={{
                        fontSize: 15,
                        fontFamily: "sans-serif",
                        color: "gray",
                      }}
                      value={parseInt(el?.unitPrice).toFixed(2)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₦"}
                    />
                  </Grid>
                  <Grid item sm={3} md={3}>
                    <NumericFormat
                      style={{
                        fontSize: 15,
                        fontFamily: "sans-serif",
                        color: "gray",
                      }}
                      value={(parseInt(el?.unitPrice) * el?.quantity).toFixed(
                        2
                      )}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₦"}
                    />
                  </Grid>
                </Grid>
              );
            })}
        </Box>
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
            <Box
              width={"100%"}
              display={"flex"}
              flexDirection="row"
              justifyContent={"start"}
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
                {"Sub Total: "}
              </Typography>
              <NumericFormat
                style={{
                  fontSize: 15,
                  fontFamily: "sans-serif",
                  color: "gray",
                }}
                value={(subTotal ?? 0).toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
            </Box>
            <Box
              width={"100%"}
              display={"flex"}
              flexDirection="row"
              justifyContent={"start"}
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
                {"Cash Paid: "}
              </Typography>
              <NumericFormat
                style={{
                  fontSize: 15,
                  fontFamily: "sans-serif",
                  color: "gray",
                }}
                value={(amountPaid ?? 0).toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
            </Box>
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
              Change: ₦{}
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
              Total Discount: ₦0.0
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
            Date: {`${Date.now().toLocaleString("en-GB")}`}
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
        onClick={async() => {
          toPDF();
          try {
            const db = await getDatabase(dbasePath);
            if (db) {
              await db.carts.remove();
            }
          } catch (error) {
            console.log("ERR :: ", error);
            
          }
        }}
        fullWidth
        variant="contained"
        sx={{ p: 1 }}
      >
        Print
      </Button>
    </Box>
  );
}
