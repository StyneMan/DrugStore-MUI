/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Typography,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import Box from "@mui/system/Box";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slices/loader";
import { getDatabase } from "../../../../main/database";
import APIService from "../../service/api_service";
import toast from "react-hot-toast";
import { RootState } from "../../redux/store";
import formatDate from "../../utils/dateFormatter";

type OpenRegProp = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const OpenRegisterForm = ({ setOpen }: OpenRegProp) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedLocation, setSelectedLocation] = React.useState<any>();
  const isOnline = useSelector((state: RootState) => state.loader.isOnline);
  const businessLocations = useSelector((state: RootState) => state.business_locations.businessLocations);

  // console.log("BIx LOCS :: ", businessLocations);
  

  const cashRegisterSchema = Yup.object().shape({
    amount: Yup.string().required("Cash in hand is required!"),
    location: Yup.string().required("Select a business location!"),
  });

  const createRegisterOnline = async (payload: unknown) => {
    dispatch(setLoading(true));
    try {
      const resp = await APIService.createCashRegister(payload);
      localStorage.setItem("userId", resp?.data?.user_id);
      localStorage.setItem("businessId", resp?.data?.business_id);
    } catch (error) {
      console.log("CASH REG ONLINE ERROR ", error);
      dispatch(setLoading(false));
    }
  };

  const createRegisterOffline = async (payload: unknown) => {
    dispatch(setLoading(true));
    try {

      const db = await getDatabase(`${localStorage.getItem('dbPath')}`);
      await db?.cash_registers.insert(payload);

      console.log(payload);
      dispatch(setLoading(false));
      toast.success("Cash register created successfully!");
    } catch (error) {
      console.log("REG OFFLINE ERROR ", error);

      dispatch(setLoading(false));
      toast.error(`${"Failed to create cash register!"}`);
    }
  };

  const formik = useFormik({
    initialValues: {
      amount: "",
      location: "",
    },
    validationSchema: cashRegisterSchema,
    onSubmit: async (values) => {

      const payload = {
        id: new Date().getTime(),
        location_id: selectedLocation?.id,
        initial_amount: parseInt(
          values.amount.toString().replace("₦", "").replace(",", "")
        ),
        status: "open",
        created_at: formatDate(new Date()),
      };

      
      if (isOnline) {
        await createRegisterOnline(payload);
      }

      await createRegisterOffline(payload);

      setOpen(false);

      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    },
  });

  const { errors, values, handleChange, handleSubmit, touched } = formik;

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      alignItems={"center"}
      width={360}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"start"}
        alignItems={"stretch"}
        width={"100%"}
      >
        <Box>
          <Typography gutterBottom>Cash in Hand</Typography>
          <NumericFormat
            placeholder="Enter Amount"
            variant="filled"
            prefix="₦"
            thousandSeparator
            value={values.amount}
            onChange={handleChange}
            customInput={TextField}
            error={Boolean(touched.amount && errors.amount)}
            name="amount"
            fullWidth
            helperText={touched.amount && errors.amount}
          />
        </Box>

        <Box my={2}>
          <Typography gutterBottom>Business Location</Typography>
          <FormControl
            fullWidth
            error={Boolean(touched.location && errors.location)}
          >
            <Select
              fullWidth
              variant="filled"
              name="location"
              displayEmpty
              value={values.location}
              onChange={(e) => {
                handleChange(e);
               
                const filtered = businessLocations?.filter(
                  (item) => item.name === e.target.value
                );

                if (filtered) {
                  setSelectedLocation(filtered[0]);
                  localStorage.setItem('locationId', filtered[0]?.location_id)
                  localStorage.setItem('location_id', filtered[0]?.id)
                }
              }}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <span style={{ color: "gray" }}>Select Location</span>;
                }

                return selected;
              }}
            >
              <MenuItem disabled value="">
                <em>Select Location</em>
              </MenuItem>
              {Array.isArray(businessLocations) ? businessLocations?.map((item, index: number) => (
                <MenuItem key={index} value={item?.name}>
                  {item?.name}
                </MenuItem>
              )) : <></>}
            </Select>
            <FormHelperText>
              {touched.location && errors.location}
            </FormHelperText>
          </FormControl>
        </Box>
      </Box>
      <br />
      <br />
      <Button
        onClick={() => handleSubmit()}
        variant="contained"
        fullWidth
        sx={{ padding: 2, textTransform: "capitalize" }}
      >
        Open Register
      </Button>
      <br />
    </Box>
  );
};

export default OpenRegisterForm;
