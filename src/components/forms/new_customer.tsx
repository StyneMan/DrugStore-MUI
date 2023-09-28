import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";

import * as Yup from "yup";

type CustomerProps = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  gender: string;
  homeAddress: string;
  date: string;
  shippingAddress: string;
  mobileID: string;
  phoneNumber: string | null;
};

export default function NewCustomerForm() {
  const [value, setValue] = React.useState();

  const customerSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    emailAddress: Yup.string()
      .email("Invalid email address")
      .required("First name is required"),
    gender: Yup.string().required("Gender is required"),
    mobileID: Yup.string().required("Mobile ID is required"),
    phoneNumber: Yup.number()
      .max(11, "Maximum allowed is 11 digits")
      .required("Gender is required"),
    date: Yup.string().required("Date is required"),
    homeAddress: Yup.string().required("Home address is required"),
    shippingAddress: Yup.string().required("Shipping address is required"),
  });

  const initialValues: CustomerProps = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    gender: "",
    homeAddress: "",
    date: new Date().toDateString(),
    mobileID: "",
    shippingAddress: "",
    phoneNumber: null,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: customerSchema,
    onSubmit: (values) => {
      console.log(values.emailAddress);
    },
  });

  const { errors, touched, values, handleSubmit, handleChange, setFieldValue } =
    formik;
  return (
    <Box px={4} role="form">
      <Grid container spacing={4}>
        <Grid item sm={6} md={6} lg={5}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="start"
            alignItems="start"
          >
            <Typography>First Name</Typography>
            <TextField
              variant="outlined"
              placeholder="Enter first name"
              value={values.firstName}
              onChange={handleChange}
              name="firstName"
              fullWidth
              InputProps={{
                style: { backgroundColor: "white" },
              }}
              helperText={touched.firstName && errors.firstName}
              error={Boolean(touched.firstName && errors.firstName)}
            />
          </Box>
        </Grid>
        <Grid item sm={6} md={6} lg={5}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="start"
            alignItems="start"
          >
            <Typography>Last Name</Typography>
            <TextField
              variant="outlined"
              placeholder="Enter last name"
              value={values.lastName}
              onChange={handleChange}
              name="lastName"
              fullWidth
              InputProps={{
                style: { backgroundColor: "white" },
              }}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={4} mt={0.5}>
        <Grid item sm={6} md={7} lg={8}>
          <Box
            width="80%"
            display="flex"
            flexDirection="column"
            justifyContent="start"
            alignItems="start"
          >
            <Typography>Email Address</Typography>
            <TextField
              variant="outlined"
              placeholder="Enter email address"
              value={values.emailAddress}
              onChange={handleChange}
              name="emailAddress"
              fullWidth
              InputProps={{
                style: { backgroundColor: "white" },
              }}
              error={Boolean(touched.emailAddress && errors.emailAddress)}
              helperText={touched.emailAddress && errors.emailAddress}
            />
          </Box>
        </Grid>

        <Grid item container sm={6} md={5} lg={4} spacing={4}>
          <Grid item sm={6} md={5} lg={5}>
            <Box>
              <Typography>Gender</Typography>
              <FormControl placeholder="Select gender" fullWidth>
                <Select
                  id="demo--select"
                  size="medium"
                  value={values.gender}
                  name="gender"
                  sx={{ backgroundColor: "white" }}
                  onChange={handleChange}
                  error={Boolean(touched.gender && errors.gender)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>Select gender</em>
                  </MenuItem>
                  {["Male", "Female"].map((item) => (
                    <MenuItem key={item} value={item?.toLowerCase()}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {touched.gender && errors.gender}
                </FormHelperText>
              </FormControl>
            </Box>
          </Grid>
          <Grid item sm={6} md={7} lg={7}>
            <Box>
              <Typography>Date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ bgcolor: "white" }}
                  value={value}
                  onChange={(newValue: any) => {
                    setValue(newValue);
                    setFieldValue("date", newValue.toString());
                  }}
                />
              </LocalizationProvider>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={4} mt={0.5}>
        <Grid item sm={6} md={7} lg={8}>
          <Box
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="start"
            alignItems="start"
          >
            <Typography>Home Address</Typography>
            <TextField
              variant="outlined"
              placeholder="Enter home address"
              value={values.homeAddress}
              onChange={handleChange}
              name="homeAddress"
              fullWidth
              InputProps={{
                style: { backgroundColor: "white" },
              }}
              error={Boolean(touched.homeAddress && errors.homeAddress)}
              helperText={touched.homeAddress && errors.homeAddress}
            />
          </Box>
        </Grid>

        <Grid item sm={6} md={5} lg={4}>
          <Box>
            <Typography>Mobile ID (required)</Typography>
            <TextField
              variant="outlined"
              placeholder="Enter mobile ID"
              value={values.mobileID}
              onChange={handleChange}
              name="mobileID"
              fullWidth
              InputProps={{
                style: { backgroundColor: "white" },
              }}
              error={Boolean(touched.mobileID && errors.mobileID)}
              helperText={touched.mobileID && errors.mobileID}
            />
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={4} mt={0.5}>
        <Grid item sm={6} md={7} lg={8}>
          <Box
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="start"
            alignItems="start"
          >
            <Typography>Shipping Address</Typography>
            <TextField
              variant="outlined"
              placeholder="Enter shipping address"
              value={values.shippingAddress}
              onChange={handleChange}
              name="shippingAddress"
              fullWidth
              InputProps={{
                style: { backgroundColor: "white" },
              }}
              error={Boolean(touched.shippingAddress && errors.shippingAddress)}
              helperText={touched.shippingAddress && errors.shippingAddress}
            />
          </Box>
        </Grid>

        <Grid item sm={6} md={5} lg={4}>
          <Box>
            <Typography>Phone Number</Typography>
            <TextField
              variant="outlined"
              placeholder="Enter phone number"
              value={values.phoneNumber}
              onChange={handleChange}
              name="phoneNumber"
              fullWidth
              InputProps={{
                style: { backgroundColor: "white" },
              }}
              error={Boolean(touched.phoneNumber && errors.phoneNumber)}
              helperText={touched.phoneNumber && errors.phoneNumber}
            />
          </Box>
        </Grid>
      </Grid>

      <Toolbar />

      <Box
        width={"100%"}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Button
          type="submit"
          variant="contained"
          sx={{ py: 1, px: 4 }}
          onClick={() => handleSubmit}
        >
          Add New Customer
        </Button>
      </Box>
    </Box>
  );
}
