import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
// import tempCategories, { CategoryModel } from "../../../data/categories";
import CategoryCard from "../../../components/cards/category_card";
import { useDispatch } from "react-redux";

import syringe from "../../../assets/images/syringe.svg";
import fluid from "../../../assets/images/fluid.svg";
import pill from "../../../assets/images/pill.svg";
import accessible from "../../../assets/images/accessible.svg";
import { ArrowBack, Info } from "@mui/icons-material";
import ProductCard from "../../../components/cards/product_card";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { NumericFormat } from "react-number-format";
import { Props } from "./products";
import { getDatabase } from "../../../database";
import { setItemClicked } from "../../../redux/slices/categories";
import Window from "@mui/icons-material/Window";
import ViewList from "@mui/icons-material/ViewList";

interface CategoryProduct {
  data: any;
}

export default function CategoriesTab() {
  const [categories, setCategories] = React.useState<any>([]);
  // const categories = useSelector((state) => state.category.categories);

  const mColors = [
    { bgcolor: "#CCE4F2", color: "#0C2B6A", icon: syringe },
    { bgcolor: "#8DC2E5", color: "#0B1841", icon: pill },
    { bgcolor: "#0F408A", color: "#CCE4F2", icon: accessible },
    { bgcolor: "#0B1841", color: "#CCE4F2", icon: fluid },
  ];

  async function getCategories() {
    try {
      const db = await getDatabase("drugstore");

      db.categories
        .find()
        .sort({
          id: "asc",
        })
        .$.subscribe(function (categories) {
          if (!categories) {
            return;
          }

          // console.log("FROM DATABASE ==>  ", categories[0]?._data?.data);
          setCategories(categories[0]?._data?.data);
        });
    } catch (error) {
      console.log("CATCH ERROR ::: ", error);
    }
  }

  React.useEffect(() => {
    getCategories();
  }, []);

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
      {assignRandomColors(categories)?.map((item: any, index: number) => (
        <Grid key={index} item sm={4} md={4} lg={3}>
          <CategoryCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
}

export function CategoryProducts({ data }: CategoryProduct) {
  const [isGrid, setGrid] = React.useState(true);
  const dispatch = useDispatch();

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
              <ItemRow key={index} product={item} />
            ))}
          </List>
        </Box>
      )}
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
