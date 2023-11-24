import {
  Box,
  Card,
  CardActionArea,
  Chip,
  Typography,
  useTheme,
} from "@mui/material";

import { getDatabase } from "../../../../main/database";
import { NumericFormat } from "react-number-format";
import toast from "react-hot-toast";

import { useSelector } from "react-redux";
import { Info } from "@mui/icons-material";
import { RootState } from "../../redux/store";

export interface ProductProps {
  product;
}

export default function ProductCard({ product }: ProductProps) {
  const theme = useTheme();

  const currentCustomer = useSelector(
    (state: RootState) => state.customers.currentCustomer
  );
  const dbasePath = useSelector((state: RootState) => state.database.dbasePath);

  const addCart = async () => {
    
    try {
      const db = await getDatabase(dbasePath);
      const existingData = await db?.carts.find().exec();
     
      const obj = {
        id: new Date().getTime().toString(),
        items: [
          {
            name: product?._data?.name ?? product?.name,
            image: product?._data?.image_url ?? product?.image_url,
            quantity: 1,
            unitPrice: parseInt(
              product?._data?.product_variations[0]?.variations[0]
                ?.default_sell_price ??
                product?.product_variations[0]?.variations[0]
                  ?.default_sell_price
            ).toFixed(2),
            productId: product?._data?.id ?? product?.id,
            priceWithTax: parseInt(
              product?._data?.product_variations[0]?.variations[0]
                ?.sell_price_inc_tax ??
                product?.product_variations[0]?.variations[0]
                  ?.sell_price_inc_tax
            ).toFixed(2),
            variationId:
              product?._data?.product_variations[0]?.variations[0]
                ?.product_variation_id ??
              product?.product_variations[0]?.variations[0]
                ?.product_variation_id,
            productType: product?._data?.type ?? product?.type,
            productUnitId: product?._data?.unit?.id ?? product?.unit?.id,
          },
        ],
        timestamp: new Date().toISOString(),
      };


      if (existingData && existingData?.length > 0) {
        // There is something already
        for (const elem of existingData) {
          // Check if this product is already in cart
          const itemExists = elem?._data?.items.some(
            (it) =>
              it.name.toLowerCase() ===
              (product?._data?.name ?? product?.name)?.toLowerCase()
          );

          if (itemExists) {
            toast.error("Product already added!!", {
              icon: <Info color="error" />,
              style: {
                backgroundColor: "#fadcdcf6",
                color: theme.palette.error.dark,
                paddingLeft: 24,
                paddingRight: 24,
                paddingTop: 16,
                paddingBottom: 16,
                fontSize: 21,
              },
              position: "top-center",
            });
          } else {
            // console.log("NOT YET ADDED ...", elem._data.items);

            // Clone the existing items array
            const updatedItems = [...elem._data.items];

            // Push the new item into the updated items array
            updatedItems.push({
              name: product?._data?.name ?? product?.name,
              image: product?._data?.image_url ?? product?.image_url,
              quantity: 1,
              unitPrice: parseInt(
                product?._data?.product_variations[0]?.variations[0]
                  ?.default_sell_price ??
                  product?.product_variations[0]?.variations[0]
                    ?.default_sell_price
              ).toFixed(2),
              productId: product?._data?.id ?? product?.id,
              priceWithTax: parseInt(
                product?._data?.product_variations[0]?.variations[0]
                  ?.sell_price_inc_tax ??
                  product?.product_variations[0]?.variations[0]
                    ?.sell_price_inc_tax
              ).toFixed(2),
            });

            // Use RxDB's update() method to update the "items" array
            const updatedCart = await elem.update({
              $set: { items: updatedItems },
            });

            // Save the updated document
            await updatedCart.save();
          }
        }
      } else {
        // console.log("NOTHING YET !! ");
         await db?.carts.insert(obj);
        // console.log("RESPONSE >> ", resp);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <Card
      elevation={
        parseInt(
          `${product?._data?.product_variations[0]?.variations[0]?.variation_location_details[0]?.qty_available}`
        ) <= 0 ||
        parseInt(
          `${product?.product_variations[0]?.variations[0]?.variation_location_details[0]?.qty_available}`
        ) <= 0
          ? 0
          : 1
      }
    >
      <Box
        borderRadius={2}
        display="flex"
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"start"}
        component={CardActionArea}
        disabled={
          parseInt(
            `${product?._data?.product_variations[0]?.variations[0]?.variation_location_details[0]?.qty_available}`
          ) <= 0 ||
          parseInt(
            `${product?.product_variations[0]?.variations[0]?.variation_location_details[0]?.qty_available}`
          ) <= 0
            ? true
            : false
        }
        onClick={() => {
          if (!currentCustomer) {
            // console.log("No Customer selected !!! ");
            toast.error("Select customer first!", {
              icon: <Info color="error" />,
              style: {
                backgroundColor: "#fadcdcf6",
                color: theme.palette.error.dark,
                paddingLeft: 24,
                paddingRight: 24,
                paddingTop: 16,
                paddingBottom: 16,
                fontSize: 21,
              },
              position: "top-center",
            });
          } else {
            addCart();
          }
        }}
      >
        <img
          src={product?._data?.image_url ?? product?.image_url}
          alt=""
          height={175}
          width={"100%"}
        />
        <Box
          width={"86%"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          alignItems={"stretch"}
          padding={2}
        >
          <Box
            width={"100%"}
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
              {product?._data === undefined ? (
                <Typography variant="body2">
                  {`${
                    product?.product_variations[0]?.variations[0]
                      ?.variation_location_details[0]?.qty_available ===
                    undefined
                      ? "0 "
                      : product?.product_variations[0]?.variations[0]?.variation_location_details[0]?.qty_available
                          ?.toString()
                          .split(".")[0]
                  } left in stock`}
                </Typography>
              ) : (
                <Typography variant="body2">
                  {`${
                    product?._data?.product_variations[0]?.variations[0]
                      ?.variation_location_details[0]?.qty_available ===
                    undefined
                      ? "0 "
                      : product?._data?.product_variations[0]?.variations[0]?.variation_location_details[0]?.qty_available
                          ?.toString()
                          .split(".")[0]
                  } left in stock`}
                </Typography>
              )}
            </Box>
            <Chip
              label={product?._data?.expiry_period ?? product?.expiry_period}
              sx={{
                bgcolor: theme.palette.success.light,
                color: theme.palette.success.dark,
              }}
            />
          </Box>
          <br />

          <Box
            flexDirection={"column"}
            justifyContent={"start"}
            alignItems={"start"}
          >
            <Typography gutterBottom fontSize={18} fontWeight={700}>
              {product?._data?.name ?? product?.name}
            </Typography>
          </Box>

          <br />

          <Box
            flexDirection={"row"}
            justifyContent={"end"}
            alignItems={"center"}
            width={"100%"}
          >
            <NumericFormat
              style={{ fontSize: 16, fontFamily: "Roboto, sans-serif" }}
              value={parseInt(
                product?.product_variations[0]?.variations[0]
                  ?.default_sell_price
              ).toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₦"}
            />
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
