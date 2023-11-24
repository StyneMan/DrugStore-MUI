/* eslint-disable @typescript-eslint/no-explicit-any */
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
import Close from "@mui/icons-material/Close";
import { RootState } from "../../../redux/store";
import { setCurrentCustomer } from "../../../redux/slices/customers";

interface CustomerDropdownProps {
  setAnchorEl: any;
}

export default function CustomerDropdown({
  setAnchorEl,
}: CustomerDropdownProps) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const currentCustomer = useSelector(
    (state: RootState) => state.customers.currentCustomer
  );
  const customers = useSelector(
    (state: RootState) => state.customers.customers
  );
  const [current, setCurrent] = React.useState<any>();
  // const [searchKey, setSearchKey] = React.useState<string | null>(null);
  const [filteredCustomer, setFilteredCustomers] = React.useState(customers);

  React.useEffect(() => {
    if (currentCustomer) {
      setCurrent({
        email: currentCustomer?.email,
        name: currentCustomer?.name,
      });
    }
  }, [currentCustomer]);

  const handleFilter = (e) => {
    const filtered = customers?.filter((item) =>
      item.name.toLowerCase().includes(`${e.target.value}`.toLowerCase())
    );
    setFilteredCustomers(filtered);
  };

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
          {"Customers"}
        </Typography>
        <IconButton onClick={() => setAnchorEl(null)}>
          <Close />
        </IconButton>
      </Box>
      <TextField
        onChange={handleFilter}
        fullWidth
        size="small"
        placeholder="Search Customers"
        InputProps={{
          style: { backgroundColor: "#ECF0F4B2" },
          disableUnderline: true,
          startAdornment: <Search sx={{ color: "gray" }} />,
        }}
      />

      <Box height={"40vh"} sx={{ overflowY: "scroll", overflowX: "hidden" }}>
        {filteredCustomer.map((item, index: number) => (
          <Box
            key={index}
            mt={2}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            fullWidth
            bgcolor={
              current?.email === item?.email && current.name === item?.name
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
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"start"}
              alignItems={"start"}
            >
              <Box
                width={"100%"}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography
                  fontSize={14}
                  textTransform={"capitalize"}
                  justifyContent={"start"}
                  color={"#000000"}
                >
                  {`${item?.name}`}
                </Typography>

                <Typography
                  fontSize={14}
                  textTransform={"capitalize"}
                  justifyContent={"start"}
                  color={"#000000"}
                >
                  {`${item?.contact_id}`}
                </Typography>
              </Box>
              <Box
                display={item?.mobile ? "flex" : "none"}
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
                  {item?.mobile}
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
    </Box>
  );
}
