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
// import APIService from "../../service/api_service";

type OpenRegProp = {
  setOpen: any;
};

const OpenRegisterForm = ({ setOpen }: OpenRegProp) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoaded, setLoaded] = React.useState(false);
  const [dbPath, setDBPath] = React.useState<string | undefined>();
  const [bizLocations, setBizLocations] = React.useState<any[] | undefined>([]);
  const [selectedLocation, setSelectedLocation] = React.useState<any>();
  const isOnline = useSelector((state: any) => state.loader.isOnline);

  const cashRegisterSchema = Yup.object().shape({
    amount: Yup.string().required("Cash in hand is required!"),
    location: Yup.string().required("Select a business location!"),
  });

  const getDbPath = async () => {
    const response = await window.electron.ping();

    setDBPath(response);
    setLoaded(true);
    console.log("DB PATH OPEN_REGISTER.TSX <<< ===>>> ", response);
  };

  React.useEffect(() => {
    getDbPath();
  }, []);

  React.useEffect(() => {
    const getNow = async () => {
      // const content = await window.electron.dbContent();
      // console.log("DB CONTENT NOW ===>>> ", content);
      const db = await getDatabase(`${localStorage.getItem("dbPath")}`);
      const existingData = await db?.business_locations.find().exec();
      //  existingData;
      console.log("Db BIZ LOCATE ===>>> ", existingData);
      //
      setBizLocations(existingData);
    };

    getNow();
  });

  // console.log("DB PATH L STOTAGE :: ", localStorage.getItem("dbPath"));

  function padTo2Digits(num: number) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date: any) {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join("-") +
      " " +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(":")
    );
  }

  const createRegisterOnline = async (payload: any) => {
    dispatch(setLoading(true));
    try {
      const resp = await APIService.createCashRegister(payload);
      console.log("RESOPNS SERVER :: ", resp);
      // dispatch(setLoading(false));
    } catch (error) {
      console.log("CASH REG ONLINE ERROR ", error);
      dispatch(setLoading(false));
    }
  };

  const createRegisterOffline = async (payload: any) => {
    dispatch(setLoading(true));
    try {
      const db = await getDatabase(`${dbPath}`);
      await db?.cash_registers.insert(payload);

      console.log(payload);
      dispatch(setLoading(false));
      toast.success("Cash register created successfully!");
    } catch (error: any) {
      console.log("REG OFFLINE ERROR ", error);

      dispatch(setLoading(false));
      toast.error(`${error?.message || "Failed to create cash register!"}`);
    }
  };

  const formik = useFormik({
    initialValues: {
      amount: "",
      location: "",
    },
    validationSchema: cashRegisterSchema,
    onSubmit: async (values) => {
      console.log("AMOUNT", values.amount);

      const payload = {
        id: new Date().getTime(),
        location_id: selectedLocation?.id,
        initial_amount: parseFloat(values.amount),
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
                const filtered = bizLocations?.filter(
                  (item) => item.name === e.target.value
                );
                if (filtered) {
                  console.log("NOW IS ", filtered[0]?._data);
                  setSelectedLocation(filtered[0]?._data);
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
              {bizLocations?.map((item: any, index: number) => (
                <MenuItem key={index} value={item?.name}>
                  {item?.name}
                </MenuItem>
              ))}
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
