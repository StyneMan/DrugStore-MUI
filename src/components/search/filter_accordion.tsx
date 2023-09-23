import { Box } from "@mui/system";
import React from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {
    Button,
  Checkbox,
  IconButton,
  Slider,
  Typography,
  useTheme,
} from "@mui/material";

export default function CollapseSection() {
//   const theme = useTheme();
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);

  const priceMarks = [
    {
      value: 0,
      label: "₦0",
    },
    {
      value: 20000,
      label: "₦20,000",
    },
    {
      value: 100000,
      label: "₦100,000",
    },
    {
      value: 200000,
      label: "₦200,000",
    },
  ];

  function valuetext(value: number) {
    return `₦${value}`;
  }

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
            <Checkbox size="small" />
            <Typography px={1} fontWeight={200} fontSize={13}>
              Low High Price
            </Typography>
            <Box mx={4} />
            <Checkbox size="small" />
            <Typography px={1} fontWeight={300} fontSize={13}>
              A - Z
            </Typography>
          </Box>

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <Checkbox size="small" />
            <Typography px={1} fontWeight={200} fontSize={13}>
              High Low Price
            </Typography>
            <Box mx={4} />
            <Checkbox size="small" />
            <Typography px={1} fontWeight={300} fontSize={13}>
              Z - A
            </Typography>
          </Box>

          <Box my={1} />

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <Checkbox size="small" />
            <Typography px={1} fontWeight={200} fontSize={13}>
              High Low Price
            </Typography>
            <Box mx={4} />
            <Checkbox size="small" />
            <Typography px={1} fontWeight={300} fontSize={13}>
              Z - A
            </Typography>
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
          Categories
        </Typography>
      </Box>
      {open2 && (
        <Box
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
            <Checkbox size="small" />
            <Typography px={1} fontWeight={200} fontSize={13}>
              Low High Price
            </Typography>
            <Box mx={4} />
            <Checkbox size="small" />
            <Typography px={1} fontWeight={300} fontSize={13}>
              A - Z
            </Typography>
          </Box>

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <Checkbox size="small" />
            <Typography px={1} fontWeight={200} fontSize={13}>
              High Low Price
            </Typography>
            <Box mx={4} />
            <Checkbox size="small" />
            <Typography px={1} fontWeight={300} fontSize={13}>
              Z - A
            </Typography>
          </Box>

          <Box my={1} />

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <Checkbox size="small" />
            <Typography px={1} fontWeight={200} fontSize={13}>
              High Low Price
            </Typography>
            <Box mx={4} />
            <Checkbox size="small" />
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
          Drug Type
        </Typography>
      </Box>
      {open3 && (
        <Box
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
            <Checkbox size="small" />
            <Typography px={1} fontWeight={200} fontSize={13}>
              Low High Price
            </Typography>
            <Box mx={4} />
            <Checkbox size="small" />
            <Typography px={1} fontWeight={300} fontSize={13}>
              A - Z
            </Typography>
          </Box>

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <Checkbox size="small" />
            <Typography px={1} fontWeight={200} fontSize={13}>
              High Low Price
            </Typography>
            <Box mx={4} />
            <Checkbox size="small" />
            <Typography px={1} fontWeight={300} fontSize={13}>
              Z - A
            </Typography>
          </Box>

          <Box my={1} />

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <Checkbox size="small" />
            <Typography px={1} fontWeight={200} fontSize={13}>
              High Low Price
            </Typography>
            <Box mx={4} />
            <Checkbox size="small" />
            <Typography px={1} fontWeight={300} fontSize={13}>
              Z - A
            </Typography>
          </Box>
        </Box>
      )}

      {/* Accordion 4 */}
      <Box
        display="flex"
        flexDirection={"row"}
        justifyContent={"start"}
        alignItems={"center"}
        mt={1}
      >
        <IconButton onClick={() => setOpen4(!open4)}>
          {open4 ? <ArrowDropUpIcon /> : <ArrowRightIcon />}
        </IconButton>
        <Typography fontSize={14} fontWeight={700} color={"black"} px={1}>
          Supplier
        </Typography>
      </Box>
      {open4 && (
        <Box
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
            <Checkbox size="small" />
            <Typography px={1} fontWeight={200} fontSize={13}>
              Low High Price
            </Typography>
            <Box mx={4} />
            <Checkbox size="small" />
            <Typography px={1} fontWeight={300} fontSize={13}>
              A - Z
            </Typography>
          </Box>

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <Checkbox size="small" />
            <Typography px={1} fontWeight={200} fontSize={13}>
              High Low Price
            </Typography>
            <Box mx={4} />
            <Checkbox size="small" />
            <Typography px={1} fontWeight={300} fontSize={13}>
              Z - A
            </Typography>
          </Box>
        </Box>
      )}

      {/* Accordion 5 */}
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
          Pharmacy
        </Typography>
      </Box>
      {open5 && (
        <Box
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
            <Checkbox size="small" />
            <Typography px={1} fontWeight={200} fontSize={13}>
              Low High Price
            </Typography>
            <Box mx={4} />
            <Checkbox size="small" />
            <Typography px={1} fontWeight={300} fontSize={13}>
              A - Z
            </Typography>
          </Box>

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <Checkbox size="small" />
            <Typography px={1} fontWeight={200} fontSize={13}>
              High Low Price
            </Typography>
            <Box mx={4} />
            <Checkbox size="small" />
            <Typography px={1} fontWeight={300} fontSize={13}>
              Z - A
            </Typography>
          </Box>
        </Box>
      )}

      {/* Price Slider */}

      <Box sx={{ width: '100%', my: 2 }}>
        <Slider
          defaultValue={0}
          getAriaValueText={valuetext}          
        //   valueLabelDisplay="auto"
          marks={priceMarks}
          aria-label="Always visible"
          valueLabelDisplay="on"
        />
      </Box>
      <Button variant="contained" fullWidth sx={{p: 1,}}  >
        Apply Filter
      </Button>
    </Box>
  );
}
