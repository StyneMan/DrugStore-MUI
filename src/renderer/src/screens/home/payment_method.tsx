import { DoneAll, KeyboardBackspace } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import CustomDialog from "../../components/dialog";
import Receipt from "../../components/receipt";
import APIService from "../../service/api_service";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import formatDate from "../../utils/dateFormatter";
import { setLoading, setReload } from "../../redux/slices/loader";
import {
  setAmountPaid,
  setChange as setChangeLeft,
} from "../../redux/slices/purchase";
import toast from "react-hot-toast";

const PaymentMethod = () => {
  const [openReceipt, setOpenReceipt] = React.useState<boolean>(false);
  const [isConfirmed, setConfirmed] = React.useState<boolean>(false);
  const [isTouched, setTouched] = React.useState<boolean>(false);
  const [organized, setOrganized] = React.useState<unknown[]>([]);
  const [cashPaid, setCashPaid] = React.useState<number>(0);
  const [open, setOpen] = React.useState<boolean>(false);
  const [change, setChange] = React.useState<number>(0);
  const currLocation = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();

  const {
    paymentMethod,
    tax,
    total,
    subTotal,
    customerName,
    orderNo,
    itemsOrdered,
    bank,
    accName,
    accNum,
  } = currLocation.state;

  const currentCustomer = useSelector(
    (state: RootState) => state.customers.currentCustomer
  );
  const currentBusinessLocation = useSelector(
    (state: RootState) => state.business_locations.currentBusinessLocation
  );
  const isOnline: boolean = useSelector(
    (state: RootState) => state.loader.isOnline
  );
  const shouldReload: boolean = useSelector(
    (state: RootState) => state.loader.shouldReload
  );

  React.useEffect(() => {
    if (itemsOrdered) {
      const filtered = itemsOrdered?.map((item) => {
        return {
          product_id: parseInt(item?.productId),
          variation_id:
            parseInt(item?.variationId) || parseInt(item?.productId),
          quantity: item?.quantity,
          unit_price: parseInt(item?.unitPrice),
          product_type: item?.productType,
          line_discount_type: "fixed",
          line_discount_amount: 0,
          item_tax: 0,
          enable_stock: 1,
          product_unit_id: item?.productUnitId,
          sub_unit_id: item?.productUnitId,
          base_unit_multiplier: 1,
        };
      });

      setOrganized(filtered);
    }
  }, [itemsOrdered]);

  const sell = async () => {
    try {
      setOpen(false);
      dispatch(setLoading(true));
      dispatch(setChangeLeft(change));
      dispatch(setAmountPaid(cashPaid));
      // const db = await getDatabase(`${localStorage.getItem("dbPath")}`);
      const paymentObj = {
        amount: paymentMethod?.name?.toLowerCase().includes("cash")
          ? cashPaid
          : total,
        method: paymentMethod?.name,
        note: `Payment for #${orderNo} by ${customerName}`,
      };

      const payload = {
        _token: localStorage.getItem("accessToken"),
        location_id: currentBusinessLocation?.id,
        contact_id: parseInt(currentCustomer?.id) || 12,
        transaction_date: formatDate(new Date()),
        invoice_no: `${orderNo}`,
        final_total: total,
        status: "final",
        sale_note: "Sell from DrugStore desktop application",
        staff_note: "",
        is_suspend: 0,
        price_group: 0,
        recur_interval_type: "days",
        delivered_to: `${customerName}`,
        shipping_charges_modal: 0,
        shipping_status_modal: null,
        change_return: paymentMethod?.name?.toLowerCase().includes("cash")
          ? change
          : 0,
        additional_notes: "",
        products: organized,
        payments: [paymentObj],
      };

      // console.log("SELL PAYLOAD >>> ", JSON.stringify(payload));

      if (isOnline) {
        await APIService.createSell({
          sells: [payload],
        });

        dispatch(setReload(!shouldReload));
      } else {
        console.log("OFFLINE SALE ... ");
        // Save to rxdb and push online when there is internet
        // Send to main process
        const pendingSells = await window.electron.pendingSells();
        console.log("CURRENT PENDING SELLS  ", pendingSells);
        
        // console.log("CHECK PENDING >>> ",  JSON?.stringify([...pendingSells, { sells: [payload] }]));
        window.electron.sendPendingSellsDataToMain(
          JSON?.stringify([{ sells: [payload] }])
        );
        
        window.electron.sendCartDataToMain(JSON?.parse("[]"));
      }

      window.electron.sendCartDataToMain(JSON?.parse("[]"));

      // console.log("SELL RESPONSE ... ", response);
      dispatch(setLoading(false));

      toast.success("Order successfully sold!", {
        icon: <DoneAll color="success" />,
        style: {
          backgroundColor: theme.palette.success.light,
          color: theme.palette.success.dark,
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 16,
          paddingBottom: 16,
          fontSize: 21,
        },
        position: "top-center",
      });
      setConfirmed(true);
    } catch (error) {
      dispatch(setLoading(false));
      console.log("SELL ERROR :: ", error);
    }
  };

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
          variant="text"
          sx={{ textTransform: "capitalize", color: "black", p: 1.5, mb: 1 }}
          onClick={async () => {
            setOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ textTransform: "capitalize", color: "white", p: 1.5, mt: 1 }}
          onClick={() => {
            sell();
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
            paymentMethod={paymentMethod?.name}
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
            paymentMethod?.label.toLowerCase().includes("cash")
              ? "Collect Cash"
              : paymentMethod?.label.toLowerCase().includes("credit")
              ? "Credit Payment for " + customerName
              : paymentMethod?.label
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
                !paymentMethod?.name?.toLowerCase().includes("credit")
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

            {paymentMethod?.name?.toLowerCase().includes("cash") ? (
              <></>
            ) : (
              <Divider />
            )}

            <Box
              px={4}
              pt={paymentMethod?.name?.toLowerCase().includes("cash") ? 0 : 2}
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
            {paymentMethod?.name?.toLowerCase().includes("cash") && (
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
                      // console.log("CURR LOCATION :: :: ", currentBusinessLocation);

                      setCashPaid(parseInt(e.target.value));
                      setTouched(true);
                      const result =
                        parseInt(
                          e.target.value.replace("₦", "").replace(",", "")
                        ) - total;
                      setChange(result);
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
              {`${paymentMethod?.label}`.toLowerCase().includes("transfer")
                ? "Pay"
                : `${paymentMethod?.label}`.toLowerCase().includes("cash")
                ? "Change Due"
                : "Amount Due"}
            </Typography>
            <NumericFormat
              style={{
                fontSize: 21,
                fontWeight: 500,
                textAlign: "center",
                fontFamily: "sans-serif",
              }}
              value={(`${paymentMethod?.label}`.toLowerCase().includes("cash")
                ? change
                : total
              ).toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₦"}
            />

            {paymentMethod?.name.includes("transfer") ? <br /> : <></>}
            <br />
            <Typography
              display={
                paymentMethod?.name?.includes("transfer") ? "flex" : "none"
              }
              textAlign={"center"}
              color={"gray"}
              fontWeight={600}
              fontSize={18}
            >
              {accNum}
            </Typography>
            <Box
              display={
                paymentMethod?.name?.includes("transfer") ? "flex" : "none"
              }
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
                {bank}
              </Typography>
              <Typography
                gutterBottom
                textAlign={"center"}
                color={"gray"}
                pl={2}
              >
                {accName}
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
            : `${paymentMethod?.label}`.toLowerCase().includes("transfer")
            ? "Confirm Transfer Manually"
            : `${paymentMethod?.label}`.toLowerCase().includes("credit")
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
            onClick={() => navigate("/dashboard/home")}
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
