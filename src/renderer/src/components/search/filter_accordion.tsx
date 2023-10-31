import { Box } from "@mui/system";
import React from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Slider,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredProducts, setSorting } from "../../redux/slices/search";

interface Props {
  setAnchorEl: any;
}

const priceMarks = [
  {
    value: 0,
    label: "₦0",
  },
  {
    value: 5,
    label: "",
  },
  {
    value: 20,
    label: "₦20,000",
  },
  {
    value: 60,
    label: "₦100,000",
  },
  {
    value: 100,
    label: "₦200k",
  },
];

export default function CollapseSection({ setAnchorEl }: Props) {
  const dispatch = useDispatch();

  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);

  const [sortLowHigh, setSortLowHigh] = React.useState(false);
  const [sortHighLow, setSortHighLow] = React.useState(false);

  const [alphabetAZ, setAlphabetAZ] = React.useState(false);
  const [alphabetZA, setAlphabetZA] = React.useState(false);

  const [value, setValue] = React.useState<number[]>([0, 20]);

  const sorting = useSelector((state) => state.search.sorting);
  const categories = useSelector((state) => state.category.categories);
  const filteredProducts = useSelector(
    (state) => state.search.filteredProducts
  );
  const products = useSelector(
    (state) => state.product.products
  );

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);

    console.log("CURRENT VAL", newValue);
  };

  React.useEffect(() => {
    if (sorting?.name === "alphabet-sort") {
      if (sorting?.value === "a-z") {
        setAlphabetAZ(true);
        setAlphabetZA(false);
      } else {
        setAlphabetAZ(false);
        setAlphabetZA(true);
      }
    }
  }, []);

  function valuetext(value: number) {
    return `₦${value}`;
  }

  function valueLabelFormat(value: number) {
    return priceMarks.findIndex((mark) => mark.value === value) + 1;
  }

  const applyFilter = () => {
    setAnchorEl(null);
    console.log("CURRENT SORTING CRITERIAV ==>> ", sorting);
    console.log("FILTERED PRODUCTS ==>> ", filteredProducts);

    if (sorting?.name === "alphabet-sort") {
      if (sorting?.value === "a-z") {
        const sortedData = filteredProducts?.slice().sort((a, b) => {
          // Use localeCompare for case-insensitive sorting
          return a.name.localeCompare(b.name);
        });

        dispatch(setFilteredProducts(sortedData));
      } else {
        const sortedData = filteredProducts?.slice().sort((a, b) => {
          // Use localeCompare for case-insensitive sorting
          return b.name.localeCompare(a.name);
        });
        dispatch(setFilteredProducts(sortedData));
      }
    } else if (sorting?.name === "price-sort") {
      console.log("HERE ??>>> ");

      if (sorting?.value === "low-high") {
        const sortedData = filteredProducts?.slice().sort((a, b) => {
          // Use localeCompare for case-insensitive sorting
          return (
            parseInt(
              a.product_variations[0]?.variations[0]?.default_sell_price
            ) -
            parseInt(b.product_variations[0]?.variations[0]?.default_sell_price)
          );
        });
        console.log("SORTED HE ... ", sortedData);

        dispatch(setFilteredProducts(sortedData));
      } else {
        const sortedData = filteredProducts?.slice().sort((a, b) => {
          // Use localeCompare for case-insensitive sorting
          return (
            parseInt(
              b.product_variations[0]?.variations[0]?.default_sell_price
            ) -
            parseInt(a.product_variations[0]?.variations[0]?.default_sell_price)
          );
        });
        console.log("SORTED HL ... ", sortedData);
        dispatch(setFilteredProducts(sortedData));
      }
    } else if (sorting?.name === "category-sort") {
      console.log("HERE ??>>> ");

      const filteredData = filteredProducts
        ?.slice()
        .filter(
          (item: any) =>
            item?.category?.name.toLowerCase() === sorting?.value.toLowerCase()
        );
      console.log("SORTED HE ... ", filteredData);

      dispatch(setFilteredProducts(filteredData));
    }
  };

  return (
    <Box
      display="flex"
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"start"}
    >
      <Box
        display="flex"
        flexDirection={"row"}
        justifyContent={"start"}
        alignItems={"center"}
        mt={1}
      >
        <IconButton onClick={() => setOpen1(!open1)}>
          {open1 ? <ArrowDropUpIcon /> : <ArrowRightIcon />}
        </IconButton>
        <Typography fontSize={14} fontWeight={700} color={"black"} px={1}>
          Sort by:
        </Typography>
      </Box>
      {open1 && (
        <Box
          ml={6}
          bgcolor={"#ECF0F480"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          alignItems={"start"}
        >
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <Checkbox
              checked={sortLowHigh}
              onChange={(e, checked: boolean) => {
                setSortLowHigh(checked);
                setSortHighLow(!checked);

                dispatch(
                  setSorting({
                    name: "price-sort",
                    value: "low-high",
                  })
                );
              }}
              size="small"
            />
            <Typography px={1} fontWeight={200} fontSize={13}>
              Low High Price
            </Typography>
            <Box mx={4} />
          </Box>

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <Checkbox
              size="small"
              checked={sortHighLow}
              onChange={(e, checked: boolean) => {
                setSortHighLow(checked);
                setSortLowHigh(!checked);
                dispatch(
                  setSorting({
                    name: "price-sort",
                    value: "high-low",
                  })
                );
              }}
            />
            <Typography px={1} fontWeight={200} fontSize={13}>
              High Low Price
            </Typography>
            <Box mx={4} />
          </Box>
        </Box>
      )}
      {/* Accordion 2 */}
      <Box
        display="flex"
        flexDirection={"row"}
        justifyContent={"start"}
        alignItems={"center"}
        mt={1}
      >
        <IconButton onClick={() => setOpen2(!open2)}>
          {open2 ? <ArrowDropUpIcon /> : <ArrowRightIcon />}
        </IconButton>
        <Typography fontSize={14} fontWeight={700} color={"black"} px={1}>
          Alphabetical Order
        </Typography>
      </Box>
      {open2 && (
        <Box
          ml={6}
          bgcolor={"#ECF0F480"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          alignItems={"start"}
        >
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <Checkbox
              size="small"
              checked={alphabetAZ}
              onChange={(e, checked: boolean) => {
                setAlphabetAZ(checked);
                setAlphabetZA(!checked);
                dispatch(
                  setSorting({
                    name: "alphabet-sort",
                    value: "a-z",
                  })
                );
              }}
            />
            <Typography px={1} fontWeight={300} fontSize={13}>
              A - Z
            </Typography>
          </Box>

          <Box my={1} />

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <Checkbox
              size="small"
              checked={alphabetZA}
              onChange={(e, checked: boolean) => {
                setAlphabetZA(checked);
                setAlphabetAZ(!checked);
                dispatch(
                  setSorting({
                    name: "alphabet-sort",
                    value: "z-a",
                  })
                );
              }}
            />
            <Typography px={1} fontWeight={300} fontSize={13}>
              Z - A
            </Typography>
          </Box>
        </Box>
      )}

      {/* Accordion 3 */}
      <Box
        display="flex"
        flexDirection={"row"}
        justifyContent={"start"}
        alignItems={"center"}
        mt={1}
      >
        <IconButton onClick={() => setOpen5(!open5)}>
          {open5 ? <ArrowDropUpIcon /> : <ArrowRightIcon />}
        </IconButton>
        <Typography fontSize={14} fontWeight={700} color={"black"} px={1}>
          Category
        </Typography>
      </Box>
      {open5 && (
        <Box
          display={"flex"}
          mx={6}
          px={1}
          py={1}
          flexDirection={"column"}
          justifyContent={"space-between"}
          alignItems={"start"}
        >
          <FormControl fullWidth>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              {categories?.data?.map((item: any, index: number) => (
                <FormControlLabel
                  key={index}
                  value={item?.name}
                  control={<Radio />}
                  label={item?.name}
                  onChange={(e, checked) => {
                    // console.log("ChANGHS ---- ", e.target?.value);
                    console.log("ChANGHS ---- ", checked);
                    dispatch(
                      setSorting({
                        name: "category-sort",
                        value: `${e.target?.value}`,
                      })
                    );
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      )}

      {/* Price Slider */}

      <Box sx={{ width: "100%", my: 2 }}>
        <Slider
          // defaultValue={0}
          // getAriaValueText={valuetext}
          // //   valueLabelDisplay="auto"
          // marks={priceMarks}
          // aria-label="Always visible"
          // valueLabelDisplay="on"
          sx={{ flex: 1 }}
          // aria-label="Restricted values"
          aria-label="Always visible"
          value={value}
          onChange={handleChange}
          valueLabelFormat={valueLabelFormat}
          getAriaValueText={valuetext}
          step={5}
          valueLabelDisplay="off"
          marks={priceMarks}
          style={{ fontSize: 10 }}
        />
      </Box>
      <Button variant="contained" fullWidth sx={{ p: 1 }} onClick={applyFilter}>
        Apply Filter
      </Button>
    </Box>
  );
}