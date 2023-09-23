import { Box, Typography } from "@mui/material";
import React from "react";
import { CategoryModel } from "../../data/categories";

interface CategoryProps {
    item: CategoryModel;
}

export default function CategoryCard({item}: CategoryProps) {
  return (
    <Box
      bgcolor={item?.bgcolor}
      borderRadius={2}
      padding={4}
      height={144}
      display="flex"
      flexDirection={"column"}
      justifyContent={"space-between"}
      alignItems={"start"}
    >
      <img src={item?.icon} alt="" />
      <Box flex={1} />
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent={"start"}
        alignItems={"start"}
        color={item?.color}
      >
        <Typography fontSize={16} fontWeight={700} gutterBottom >{item?.title}</Typography>
        <Typography fontSize={13} fontWeight={400} gutterBottom >{`${item?.count} items`}</Typography>
      </Box>
    </Box>
  );
}
