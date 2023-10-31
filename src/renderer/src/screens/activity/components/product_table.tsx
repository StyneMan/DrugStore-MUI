import { Box, Grid, Typography } from "@mui/material";
import tempProducts, { ProductModel } from "../../../data/products";
import SalesCard from "../../../components/cards/sales_card";
import ItemCard from "./item_card";

export default function ProductTable() {
  return (
    <Box width={"90%"}  >
      <Typography fontSize={22} fontWeight={900} color={"black"}>
        Items
      </Typography>
      {/* Item's header */}
      <Grid container spacing={1}>
        {/* Order No Column */}
        <Grid
          item
          md={5}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"start"}
          alignItems={"start"}
        >
          <Typography fontSize={13} fontWeight={300} textAlign={"center"}>
            Product
          </Typography>
        </Grid>

        {/* Total Amount Column */}
        <Grid
          item
          md={2}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"start"}
          alignItems={"start"}
        >
          <Typography fontSize={13} fontWeight={300} textAlign={"center"}>
            Qty
          </Typography>
        </Grid>

        {/* No of items Column */}
        <Grid
          item
          md={2}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"start"}
          alignItems={"start"}
        >
          <Typography fontSize={13} fontWeight={300} textAlign={"center"}>
            Unit Price
          </Typography>
        </Grid>

        {/* Mode of Payment Column */}
        <Grid
          item
          md={3}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"start"}
          alignItems={"start"}
        >
          <Typography fontSize={13} fontWeight={300} textAlign={"center"}>
            Total
          </Typography>
        </Grid>
      </Grid>
      {tempProducts?.map((item: ProductModel, index: number) => (
        <ItemCard key={index} data={item} />
      ))}
    </Box>
  );
}
