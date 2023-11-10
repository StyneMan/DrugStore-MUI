import { Box, Button, Grid, IconButton, List, Typography } from "@mui/material";
import React from "react";
import CategoryCard from "../../../components/cards/category_card";
import { useDispatch, useSelector } from "react-redux";

import syringe from "../../../assets/images/syringe.svg";
import fluid from "../../../assets/images/fluid.svg";
import pill from "../../../assets/images/pill.svg";
import accessible from "../../../assets/images/accessible.svg";
import { ArrowBack } from "@mui/icons-material";
import ProductCard from "../../../components/cards/product_card";
import { setItemClicked } from "../../../redux/slices/categories";
import Window from "@mui/icons-material/Window";
import ViewList from "@mui/icons-material/ViewList";
import GridProductItem from "../../../components/cards/product_grid_item";
import CategoryShimmer from "../../../components/shimmers/category_shimmer";

interface CategoryProduct {
  data: any;
}

export default function CategoriesTab() {
  const categories = useSelector((state) => state.category.categories);
  console.log("CATEGORIS FROM REDUX STATE :: ", categories);

  const mColors = [
    { bgcolor: "#CCE4F2", color: "#0C2B6A", icon: syringe },
    { bgcolor: "#8DC2E5", color: "#0B1841", icon: pill },
    { bgcolor: "#0F408A", color: "#CCE4F2", icon: accessible },
    { bgcolor: "#0B1841", color: "#CCE4F2", icon: fluid },
  ];

  function assignRandomColors(cates: any[]) {
    return cates?.map((item: any) => {
      const randomColor = mColors[Math.floor(Math.random() * mColors.length)];
      return {
        ...item,
        backgroundColor: randomColor?.bgcolor,
        foreColor: randomColor?.color,
        icon: randomColor?.icon,
      };
    });
  }

  return (
    <Grid container spacing={2} mt={2}>
      {!categories
        ? [1, 2, 3, 4, 5, 6, 7, 8].map((item: number) => (
            <Grid key={item} item sm={4} md={4} lg={3}>
              <CategoryShimmer />
            </Grid>
          ))
        : assignRandomColors(categories)?.map((item: any, index: number) => {
            return (
              <Grid key={index} item sm={4} md={4} lg={3}>
                <CategoryCard item={item} />
              </Grid>
            );
          })}
    </Grid>
  );
}

export function CategoryProducts({ data }: CategoryProduct) {
  const [isGrid, setGrid] = React.useState(true);
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log("DTA :: ", data);
  }, [data]);

  return (
    <Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        pb={2}
      >
        <Button
          startIcon={<ArrowBack />}
          variant="text"
          sx={{ textTransform: "capitalize" }}
          onClick={() => {
            dispatch(setItemClicked(false));
          }}
        >
          Go back
        </Button>
        {/* <p>{data?.name ?? ""}</p> */}
        <Box
          flex={1}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"end"}
          alignItems={"center"}
        >
          <Box>
            <IconButton onClick={() => setGrid(true)}>
              <Window
                sx={{
                  color: isGrid ? "black" : "grey",
                }}
              />
            </IconButton>

            <IconButton onClick={() => setGrid(false)}>
              <ViewList
                sx={{
                  color: !isGrid ? "black" : "grey",
                }}
              />
            </IconButton>
          </Box>
        </Box>
      </Box>
      {isGrid ? (
        <Grid
          container
          spacing={2}
          display="flex"
          flexDirection={"row"}
          justifyContent={"start"}
          alignItems={"stretch"}
        >
          {data?.map((item: any, index: number) => (
            <Grid key={index} item sm={6} md={4} height={"100%"}>
              {/* <Typography>{item?.name}</Typography> */}
              <ProductCard product={item} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box>
          {/* Header Section */}
          <Grid container spacing={1} mb={2}>
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
            {data?.map((item: any, index: number) => (
              <GridProductItem key={index} product={item} />
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}
