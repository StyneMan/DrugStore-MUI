import { Box, Card, Grid, Typography } from "@mui/material";
import React from "react";
import { ProductModel } from "../../../data/products";

interface ProductItemCardProps {
  data: ProductModel;
}

export default function ItemCard({ data }: ProductItemCardProps) {
  return (
    <Card elevation={0} sx={{ my: 2, p: 3, width: '94%' }}>
      <Box display={"flex"}>
        <Grid container spacing={1}>
          {/* Product name Column */}
          <Grid
            item
            md={5}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"start"}
          >
            <Typography fontSize={13} fontWeight={300} textAlign={"start"}>
              {data?.name}
            </Typography>
          </Grid>

          {/* Quantity Column */}
          <Grid
            item
            md={2}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"start"}
          >
            <Typography fontSize={15} textAlign={"start"}>
              {`${data?.quantity}`}
            </Typography>
          </Grid>

          {/* Unit Price Column */}
          <Grid
            item
            md={2}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"start"}
          >
            <Typography fontSize={15} textAlign={"start"}>
              {`₦${data?.price}`}
            </Typography>
          </Grid>

          {/* Total Column */}
          <Grid
            item
            md={3}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"start"}
          >
            <Typography fontSize={15} textAlign={"start"}>
              {`₦${data?.price * data?.quantity}`}
            </Typography>
          </Grid>

        </Grid>
      </Box>
    </Card>
  );
}
