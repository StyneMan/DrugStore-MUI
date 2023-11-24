import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface AccountProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMethod;
  tax: number;
  total: number;
  subTotal: number;
  currentCustomer;
  data;
}

export default function AccountForm({
  setOpen,
  currentCustomer,
  data,
  selectedMethod,
  subTotal,
  tax,
  total,
}: AccountProps) {
  const [bank, setBank] = React.useState("");
  const [accNum, setAccNum] = React.useState("");
  const [accName, setAccName] = React.useState("");

  const navigate = useNavigate();

  return (
    <Box
      px={4}
      pb={4}
      pt={2}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      width={400}
    >
      <Typography
        textAlign={"center"}
        mb={4}
        fontWeight={900}
        fontSize={24}
        gutterBottom
      >
        {"Account Number"}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <Box
            display="flex"
            flexDirection={"column"}
            justifyContent={"start"}
            alignItems={"start"}
          >
            <Typography>Account Number</Typography>
            <TextField
              name="accName"
              variant="filled"
              placeholder="e.g 20003489493"
              type="number"
              fullWidth
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setAccNum(e?.target?.value);
              }}
              size="small"
              InputProps={{
                disableUnderline: true,
                style: {
                  backgroundColor: "#eee",
                  borderRadius: 1,
                  height: 50,
                },
              }}
              helperText=""
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Box
            display="flex"
            flexDirection={"column"}
            justifyContent={"start"}
            alignItems={"start"}
          >
            <Typography>Bank</Typography>
            <TextField
              name="bank"
              variant="filled"
              placeholder="e.g First Bank"
              type="text"
              fullWidth
              label=""
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setBank(e?.target?.value);
              }}
              size="small"
              InputProps={{
                disableUnderline: true,
                style: {
                  backgroundColor: "#eee",
                  borderRadius: 1,
                  height: 50,
                },
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={0.25} mb={2.5}>
        <Grid item xs={12} sm={6} md={6}>
          <Box
            display="flex"
            flexDirection={"column"}
            justifyContent={"start"}
            alignItems={"start"}
          >
            <Typography>Account Name</Typography>
            <TextField
              name="accName"
              variant="filled"
              placeholder="e.g DrugStore Limited"
              type="text"
              fullWidth
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setAccName(e?.target?.value);
              }}
              size="small"
              InputProps={{
                disableUnderline: true,
                style: {
                  backgroundColor: "#eee",
                  borderRadius: 1,
                  height: 50,
                },
              }}
            />
          </Box>
        </Grid>
      </Grid>
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
            // saveDraft();
            setOpen(false);
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
                bank: bank,
                accName,
                accNum,
              },
            });
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
