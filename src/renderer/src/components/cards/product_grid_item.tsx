import { Grid, ListItem, Typography, useTheme } from "@mui/material";
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Info } from "@mui/icons-material";
import { getDatabase } from "../../../../main/database";
import { ProductProps } from "./product_card";
import { RootState } from "../../redux/store";

const GridProductItem = ({ product }: ProductProps) => {
  const theme = useTheme();
  const dbasePath = useSelector((state: RootState) => state.database.dbasePath);

  const currentCustomer = useSelector(
    (state: RootState) => state.customers.currentCustomer
  );

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

      // console.log("OBJECT TO INSERT TO CART ::: ", obj);

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
    <ListItem
      divider
      disableGutters
      disablePadding
      button
      onClick={() => {
        if (!currentCustomer) {
          console.log("NO Customer selected !!! ");
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
      <Grid container spacing={1} py={2}>
        <Grid item sm={2} md={2}>
          <img
            src={product?._data?.image_url ?? product?.image_url}
            width={64}
            height={48}
          />
        </Grid>
        <Grid item sm={4} md={4}>
          <Typography>{product?._data?.name ?? product?.name}</Typography>
        </Grid>
        <Grid item sm={2} md={2}>
          {product?._data === undefined ? (
            <Typography textAlign={"center"}>
              {`${
                product?.product_variations[0]?.variations[0]
                  ?.variation_location_details[0]?.qty_available === undefined
                  ? "0 "
                  : product?.product_variations[0]?.variations[0]?.variation_location_details[0]?.qty_available
                      ?.toString()
                      .split(".")[0]
              }`}
            </Typography>
          ) : (
            <Typography textAlign={"center"}>
              {`${
                product?._data?.product_variations[0]?.variations[0]
                  ?.variation_location_details[0]?.qty_available === undefined
                  ? "0 "
                  : product?._data?.product_variations[0]?.variations[0]?.variation_location_details[0]?.qty_available
                      ?.toString()
                      .split(".")[0]
              }`}
            </Typography>
          )}
        </Grid>
        <Grid item sm={2} md={2}>
          <Typography textAlign={"center"}>
            {product?._data?.expiry_period ?? product?.expiry_period}
          </Typography>
        </Grid>
        <Grid item sm={2} md={2}>
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
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default GridProductItem;
