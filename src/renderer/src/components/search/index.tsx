import { Card, IconButton, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import React from "react";
import Popper from "@mui/material/Popper";
import SearchIcon from "@mui/icons-material/Search";
import filterImg from "../../assets/images/tune.svg";
import Close from "@mui/icons-material/Close";
import CollapseSection from "./filter_accordion";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredProducts, setSearchKey } from "../../redux/slices/search";
import { RootState } from "../../redux/store";

const Searchbar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const searchKey = useSelector((state: RootState) => state.search.searchKey);
  const products = useSelector((state: RootState) => state.product.products);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(setSearchKey(value));
  };

  const searchClick = () => {
    if (searchKey) {
      // console.log("JH ", products);

      const filtered = products?.filter((item) =>
        item?.name?.toLowerCase().includes(searchKey.toLowerCase())
      );
      dispatch(setFilteredProducts(filtered));
    } else {
      dispatch(setFilteredProducts(products));
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <Box
      px={1}
      display="flex"
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box
        flex={1}
        display="flex"
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"stretch"}
        bgcolor={"white"}
        borderRadius={4}
      >
        <TextField
          placeholder="Search for drugs"
          onChange={handleChange}
          InputProps={{
            disableUnderline: true,
            style: {
              borderRadius: 16,
              backgroundColor: "white",
              justifyContent: "center",
              paddingBottom: 8,
            },
          }}
          variant="filled"
          fullWidth
          sx={{ borderRadius: 10, flex: 1 }}
        />
        <Button
          variant="contained"
          onClick={searchClick}
          sx={{ borderTopRightRadius: 10, borderBottomRightRadius: 10 }}
        >
          <SearchIcon />
        </Button>
      </Box>
      <Box mx={2} />

      <Button
        sx={{ bgcolor: "white", borderRadius: 4, padding: 2 }}
        onClick={handleClick}
      >
        <img src={filterImg} alt="" />
      </Button>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        sx={{ zIndex: 500 }}
      >
        <Box
          bgcolor={"white"}
          zIndex={2000}
          mt={4}
          width={"34vw"}
          minWidth={256}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"start"}
          alignItems={"stretch"}
        >
          <Card elevation={100} sx={{ p: 2 }}>
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"end"}
              alignItems={"center"}
            >
              <IconButton onClick={handleClick}>
                <Close />
              </IconButton>
            </Box>
            <Box px={2} pb={4}>
              <Typography fontSize={21} fontWeight={700} pb={1}>
                Filters
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Search Filter"
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: "gray" }} />,
                  style: { backgroundColor: "#ECF0F4" },
                }}
              />
              <CollapseSection setAnchorEl={setAnchorEl} />
            </Box>
          </Card>
        </Box>
      </Popper>
    </Box>
  );
};

export default Searchbar;
