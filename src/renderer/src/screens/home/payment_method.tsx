import { KeyboardBackspace } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
// import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// import { RootState } from "../../redux/store";
import { NumericFormat } from "react-number-format";
import CustomDialog from "../../components/dialog";
import Receipt from "../../components/receipt";
// import { getDatabase } from "../../../../main/database";

const PaymentMethod = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [openReceipt, setOpenReceipt] = React.useState<boolean>(false);
  const [isConfirmed, setConfirmed] = React.useState<boolean>(false);
  const [isTouched, setTouched] = React.useState<boolean>(false);
  const [cashPaid, setCashPaid] = React.useState<number>(0);
  const currLocation = useLocation();
  const navigate = useNavigate();
  const { paymentMethod, tax, total, subTotal, customerName } =
    currLocation.state;

  // const currentCustomer = useSelector(
  //   (state: RootState) => state.purchase.currentCustomer
  // );

  const renderConfirmAlert = (
    <Box
      pt={4}
      px={3}
      pb={3}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"start"}
    >
      <Typography>{` Are you sure you want to confirm reception of this payment?`}</Typography>
      <Typography gutterBottom>{` Action can not be undone.`}</Typography>
      <Box
        pt={2}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"start"}
        alignItems={"stretch"}
        width="100%"
      >
        <Button
          variant="contained"
          sx={{ textTransform: "capitalize", color: "white", p: 1.5, mb: 1 }}
          onClick={async () => {
            setOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button
          sx={{ textTransform: "capitalize", color: "black", p: 1.5, mt: 1 }}
          onClick={() => {
            setConfirmed(true);
            setOpen(false);
          }}
        >
          Confirm
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box
      height={"100vh"}
      width={"100vw"}
      display={"flex"}
      position={"relative"}
      flexDirection={"column"}
      justifyContent={"start"}
    >
      <CustomDialog
        open={open}
        showClose={false}
        setOpen={setOpen}
        content={renderConfirmAlert}
      />
      <CustomDialog
        open={openReceipt}
        setOpen={setOpenReceipt}
        content={
          <Receipt
            paymentMethod={paymentMethod}
            subTotal={subTotal}
            tax={tax}
            total={total}
          />
        }
      />
      <Toolbar />
      <br />
      <br />

      <Box
        display="flex"
        flexDirection={"row"}
        px={3}
        pt={1}
        top={100}
        position={"fixed"}
      >
        <IconButton onClick={() => navigate("/dashboard/")}>
          <KeyboardBackspace fontSize="large" sx={{ color: "black" }} />
        </IconButton>
      </Box>
      <Box
        mx={6}
        px={4}
        flex={1}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography
          fontSize={28}
          gutterBottom
          color={"black"}
          fontWeight={900}
          textTransform={"capitalize"}
        >
          {`${
            paymentMethod.toLowerCase().includes("cash")
              ? "Collect Cash"
              : paymentMethod.toLowerCase().includes("credit")
              ? "Credit Payment for " + customerName
              : paymentMethod
          } `}
        </Typography>
        <Card
          sx={{
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
            border: "none",
            borderRadius: 2,
            minWidth: "50%",
            mt: 1,
            mb: 4,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
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
              pb={1}
              display={
                !paymentMethod.toLowerCase().includes("credit")
                  ? "none"
                  : "flex"
              }
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography color={"black"} fontSize={16} fontWeight={700}>
                Credit Limit
              </Typography>
              <NumericFormat
                style={{
                  fontSize: 20,
                  fontWeight: 500,
                  fontFamily: "sans-serif",
                }}
                value={parseInt("30000").toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
            </Box>

            {paymentMethod.toLowerCase().includes("cash") ? <></> : <Divider />}

            <Box
              px={4}
              pt={paymentMethod.toLowerCase().includes("cash") ? 0 : 2}
              pb={1}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography fontSize={16} fontWeight={500}>
                Sub Total
              </Typography>

              <NumericFormat
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  fontFamily: "sans-serif",
                }}
                value={subTotal.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
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
                0%
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

              <NumericFormat
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  fontFamily: "sans-serif",
                }}
                value={tax.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
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

              <NumericFormat
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  fontFamily: "sans-serif",
                }}
                value={total.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
            </Box>
            {paymentMethod.toLowerCase().includes("cash") && (
              <>
                <br />
                <Box my={1} width={"100%"} height={1.2} bgcolor={"#eee"} />
                <Box
                  px={4}
                  py={2}
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography flex={1} fontSize={16} fontWeight={500}>
                    Cash Paid
                  </Typography>

                  <NumericFormat
                    placeholder="₦0.0"
                    variant="filled"
                    prefix="₦"
                    required
                    label=""
                    size="small"
                    thousandSeparator
                    value={cashPaid}
                    InputLabelProps={{ shrink: false }}
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        height: 32,
                        paddingBottom: 10,
                      },
                    }}
                    sx={{ width: 100 }}
                    onChange={(e) => {
                      setCashPaid(parseInt(e.target.value));
                      setTouched(true);
                    }}
                    customInput={TextField}
                    error={Boolean(isTouched && cashPaid === 0)}
                    helperText={
                      isTouched && cashPaid === 0
                        ? "Cashpaid is required"
                        : null
                    }
                  />
                </Box>
              </>
            )}
            <br />
            <Typography textAlign={"center"}>
              {`${paymentMethod}`.toLowerCase().includes("transfer")
                ? "Pay"
                : `${paymentMethod}`.toLowerCase().includes("cash")
                ? "Change Due"
                : "Amount Due"}
            </Typography>
            <Typography
              textAlign={"center"}
              variant="h4"
              color={"black"}
              fontWeight={900}
            >
              ₦10,700
            </Typography>
            {paymentMethod.includes("transfer") ? <br /> : <></>}
            <br />
            <Typography
              display={paymentMethod.includes("transfer") ? "flex" : "none"}
              textAlign={"center"}
              color={"gray"}
              fontWeight={600}
              fontSize={18}
            >
              2110912635
            </Typography>
            <Box
              display={paymentMethod.includes("transfer") ? "flex" : "none"}
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography
                gutterBottom
                textAlign={"center"}
                color={"gray"}
                pr={2}
              >
                {"First Bank "}
              </Typography>
              <Typography
                gutterBottom
                textAlign={"center"}
                color={"gray"}
                pl={2}
              >
                {" DrugstoreNG"}
              </Typography>
            </Box>
          </Box>
        </Card>
        <Button
          variant="contained"
          sx={{ textTransform: "capitalize", px: 6, py: 2 }}
          onClick={
            isConfirmed
              ? () => {
                  setOpenReceipt(true);
                }
              : () => {
                  setOpen(true);
                }
          }
        >
          {isConfirmed
            ? "Print Receipt"
            : `${paymentMethod}`.toLowerCase().includes("transfer")
            ? "Confirm Transfer Manually"
            : `${paymentMethod}`.toLowerCase().includes("credit")
            ? "Add Order on Credit"
            : "Print Receipt"}
        </Button>
        {isConfirmed && (
          <Button
            variant="text"
            sx={{
              textTransform: "capitalize",
              px: 6,
              py: 1.5,
              mt: 0.5,
              color: "black",
            }}
          >
            Skip
          </Button>
        )}
      </Box>
      <br />
    </Box>
  );
};

export default PaymentMethod;
