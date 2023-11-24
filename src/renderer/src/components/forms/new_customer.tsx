/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useDispatch, useSelector } from "react-redux";
import APIService from "../../service/api_service";
import { getDatabase } from "../../../../main/database";
import { setLoading } from "../../redux/slices/loader";
import toast from "react-hot-toast";
import { RootState } from "../../redux/store";
import { statesCities } from "../../utils/states";

type CustomerProps = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  gender: string;
  state: string;
  city: string;
  homeAddress: string;
  date: string;
  shippingAddress: string;
  mobileID: string;
  phoneNumber: string | null;
};

export default function NewCustomerForm() {
  const [value, setValue] = React.useState();
  const [cities, setCities] = React.useState<string[]>([]);
  const dispatch = useDispatch();
  const isOnline = useSelector((state: RootState) => state.loader.isOnline);
  const dbasePath = useSelector((state: RootState) => state.database.dbasePath);

  const customerSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().nullable(),
    emailAddress: Yup.string().email("Invalid email address").nullable(),
    mobileID: Yup.string()
      .max(11, "Maximum allowed is 11 digits")
      .required("Phone number is required"),
    phoneNumber: Yup.string()
      .max(11, "Maximum allowed is 11 digits")
      .nullable(),
    date: Yup.string().nullable(),
    homeAddress: Yup.string().nullable(),
    shippingAddress: Yup.string().nullable(),
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
    state: "",
    city: "",
  };

  function formatDateToYMD(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const formik = useFormik({
    initialValues,
    validationSchema: customerSchema,
    onSubmit: async (values) => {
      dispatch(setLoading(true));
      console.log(values.emailAddress);

      const payload = {
        id: new Date().getTime(),
        email: values.emailAddress,
        type: "customer",
        first_name: values.firstName,
        last_name: values.lastName,
        dob: formatDateToYMD(new Date(values.date)),
        mobile: values.mobileID,
        alternate_number: values.phoneNumber,
        address_line_1: values.homeAddress,
        shipping_address: values.shippingAddress,
        state: values.state,
        city: values.city,
        country: "nigeria",
      };

      try {
        if (isOnline) {
          //  Save Online here
          const data = await APIService.addNewCustomer(payload);
          console.log("NEW CUSTOMER RESPONSE ", data);
        }

        const db = await getDatabase(`${dbasePath}`);
        db?.users.insert(payload);

        console.log(payload);
        dispatch(setLoading(false));
        toast.success("New customer added successfully.");
      } catch (error) {
        // console.log(error);
        dispatch(setLoading(false));
        // toast.error(`${error?.response?.data?.message}`);
      }
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

      <Grid container spacing={2} mt={0.5}>
        <Grid item sm={4} md={4} lg={3}>
          <Box
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

        <Grid item sm={4} md={4} lg={3}>
          <Box>
            <Typography>State</Typography>
            <FormControl placeholder="Select state" fullWidth>
              <Select
                id="demo--select"
                size="medium"
                value={values.state}
                name="state"
                sx={{ backgroundColor: "white" }}
                onChange={(e) => {
                  handleChange(e);
                  const filtered = statesCities.filter(
                    (item) => item?.name.toLowerCase() === e.target.value
                  );
                  setCities(filtered[0].cities);
                }}
                error={Boolean(touched.state && errors.state)}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  <em>Select state</em>
                </MenuItem>
                {statesCities.map((item) => (
                  <MenuItem key={item.name} value={item?.name?.toLowerCase()}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{touched.state && errors.state}</FormHelperText>
            </FormControl>
          </Box>
        </Grid>

        <Grid item sm={4} md={4} lg={3}>
          <Box>
            <Typography>City</Typography>
            <FormControl placeholder="Select city" fullWidth>
              <Select
                id="demo--select"
                size="medium"
                value={values.city}
                name="city"
                sx={{ backgroundColor: "white" }}
                onChange={handleChange}
                error={Boolean(touched.city && errors.city)}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  <em>Select city</em>
                </MenuItem>
                {cities?.map((item) => (
                  <MenuItem key={item} value={item?.toLowerCase()}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{touched.city && errors.city}</FormHelperText>
            </FormControl>
          </Box>
        </Grid>

        <Grid item sm={4} md={4} lg={3}>
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
            <Typography>Mobile (required)</Typography>
            <TextField
              variant="outlined"
              placeholder="Enter mobile number"
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
            <Typography>Alt Phone Number</Typography>
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
          onClick={() => handleSubmit()}
        >
          Add New Customer
        </Button>
      </Box>
    </Box>
  );
}
