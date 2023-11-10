import React from "react";
// import { ProductModel } from "../../data/products";
import {
  Box,
  Card,
  CardActionArea,
  Chip,
  Typography,
  useTheme,
} from "@mui/material";
// import inventoryImage from "../../assets/images/inventory_2.svg";

// import electron from "electron";
// import { getRxStorageIpcRenderer } from "rxdb/plugins/electron";
// import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { getDatabase } from "../../../../main/database";
import { NumericFormat } from "react-number-format";
import { ToastBar, Toaster, toast } from "react-hot-toast";
// import { Info } from "@mui/icons-material";
import { useSelector } from "react-redux";

export interface ProductProps {
  product: any;
}

export default function ProductCard2({ product }: ProductProps) {
  const theme = useTheme();
  const [isAdded, setAdded] = React.useState(false);
  const [data, setData] = React.useState<any>([]);

  const currentCustomer = useSelector(
    (state) => state.purchase.currentCustomer
  );
  const dbasePath = useSelector((state) => state.database.dbasePath);

  async function getCarts() {
    try {
      const db = await getDatabase(dbasePath);

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

  console.log("PRODUCTS2 :21 : ", product?._data);
  console.log("PRODUCTS2 :22 : ", product);

  React.useEffect(() => {
    getCarts();
  }, []);

  React.useEffect(() => {
    console.log("DATA", data);
  }, [data]);

  const addCart = async () => {
    try {
      const db = await getDatabase(dbasePath);
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
          },
        ],
        timestamp: new Date().toISOString(),
      };

      if (data?.length > 0) {
        // There is something already
        // console.log("SOMETHING EXISTS ", data);

        // Loop through each cart document in data
        for (const elem of data) {
          // Check if this product is already in cart
          const itemExists = elem._data.items.some(
            (it: any) =>
              it.name.toLowerCase() ===
              (product?._data?.name ?? product?.name)?.toLowerCase()
          );

          if (itemExists) {
            setAdded(true);
            // console.log("Already ADDED !!! ");
            toast.error("Product already added!");
            // {
            //   duration: 4000,
            //   icon: (
            //     <Info
            //       fontSize="small"
            //       sx={{ color: theme.palette.error.dark }}
            //     />
            //   ),
            //   iconTheme: {
            //     primary: "#000",
            //     secondary: "#fff",
            //   },
            // });
          } else {
            setAdded(false);
            console.log("NOT YET ADDED ...", elem._data.items);

            // Clone the existing items array
            const updatedItems = [...elem._data.items];

            // Push the new item into the updated items array
            updatedItems.push({
              name: product?.name,
              image: product?.image_url,
              quantity: 1,
              unitPrice: parseInt(
                product?._data?.product_variations[0]?.variations[0]
                  ?.default_sell_price ??
                  product?.product_variations[0]?.variations[0]
                    ?.default_sell_price
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
        console.log("NOTHING YET !! ");
        const resp = await db?.carts.insert(obj);
        console.log("RESPONSE >> ", resp);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <Card>
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
      <Box
        borderRadius={2}
        display="flex"
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"start"}
        component={CardActionArea}
        onClick={() => {
          if (!currentCustomer) {
            console.log("NO Customer selected !!! ");
            toast.error("Select customer first!");
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
                product?._data?.product_variations[0]?.variations[0]
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
