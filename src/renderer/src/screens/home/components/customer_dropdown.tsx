import { CallOutlined, Search } from "@mui/icons-material";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCustomer } from "../../../redux/slices/purchase";

interface CustomerDropdownProps {
  setAnchorEl: any;
}

const tempCustomers: object[] = [
  { id: "C00101", name: "Stanley Nyekpeye", phone: "08093869330" },
  { id: "C00102", name: "OluwaSeyi Vibez", phone: "08093869331" },
  { id: "C00103", name: "Yemi Olutoye", phone: "08055481907" },
  { id: "C00104", name: "Sarah Adebayo", phone: "08093869332" },
];

export default function CustomerDropdown({
  setAnchorEl,
}: CustomerDropdownProps) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const currentCustomer = useSelector(
    (state) => state.purchase.currentCustomer
  );
  //   const filteredProducts = useSelector(
  //     (state) => state.search.filteredProducts
  //   );
  const [current, setCurrent] = React.useState();

  React.useEffect(() => {
    if (currentCustomer) {
      console.log("CURRENT CUSTOMER :: ", currentCustomer);
      setCurrent(currentCustomer.name.toLowerCase());
    }
  }, [currentCustomer]);

  return (
    <Box pb={2}>
      <Typography gutterBottom fontSize={20} fontWeight={700}>
        Customers
      </Typography>
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
              phone: "",
            })
          );
          setAnchorEl(null);
        }}
      >
        Walk-in customer
      </Typography>
      {tempCustomers.map((item: object, index: number) => (
        <Box
          key={index}
          mt={2}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          fullWidth
          bgcolor={
            current === item.name.toLowerCase()
              ? theme.palette.primary.light
              : "transparent"
          }
          component={Button}
          onClick={() => {
            dispatch(setCurrentCustomer(item));
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
              {item.name}
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
                {item.phone}
              </Typography>
            </Box>
          </Box>
          <Typography
            fontSize={14}
            textTransform={"capitalize"}
            justifyContent={"start"}
            color={"#000000"}
          >
            {item.id}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
