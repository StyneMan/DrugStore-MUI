import React from "react";
import { ProductModel } from "../../data/products";
import { Box, Card, Chip, Typography } from "@mui/material";
import inventoryImage from "../../assets/images/inventory_2.svg";

interface ProductProps {
  product: ProductModel;
}

export default function ProductCard({ product }: ProductProps) {
  return (
    <Card>
      <Box
        borderRadius={2}
        display="flex"
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"start"}
      >
        <img src={product.image} alt="" height={175} width={"100%"} />
        <Box
          flexDirection={"column"}
          justifyContent={"space-between"}
          alignItems={"stretch"}
          padding={2}
        >
          <Box
            display="flex"
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box
              display="flex"
              flexDirection={"row"}
              justifyContent={"start"}
              alignItems={"center"} 
            >
             
              <Typography variant="body1"> {product.quantity} left in stock</Typography>
            </Box>
            <Chip label={product.validity} color="success" />
          </Box>
          <br/>

          <Box
            flexDirection={"column"}
            justifyContent={"start"}
            alignItems={"start"}
          >
            <Typography gutterBottom fontSize={18} fontWeight={700}>
              {product.name}
            </Typography>
            <Box
              display="flex"
              flexDirection={"row"}
              justifyContent={"start"}
              alignItems={"center"}
            >
              <img src={inventoryImage} alt="" />
              <Typography>{product.sachet}</Typography>
            </Box>
          </Box>

          <br/>

          <Box
            flexDirection={"row"}
            justifyContent={"end"}
            alignItems={"center"}
            width={'100%'}
          >
            <Typography textAlign={'end'} fontSize={20} fontWeight={700}>
              {`₦${product.price}`}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
