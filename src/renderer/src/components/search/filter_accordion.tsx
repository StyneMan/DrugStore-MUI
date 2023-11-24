/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
// import { getDatabase } from "../../../../main/database";
import { RootState } from "../../redux/store";

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
    value: 15,
    label: "₦20,000",
  },
  {
    value: 50,
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
  const [open3, setOpen3] = React.useState(false);

  // const [categories, setCategories] = React.useState<any[]>([]);
  const [startVal, setStartVal] = React.useState<number>(0);
  const [endVal, setEndVal] = React.useState<number>(30000);

  const [sortLowHigh, setSortLowHigh] = React.useState(false);
  const [sortHighLow, setSortHighLow] = React.useState(false);

  const [alphabetAZ, setAlphabetAZ] = React.useState(false);
  const [alphabetZA, setAlphabetZA] = React.useState(false);

  const [value, setValue] = React.useState<number[]>([0, 20]);

  const sorting: any = useSelector((state: RootState) => state.search.sorting);
  const categories = useSelector((state: RootState) => state.category.categories);
  const filteredProducts = useSelector(
    (state: RootState) => state.search.filteredProducts
  );
  const products = useSelector((state: RootState) => state.product.products);


  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);

    console.log("CURRENT VAL", newValue);
    const start = rangeConverter(newValue[0]);
    const end = rangeConverter(newValue[1]);
    console.log("START CONVERTED >>> ", start);
    console.log("END CONVERTED >>> ", end);

   if (start && end) {
    setStartVal(start);
    setEndVal(end);
   }

    dispatch(
      setSorting({
        name: "price-range",
        value: "slide",
      })
    );
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

  function rangeConverter(num: number) {
    if (num === 0) {
      return 0;
    } else if (num === 5) {
      return 7500;
    } else if (num === 10) {
      return 15000;
    } else if (num === 15) {
      return 20000;
    } else if (num === 20) {
      return 30000;
    } else if (num === 25) {
      return 40000;
    } else if (num === 30) {
      return 50000;
    } else if (num === 35) {
      return 60000;
    } else if (num === 40) {
      return 75000;
    } else if (num === 45) {
      return 90000;
    } else if (num === 50) {
      return 100000;
    } else if (num === 55) {
      return 110000;
    } else if (num === 60) {
      return 120000;
    } else if (num === 65) {
      return 130000;
    } else if (num === 70) {
      return 140000;
    } else if (num === 75) {
      return 150000;
    } else if (num === 80) {
      return 160000;
    } else if (num === 85) {
      return 170000;
    } else if (num === 90) {
      return 180000;
    } else if (num === 95) {
      return 190000;
    } else if (num === 100) {
      return 200000;
    }
  }

  const applyFilter = () => {
    setAnchorEl(null);
    console.log("CURRENT SORTING CRITERIAV ==>> ", sorting);
    console.log("FILTERED PRODUCTS ==>> ", filteredProducts);

    if (sorting?.name === "alphabet-sort") {
      if (sorting?.value === "a-z") {
        const sortedData = products?.slice().sort((a, b) => {
          console.log("DATA INSPECT : ", a);

          // Use localeCompare for case-insensitive sorting
          return a?.name?.localeCompare(b?.name);
        });

        // console.log("SORTED PRODUCTS ==>> ", sortedData);

        dispatch(setFilteredProducts(sortedData));
      } else {
        const sortedData = products?.slice().sort((a, b) => {
          // Use localeCompare for case-insensitive sorting
          return b?.name?.localeCompare(a?.name);
        });
        // console.log("SORTED PRODUCTS ==>> ", sortedData);
        dispatch(setFilteredProducts(sortedData));
      }
    } else if (sorting?.name === "price-sort") {
      if (sorting?.value === "low-high") {
        const sortedData = products?.slice().sort((a, b) => {
          // Use localeCompare for case-insensitive sorting
          console.log(
            "A VALUS ",
            a?.product_variations[0]?.variations[0]?.default_sell_price
          );
          console.log(
            "B VALUE ",
            b?.product_variations[0]?.variations[0]?.default_sell_price
          );

          const aVal =
            `${a?.product_variations[0]?.variations[0]?.default_sell_price}` ||
            "0.0";
          const bVal =
            `${b?.product_variations[0]?.variations[0]?.default_sell_price}` ||
            "0.0";

          return parseFloat(aVal) - parseFloat(bVal);
        });
        // console.log("SORTED HE ... ", sortedData);

        dispatch(setFilteredProducts(sortedData));
      } else {
        const sortedData = products?.sort((a, b) => {
          // Use localeCompare for case-insensitive sorting
          return (
            parseInt(
              b?.product_variations[0]?.variations[0]?.default_sell_price
            ) -
            parseInt(
              a?.product_variations[0]?.variations[0]?.default_sell_price
            )
          );
        });
        // console.log("SORTED HL ... ", sortedData);
        dispatch(setFilteredProducts(sortedData));
      }
    } else if (sorting?.name === "category-sort") {
      console.log("HERE ??>>> ");

      const filteredData = products?.filter(
        (item: any) =>
          item?.category?.name.toLowerCase() === sorting?.value.toLowerCase()
      );

      dispatch(setFilteredProducts(filteredData));
    } else {
      // Range slider of price filter
      const filteredData = products?.filter(
        (item: any) =>
          parseInt(
            item?.product_variations[0]?.variations[0]?.default_sell_price
          ) >= startVal &&
          parseInt(
            item?.product_variations[0]?.variations[0]?.default_sell_price
          ) <= endVal
      );

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
        <IconButton onClick={() => setOpen3(!open3)}>
          {open3 ? <ArrowDropUpIcon /> : <ArrowRightIcon />}
        </IconButton>
        <Typography fontSize={14} fontWeight={700} color={"black"} px={1}>
          Category
        </Typography>
      </Box>
      {open3 && (
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
              {categories?.map((item: any, index: number) => (
                <FormControlLabel
                  key={index}
                  value={item?.name}
                  control={<Radio />}
                  label={item?.name}
                  onChange={(_e, _checked: boolean) => {
                    // console.log("ChANGHS ---- ", item?.name);
                    dispatch(
                      setSorting({
                        name: "category-sort",
                        value: `${item?.name}`,
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
