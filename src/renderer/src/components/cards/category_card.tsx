import { Box, ListItemButton, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setItemClicked,
  setSelectedCategoryItems,
} from "../../redux/slices/categories";
import { setFilteredProducts } from "../../redux/slices/search";
import { RootState } from "../../redux/store";

interface CategoryProps {
  item;
}

export default function CategoryCard({ item }: CategoryProps) {
  const dispatch = useDispatch();
  const [itemCount, setItemCount] = React.useState(0);
  const [selectedItems, setSelectedItems] = React.useState([]);

  const products = useSelector((state: RootState) => state.product.products);

  React.useEffect(() => {
    if (products) {
      const filtered = products?.filter(
        (ite) => ite?.category?.name === item?.name
      );

      setItemCount(filtered.length);
      setSelectedItems(filtered);
      setFilteredProducts(products);
    }
  }, [item?.name, products]);

  return (
    <Box
      bgcolor={item?.backgroundColor}
      borderRadius={2}
      py={2.5}
      px={4}
      height={180}
      display="flex"
      flexDirection={"column"}
      justifyContent={"space-between"}
      alignItems={"start"}
      component={ListItemButton}
      onClick={() => {
        dispatch(setItemClicked(true));
        console.log("ONKJ :: KK ", selectedItems);

        dispatch(setSelectedCategoryItems(selectedItems));
      }}
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
        <Typography
          fontSize={16}
          fontWeight={700}
          color={item?.foreColor}
          gutterBottom
        >
          {item?.name}
        </Typography>
        <Typography
          fontSize={13}
          fontWeight={400}
          gutterBottom
          color={item?.foreColor}
        >{`${itemCount} items`}</Typography>
      </Box>
    </Box>
  );
}
