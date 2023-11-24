import { Box, TextField, Typography, Button, IconButton } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import CustomDialog from "../dialog";
import OpenRegisterForm from "./open_register";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slices/loader";
import APIService from "../../service/api_service";
import toast from "react-hot-toast";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { RootState } from "../../redux/store";

const ClockInForm = () => {
  const [show, setShow] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const dispatch = useDispatch();

  const isOnline = useSelector((state: RootState) => state.loader.isOnline);

  const loginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required!"),
    password: Yup.string()
      .min(8, "Password too short. Min is 8 chars!")
      .required("Password is required!"),
  });

  const loginFromAPI = (values) => {
    const payload = {
      grant_type: "password",
      client_id: 3,
      client_secret: "ih1OrYT8pHRDBuT0pFytbCp9tY9DSKXSc75HgAdn",
      username: values.username,
      password: values.password,
      scope: "",
    };

    APIService.clockIn(payload)
      .then(async (resp) => {

        // console.log("RES ==>> ", resp);
        localStorage.setItem("accessToken", resp?.access_token);
        localStorage.setItem("refreshToken", resp?.refresh_token);
        localStorage.setItem("username", values.username);
        localStorage.setItem("pass", values.password);

        window.electron.sendAuthToMain(
          JSON.stringify({
            accessToken: resp?.access_token,
            refreshToken: resp?.refresh_token,
            username: values.username,
            password: values.password,
          })
        );

        dispatch(setLoading(false));
        setOpenDialog(true);
       
      })
      .catch((error) => {
        dispatch(setLoading(false));
        toast.error(
          `${
            error?.response?.data?.message ||
            error?.message ||
            "Check your internet connection"
          }`
        );
        console.error("ERR ==>> ", error);
      });
  };

  const loginFromDB = async (username: string, password: string) => {
    dispatch(setLoading(true));

    const authData = await window.electron.auth();
    const parsedAuth = JSON.parse(authData);

    const usrname = localStorage.getItem("username") ?? parsedAuth?.username;
    const pass = localStorage.getItem("pass") ?? parsedAuth?.password;
    if (usrname === username && pass === password) {
      window.electron.sendAuthToMain(
        JSON.stringify({
          accessToken: null,
          refreshToken: null,
          username: values.username,
          password: values.password,
        })
      );

      setTimeout(() => {
        localStorage.setItem("username", values.username);
        localStorage.setItem("pass", values.password);
        dispatch(setLoading(false));
        setOpenDialog(true);
      }, 5000);
    } else {
      toast.error("Incorrect login credentials");
      dispatch(setLoading(false));
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(setLoading(true));

      if (isOnline) {
        loginFromAPI(values);
      } else {
        loginFromDB(values.username, values.password);
      }
    },
  });

  const { errors, values, handleChange, handleSubmit, touched } = formik;

  const renderDialog = (
    <Box
      p={4}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
    >
      <Typography fontWeight={800} fontSize={26} gutterBottom>
        Open Register
      </Typography>
      <br />
      <OpenRegisterForm setOpen={setOpenDialog} />
    </Box>
  );

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      alignItems={"center"}
      width={"60%"}
      height={"60%"}
    >
      <CustomDialog
        open={openDialog}
        setOpen={setOpenDialog}
        content={renderDialog}
      />
      <Box alignItems={"center"}>
        <Typography fontSize={36} fontWeight={800}>
          Welcome Back 👋🏽
        </Typography>
        <Typography fontSize={24} fontWeight={400} textAlign={"center"}>
          Please clock In
        </Typography>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"start"}
        alignItems={"stretch"}
        width={"100%"}
      >
        <Box>
          <Typography gutterBottom>Username</Typography>
          <TextField
            placeholder="Enter your username"
            variant="filled"
            value={values.username}
            onChange={handleChange}
            error={Boolean(touched.username && errors.username)}
            name="username"
            fullWidth
            helperText={touched.username && errors.username}
          />
        </Box>
        <br />
        <Box>
          <Typography gutterBottom>Password</Typography>
          <TextField
            variant="filled"
            placeholder="Enter your password"
            value={values.password}
            type={show ? "text" : "password"}
            onChange={handleChange}
            error={Boolean(touched.password && errors.password)}
            name="password"
            fullWidth
            helperText={touched.password && errors.password}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShow(!show)}>
                  {show ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />
        </Box>
      </Box>
      <br />
      <Button
        onClick={() => handleSubmit()}
        variant="contained"
        fullWidth
        sx={{ padding: 2, textTransform: "capitalize" }}
      >
        start shift
      </Button>
    </Box>
  );
};

export default ClockInForm;
