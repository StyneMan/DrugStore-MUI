import { Box, Grid, List, ListItem, Typography, useTheme } from "@mui/material";
import React from "react";
import ProductCard from "../../../components/cards/product_card";
import { getDatabase } from "../../../database";
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";
import { ToastBar, Toaster, toast } from "react-hot-toast";
import { Info } from "@mui/icons-material";

export interface Props {
  product: any;
}

export default function ProductTab() {
  const filteredProducts = useSelector(
    (state) => state.search.filteredProducts
  );

  // const products = useSelector((state) => state.product.products);

  return (
    <Grid
      container
      spacing={2}
      display="flex"
      flexDirection={"row"}
      justifyContent={"start"}
      alignItems={"stretch"}

    >
      {filteredProducts?.map((item: any, index: number) => (
        <Grid key={index} item sm={6} md={4} height={'100%'} >
          {/* <Typography>{item?.name}</Typography> */}
          <ProductCard product={item} />
        </Grid>
      ))}
    </Grid>
  );
}

export function ProductListViewTab() {
  const filteredProducts = useSelector(
    (state) => state.search.filteredProducts
  );

  // const products = useSelector((state) => state.product.products);

  // console.log("STATE PRODUCTS ===>>> ", products?.data);

  return (
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
        {filteredProducts?.map((item: any, index: number) => (
          <ItemRow key={index} product={item} />
        ))}
      </List>
    </Box>
  );
}

const ItemRow = ({ product }: Props) => {
  const theme = useTheme();
  const [data, setData] = React.useState<any>([]);

  async function getCarts() {
    try {
      const db = await getDatabase("drugstore");

      db.carts.find().$.subscribe(async function (heroes) {
        if (!heroes) {
          // heroesList.innerHTML = 'Loading..';
          console.log("EMPTY DATABASE ::: ");
          return;
        }

        setData(heroes);
      });
    } catch (error) {
      console.log("CATCH ERROR ::: ", error);
    }
  }

  React.useEffect(() => {
    getCarts();
  }, []);

  React.useEffect(() => {
    console.log("DATA", data);
  }, [data]);

  const addCart = async () => {
    try {
      const db = await getDatabase("drugstore");
      const obj = {
        id: new Date().getTime().toString(),
        items: [
          {
            name: product?.name,
            image: product?.image,
            quantity: 1,
            unitPrice: product?.price,
          },
        ],
        timestamp: new Date().toISOString(),
      };

      if (data?.length > 0) {
        // There is something already
        console.log("SOMETHING EXISTS ", data);

        // Loop through each cart document in data
        for (const elem of data) {
          // Check if this product is already in cart
          const itemExists = elem._data.items.some(
            (it: any) => it.name.toLowerCase() === product?.name.toLowerCase()
          );

          if (itemExists) {
            // setAdded(true);
            console.log("Already ADDED !!! ");
            toast.error("Product already added!", {
              duration: 4000,
              icon: (
                <Info
                  fontSize="small"
                  sx={{ color: theme.palette.error.dark }}
                />
              ),
              iconTheme: {
                primary: "#000",
                secondary: "#fff",
              },
            });
          } else {
            // setAdded(false);
            console.log("NOT YET ADDED ...", elem._data.items);

            // Clone the existing items array
            const updatedItems = [...elem._data.items];

            // Push the new item into the updated items array
            updatedItems.push({
              name: product?.name,
              image: product?.image,
              quantity: 1,
              unitPrice: product?.price,
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
        console.log("NOTHING YET !! ");
        const resp = await db?.carts.insert(obj);
        console.log("RESPONSE >> ", resp);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  // const num  = 9.00;
  // num.toPrecision()

  return (
    <ListItem
      divider
      disableGutters
      disablePadding
      button
      onClick={() => addCart()}
    >
      <Toaster position="bottom-center">
        {(t) => (
          <ToastBar
            toast={t}
            position="bottom-center"
            style={{
              backgroundColor: theme.palette.error.light,
              paddingTop: 2,
              paddingBottom: 2,
              paddingLeft: 48,
              paddingRight: 48,
              border: `1px solid ${theme.palette.error.main}`,
            }}
          >
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== "loading" && <></>}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
      <Grid container spacing={1} py={2}>
        <Grid item sm={2} md={2}>
          <img src={product?.image_url} width={64} height={48} />
        </Grid>
        <Grid item sm={4} md={4}>
          <Typography>{product?.name}</Typography>
        </Grid>
        <Grid item sm={2} md={2}>
          <Typography textAlign={"center"}>
            {
              `${product?.product_variations[0]?.variations[0]?.variation_location_details[0]?.qty_available}`
                .toString()
                .split(".")[0]
            }
          </Typography>
        </Grid>
        <Grid item sm={2} md={2}>
          <Typography textAlign={"center"}>{product?.expiry_period}</Typography>
        </Grid>
        <Grid item sm={2} md={2}>
          <NumericFormat
            style={{ fontSize: 16, fontFamily: "Roboto, sans-serif" }}
            value={parseInt(
              product.product_variations[0]?.variations[0]?.default_sell_price
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
