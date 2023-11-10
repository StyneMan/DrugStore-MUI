import { CallOutlined, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCustomer } from "../../../redux/slices/purchase";
import { getDatabase } from "../../../../../main/database";
import Close from "@mui/icons-material/Close";

interface CustomerDropdownProps {
  setAnchorEl: any;
}


export default function CustomerDropdown({
  setAnchorEl,
}: CustomerDropdownProps) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const currentCustomer = useSelector(
    (state) => state.purchase.currentCustomer
  );
  const [current, setCurrent] = React.useState();
  const [customers, setCustomers] = React.useState<any[]>([]);

  const dbasePath = useSelector((state) => state.database.dbasePath);

  async function getCustomers() {
    try {
      const db = await getDatabase(dbasePath);

      db.users.find().$.subscribe(async function (elems) {
        if (!elems) {
          // heroesList.innerHTML = 'Loading..';
          console.log("EMPTY DATABASE ::: ");
          return;
        }

        console.log("p hj ::: ", elems);

        setCustomers(elems);
      });
    } catch (error) {
      console.log("CATCH ERROR ::: ", error);
    }
  }

  React.useEffect(() => {
    getCustomers();
  }, []);

  React.useEffect(() => {
    if (currentCustomer) {
      console.log("CURRENT CUSTOMER :: ", currentCustomer);
      setCurrent(currentCustomer?.email);
    }
  }, [currentCustomer]);

  return (
    <Box pb={2}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        pb={2}
      >
        <Typography fontSize={20} fontWeight={700}>
          Customers
        </Typography>
        <IconButton onClick={() => setAnchorEl(null)}>
          <Close />
        </IconButton>
      </Box>
      <TextField
        onChange={(e) => {}}
        fullWidth
        size="small"
        placeholder="Search Customers"
        InputProps={{
          style: { backgroundColor: "#ECF0F4B2" },
          disableUnderline: true,
          startAdornment: <Search sx={{ color: "gray" }} />,
        }}
      />
      <Typography
        component={Button}
        mt={2}
        fullWidth
        bgcolor={
          current === "Walk-in customer".toLowerCase() ? "grey" : "transparent"
        }
        textTransform={"capitalize"}
        justifyContent={"start"}
        color={"black"}
        onClick={() => {
          dispatch(
            setCurrentCustomer({
              id: `Walk-in-${new Date().getTime()}`,
              name: "Walk-in customer",
              email: "walk-in customer",
              phone: "",
            })
          );
          setAnchorEl(null);
        }}
      >
        Walk-in customer
      </Typography>
      {customers.map((item: any, index: number) => (
        <Box
          key={index}
          mt={2}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          fullWidth
          bgcolor={
            current === item?._data?.email
              ? theme.palette.primary.light
              : "transparent"
          }
          component={Button}
          onClick={() => {
            dispatch(setCurrentCustomer(item?._data));
            setAnchorEl(null);
          }}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"start"}
            alignItems={"start"}
          >
            <Typography
              fontSize={14}
              textTransform={"capitalize"}
              justifyContent={"start"}
              color={"#000000"}
            >
              {`${item?._data?.first_name} ${item?._data?.last_name}` }
            </Typography>
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"start"}
              alignItems={"center"}
            >
              <CallOutlined fontSize="small" />
              <Typography
                px={1}
                fontSize={14}
                textTransform={"capitalize"}
                justifyContent={"start"}
                color={"#000000"}
              >
                {item?._data?.contact_number}
              </Typography>
            </Box>
          </Box>
          <Typography
            fontSize={14}
            textTransform={"capitalize"}
            justifyContent={"start"}
            color={"#000000"}
          >
            {item?._data?.id}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
