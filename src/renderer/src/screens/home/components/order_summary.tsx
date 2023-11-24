/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

import { getDatabase } from "../../../../../main/database";
import { NumericFormat } from "react-number-format";
import { toast } from "react-hot-toast";
import { CheckCircleOutline, Info } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CustomDialog from "../../../components/dialog";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/slices/loader";
import { RootState } from "../../../redux/store";
import { setCurrentBusinessLocation } from "../../../redux/slices/business_locations";
import { setCurrentCustomer } from "../../../redux/slices/customers";
import AccountForm from "../../../components/forms/account";

export default function OrderSummary() {
  const [subTotal, setSubTotal] = React.useState(0);
  const [tax, setTax] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [data, setData] = React.useState<any>([]);
  const [open, setOpen] = React.useState(false);
  const [openAccount, setOpenAccount] = React.useState(false);
  const [openCustomer, setOpenCustomer] = React.useState(false);
  const [isSelected, setSelected] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const [selectedMethod, setSelectedMethod] = React.useState<any>(null);
  const [currentBusinessLocation, setCurrBusinessLocation] =
    React.useState<any>([]);

  const dispatch = useDispatch();

  const currentCustomer = useSelector(
    (state: RootState) => state.customers.currentCustomer
  );
  const customers = useSelector(
    (state: RootState) => state.customers.customers
  );
  const dbasePath = useSelector((state: RootState) => state.database.dbasePath);
  const businessLocations = useSelector(
    (state: RootState) => state.business_locations.businessLocations
  );

  const navigate = useNavigate();
  const theme = useTheme();

  async function getCarts() {
    try {
      const db = await getDatabase(dbasePath);

      db?.carts
        .find()
        .sort({
          id: "asc",
        })
        .$.subscribe(function (heroes) {
          if (!heroes) {
            return;
          }
          setData(heroes[0]);

          let summer = 0,
            taxer = 0;

          heroes.forEach((elem) => {
            // console.log("VALUE !!!! ", elem?._data);
            elem?._data.items?.forEach((el) => {
              summer = summer + el?.quantity * el?.unitPrice;
              taxer = taxer + (el?.priceWithTax - el?.unitPrice);
            });
          });

          setSubTotal(summer);
          // const tx = 0.075 * summer;
          setTax(taxer);
          setTotal(taxer + summer);
        });
    } catch (error) {
      console.log("CATCH ERROR ::: ", error);
    }
  }

  React.useEffect(() => {
    if (businessLocations) {
      const filtered = businessLocations?.filter(
        (item) => item?.location_id === localStorage.getItem("locationId")
      );
      setCurrBusinessLocation(filtered[0]);
      dispatch(setCurrentBusinessLocation(filtered[0]));
    }
  }, [businessLocations, dispatch]);

  React.useEffect(() => {
    getCarts();
  }, []);

  const checkCustomer = () => {
    if (!currentCustomer) {
      // Show dialog to select customer here
      setOpenCustomer(true);
    } else {
      saveDraft();
    }
  };

  const saveDraft = async () => {
    try {
      dispatch(setLoading(true));
      const db = await getDatabase(`${localStorage.getItem("dbPath")}`);
      const draftObj = {
        id: new Date().getTime().toString(),
        customer: currentCustomer,
        amount: total,
        items: data?._data.items,
        timestamp: new Date().toISOString(),
      };

      const resp = await db?.drafts.insert(draftObj);
      dispatch(setLoading(false));

      // Now remove from order
      await db?.carts.remove();
      // Now send an empty array to main process
      window.electron.sendCartDataToMain(JSON?.parse("[]"));

      toast.success("Successfully saved as draft. ", {
        duration: 8000,
        position: "bottom-center",
        icon: (
          <CheckCircleOutline
            fontSize="small"
            sx={{ color: theme.palette.success.dark }}
          />
        ),
        iconTheme: {
          primary: theme.palette.success.main,
          secondary: theme.palette.success.light,
        },
        style: {
          backgroundColor: theme.palette.success.light,
          border: "1px solid",
          borderColor: theme.palette.success.dark,
          paddingLeft: 21,
          paddingRight: 21,
          paddingTop: 8,
          paddingBottom: 8,
        },
      });

      console.log("ADDED DRAFTS RESPONSE >> ", resp);
    } catch (error) {
      console.log(error);
    }
  };

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
            const db = await getDatabase(`${localStorage.getItem("dbPath")}`);
            await db?.carts.remove();
            window.electron.sendCartDataToMain(JSON?.parse("[]"));
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

  const renderSelectCustomer = (
    <Box
      px={4}
      pt={5}
      pb={4}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      width={400}
    >
      <Typography
        textAlign={"center"}
        my={3}
        fontWeight={900}
        fontSize={24}
        gutterBottom
      >
        {"Enter Customer Name"}
      </Typography>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        fullWidth
        sx={{ mb: 1.5 }}
        onChange={(e, val) => {
          const filtered = customers?.filter((elem) => elem?.name === val);
          dispatch(setCurrentCustomer(filtered[0]));
          // console.log("TEXT VALUE :: ", filtered);
        }}
        options={customers?.map((option) => option.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Type customer name here"
            fullWidth
          />
        )}
      />
      <Box
        pt={3}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"start"}
        alignItems={"stretch"}
        width={256}
      >
        <Button
          variant="contained"
          sx={{ textTransform: "capitalize", color: "white", p: 2, mb: 1 }}
          onClick={async () => {
            setOpenCustomer(false);
            saveDraft();
          }}
        >
          Save Draft
        </Button>
        <Button
          sx={{ textTransform: "capitalize", color: "black", p: 2 }}
          onClick={() => {
            setOpenCustomer(false);
          }}
        >
          Skip
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
      <CustomDialog
        open={openAccount}
        setOpen={setOpenAccount}
        content={
          <AccountForm
            setOpen={setOpenAccount}
            currentCustomer={currentCustomer}
            data={data}
            selectedMethod={selectedMethod}
            subTotal={subTotal}
            tax={tax}
            total={total}
          />
        }
      />
      <CustomDialog
        showClose={false}
        open={openCustomer}
        setOpen={setOpenCustomer}
        content={renderSelectCustomer}
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
            {currentBusinessLocation?.payment_methods?.map(
              (item: any, index: number) => (
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
                      console.log("CURRENT PAYMENT METHOD ::  ", item);

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
                      {item?.label}
                    </Typography>
                  </Box>
                </Box>
              )
            )}
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
                if (!currentCustomer) {
                  toast.error("Select customer first!", {
                    icon: <Info color="error" />,
                    style: {
                      backgroundColor: "#fadcdcf6",
                      color: theme.palette.error.dark,
                      paddingLeft: 24,
                      paddingRight: 24,
                      paddingTop: 16,
                      paddingBottom: 16,
                      fontSize: 21,
                    },
                    position: "top-center",
                  });
                } else {
                  if (
                    `${selectedMethod?.name}`.toLowerCase().includes("transfer")
                  ) {
                    setOpenAccount(true);
                  } else {
                    navigate("/dashboard/paymentmethod", {
                      state: {
                        paymentMethod: selectedMethod,
                        tax: tax,
                        total: total,
                        subTotal: subTotal,
                        customer: currentCustomer,
                        orderNo: `${data?._data?.id}`,
                        itemsOrdered: data?._data?.items,
                        customerName: `${
                          currentCustomer?.first_name ?? currentCustomer?.name
                        } ${currentCustomer?.last_name ?? ""}`,
                      },
                    });
                  }
                }
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
              onClick={checkCustomer}
            >
              Save Draft
            </Button>
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
