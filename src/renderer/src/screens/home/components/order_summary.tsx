/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Button,
  Card,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";

// import { tempPaymentMethods } from "../../../data/payment_methods";
import { getDatabase } from "../../../../../main/database";
import { NumericFormat } from "react-number-format";
import { ToastBar, Toaster, toast } from "react-hot-toast";
import { CheckCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CustomDialog from "../../../components/dialog";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/slices/loader";
import { RootState } from "../../../redux/store";
import { setPaymentMethods } from "../../../redux/slices/purchase";

export default function OrderSummary() {
  const [subTotal, setSubTotal] = React.useState(0);
  const [tax, setTax] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [data, setData] = React.useState<any>([]);
  const [open, setOpen] = React.useState(false);
  const [isSelected, setSelected] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const [selectedMethod, setSelectedMethod] = React.useState<string | null>(
    null
  );
  const [deviceType, setDeviceType] = React.useState("mobile");
  // const [paymentMethods, setPaymentMethods] = React.useState<any>([]);

  const dispatch = useDispatch();

  const currentCustomer = useSelector(
    (state) => state.purchase.currentCustomer
  );
  const dbasePath = useSelector((state: RootState) => state.database.dbasePath);
  const paymentMethods = useSelector(
    (state: RootState) => state.purchase.paymentMethods
  );

  const navigate = useNavigate();

  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.only("sm"));

  async function getCarts() {
    try {
      const db = await getDatabase(dbasePath);

      db.carts
        .find()
        .sort({
          id: "asc",
        })
        .$.subscribe(function (heroes) {
          if (!heroes) {
            // heroesList.innerHTML = 'Loading..';
            return;
          }
          setData(heroes[0]);

          let summer = 0;

          heroes.forEach((elem) => {
            // console.log("VALUE !!!! ", elem?._data);
            elem?._data.items?.forEach((el: any) => {
              summer = summer + el?.quantity * el?.unitPrice;
            });
          });

          setSubTotal(summer);
          const tx = 0.075 * summer;
          setTax(tx);
          setTotal(tx + summer);
        });

        console.log("DATABASE CONTENT RIGHT HERE ::: ", db);
        
    } catch (error) {
      console.log("CATCH ERROR ::: ", error);
    }
  }

  // console.log("CURRENT CUSTOMIRAMITE :: ", currentCustomer);

  async function getPaymentMethods() {
    try {
      const db = await getDatabase(dbasePath);

      db.paymentmethods.find().$.subscribe(async function (pMethod) {
        if (!pMethod) {
          // heroesList.innerHTML = 'Loading..';
          console.log("EMPTY DATABASE ::: ");
          return;
        }

        console.log("p METHODS ::: ", pMethod[0]?._data);

        const mArray = Object.values(pMethod[0]?._data?.methods);
        dispatch(setPaymentMethods(mArray));
      });
    } catch (error) {
      console.log("CATCH ERROR ::: ", error);
    }
  }

  React.useEffect(() => {
    getPaymentMethods();
  }, []);

  React.useEffect(() => {
    getCarts();
  });

  React.useEffect(() => {
    if (tablet) {
      setDeviceType("tablet");
    } else {
      setDeviceType("pc");
    }
  }, [tablet]);

  const renderConfirmDeleteOrder = (
    <Box
      p={2}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"start"}
    >
      <Typography>{` Are you sure you want to delete this order?`}</Typography>
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
          sx={{ textTransform: "capitalize", color: "white", p: 1, mb: 1 }}
          onClick={async () => {
            await data?.remove();
            setOpen(false);
          }}
        >
          delete
        </Button>
        <Button
          sx={{ textTransform: "capitalize", color: "black", p: 1 }}
          onClick={() => {
            setOpen(false);
          }}
        >
          Close
        </Button>
      </Box>
    </Box>
  );

  return (
    <Card>
      <CustomDialog
        open={open}
        setOpen={setOpen}
        content={renderConfirmDeleteOrder}
      />
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-evenly"}
        alignItems={"stretch"}
      >
        <Grid
          px={2}
          pt={4}
          container
          spacing={2}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid
            item
            sm={6}
            md={6}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignItems={"stretch"}
          >
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography>Sub Total</Typography>
              <NumericFormat
                style={{ fontSize: 15, fontFamily: "sans-serif" }}
                value={subTotal.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
            </Box>

            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography>Total Discount</Typography>
              <Typography>₦0.00</Typography>
            </Box>
          </Grid>

          <Grid
            item
            sm={6}
            md={6}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignItems={"stretch"}
          >
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography>Tax</Typography>
              <NumericFormat
                style={{ fontSize: 15, fontFamily: "sans-serif" }}
                value={tax.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
            </Box>

            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography>Total</Typography>
              <NumericFormat
                style={{ fontSize: 15, fontFamily: "sans-serif" }}
                value={total.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
            </Box>
          </Grid>
        </Grid>

        <Box
          py={2}
          px={2}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"start"}
          alignItems={"stretch"}
        >
          <Typography gutterBottom={true}>Payment Method</Typography>
          <Box
            width={"100%"}
            height={56}
            overflow={"scroll"}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"center"}
            sx={{
              overflowX: "auto",
              overflowY: "hidden",
              scrollBehavior: "smooth",
              scrollbarColor: "red blue",
            }}
          >
            {paymentMethods?.map((item: any, index: number) => (
              <Box key={index} p={2} borderRadius={1}>
                <Box
                  bgcolor={
                    selectedIndex === index
                      ? theme.palette.primary.light
                      : "#ECF0F4"
                  }
                  boxShadow={
                    selectedIndex === index
                      ? "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
                      : "none"
                  }
                  display={"flex"}
                  borderRadius={2}
                  p={3}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  component={Button}
                  onClick={() => {
                    setSelectedIndex(index);
                    setSelectedMethod(item);
                    setSelected(true);
                  }}
                >
                  <Typography
                    fontSize={13}
                    textAlign={"center"}
                    lineHeight={1.0}
                  >
                    {item}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          px={2}
          pb={2}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <Button
              disabled={!isSelected || !data}
              variant="contained"
              sx={{ p: 1, width: 156 }}
              onClick={() => {
                navigate("/dashboard/paymentmethod", {
                  state: {
                    paymentMethod: selectedMethod,
                    tax: tax,
                    total: total,
                    subTotal: subTotal,
                    customer: currentCustomer,
                    customerName: `${currentCustomer?.first_name} ${currentCustomer?.last_name}`
                  },
                });
              }}
            >
              Place Order
            </Button>
            <Button
              disabled={!data}
              variant="contained"
              sx={{
                p: 1,
                mx: 2,
                width: 96,
                bgcolor: "#CCE4F2",
                color: "black",
              }}
              onClick={async () => {
                try {
                  dispatch(setLoading(true));
                  const db = await getDatabase(
                    `${localStorage.getItem("dbPath")}`
                  );
                  const draftObj = {
                    id: new Date().getTime().toString(),
                    customer: currentCustomer,
                    amount: total,
                    items: data?._data.items,
                    timestamp: new Date().toISOString(),
                  };

                  const resp = await db?.drafts.insert(draftObj);
                  dispatch(setLoading(false));

                  toast.success("Successfully saved as draft. ", {
                    duration: 8000,
                    icon: (
                      <CheckCircleOutline
                        fontSize="small"
                        sx={{ color: theme.palette.success.dark }}
                      />
                    ),
                    iconTheme: {
                      primary: "#000",
                      secondary: "#fff",
                    },
                  });

                  // Now remove from order
                  await data?.remove();

                  console.log("ADDED DRAFTS RESPONSE >> ", resp);
                } catch (error) {
                  dispatch(setLoading(false));
                  console.log("ERROR ==>> ", error?.message);
                }
                //
              }}
            >
              Save Draft
            </Button>
            <Toaster position="bottom-center">
              {(t) => (
                <ToastBar
                  toast={t}
                  position="bottom-center"
                  style={{
                    backgroundColor: theme.palette.success.light,
                    paddingTop: 2,
                    paddingBottom: 2,
                    paddingLeft: 48,
                    paddingRight: 48,
                    border: `1px solid ${theme.palette.success.main}`,
                  }}
                >
                  {({ icon, message }) => (
                    <>
                      {icon}
                      {message}
                      {t.type !== "loading" && (
                        <a onClick={() => toast.dismiss(t.id)}>
                          <p style={{ borderBottom: "1px solid" }}>Undo. </p>
                        </a>
                      )}
                    </>
                  )}
                </ToastBar>
              )}
            </Toaster>
          </Box>
          <Button
            disabled={!data}
            variant="text"
            sx={{ p: 1, width: 156 }}
            onClick={async () => {
              setOpen(true);
            }}
          >
            Delete Order
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
