/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, List, Typography } from "@mui/material";
import ProductCard from "../../../components/cards/product_card";
import { useSelector } from "react-redux";
import GridProductItem from "../../../components/cards/product_grid_item";
import { RootState } from "../../../redux/store";
import ProductShimmer from "../../../components/shimmers/product_shimmer";
import ProductListShimmer from "../../../components/shimmers/product_list_shimmer";

export interface Props {
  product: any;
}

export default function ProductTab() {
  //
  const filteredProducts = useSelector(
    (state: RootState) => state.search.filteredProducts
  );

  console.log("PRODICTS: ", filteredProducts);

  return (
    <Grid
      container
      spacing={2}
      display="flex"
      flexDirection={"row"}
      justifyContent={"start"}
      alignItems={"stretch"}
    >
      {!filteredProducts
        ? [1, 2, 3, 4, 5, 6].map((item: number) => (
            <Grid key={item} item sm={6} md={4} height={"100%"}>
              <ProductShimmer />
            </Grid>
          ))
        : filteredProducts
            ?.filter((elem: any) => elem?._data?.user_type === undefined)
            ?.map((item: any, index: number) => (
              <Grid key={index} item sm={6} md={4} height={"100%"}>
                {item?._data?.user_type === undefined && (
                  <ProductCard product={item} />
                )}
              </Grid>
            ))}
    </Grid>
  );
}

export function ProductListViewTab() {
  const filteredProducts = useSelector(
    (state: RootState) => state.search.filteredProducts
  );

  return (
    <Box>
      {/* Header Section */}
      <Grid
        container
        spacing={1}
        mb={2}
        display={!filteredProducts ? "none" : "flex"}
      >
        <Grid item sm={2} md={2}></Grid>
        <Grid item sm={4} md={4}>
          <Typography fontSize={13} textAlign={"left"}>
            Products
          </Typography>
        </Grid>
        <Grid item sm={2} md={2}>
          <Typography fontSize={13} textAlign={"center"}>
            Quantity
          </Typography>
        </Grid>
        <Grid item sm={2} md={2}>
          <Typography fontSize={13} textAlign={"center"}>
            Exp Date
          </Typography>
        </Grid>
        <Grid item sm={2} md={2}>
          <Typography fontSize={13} textAlign={"center"}>
            Price
          </Typography>
        </Grid>
      </Grid>

      <List disablePadding>
        {!filteredProducts
          ? [1, 2, 3, 4, 5, 6].map((item: number) => (
              <ProductListShimmer key={item} />
            ))
          : filteredProducts
              ?.filter((elem) => elem?._data?.user_type === undefined)
              ?.map((item: any, index: number) => (
                <GridProductItem
                  key={index}
                  product={item?.user_type === undefined && item}
                />
              ))}
      </List>
    </Box>
  );
}
