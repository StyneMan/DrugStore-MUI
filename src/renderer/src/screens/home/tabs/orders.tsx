/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, List, Toolbar, Typography } from "@mui/material";
import OrderCard from "../../../components/cards/order_card";
import { getDatabase } from "../../../../../main/database";

import empty from "../../../assets/images/empty.png";

export default function Orders() {
  const [cartList, setCartList] = React.useState<JSX.Element[]>([]);
  const [updater, setUpdater] = React.useState(false);
  const [data, setData] = React.useState<unknown[]>([]);

  async function getCarts() {
    try {
      const db = await getDatabase(`${localStorage.getItem("dbPath")}`);

      db?.carts.find().$.subscribe(function (mCarts) {
        if (!mCarts) {
          console.log("EMPTY DATA ");
          return;
        }

        setData(mCarts);
        setUpdater(!updater);

        const content = mCarts.map((cart) => {
          return (
            <Box
              py={1}
              display="flex"
              flexDirection={"column"}
              justifyContent={"start"}
              alignItems={"start"}
            >
              <Typography gutterBottom>{`Order ${cart?._data?.id}`}</Typography>
              {cart?._data?.items?.map((el: any, index: number) => (
                <OrderCard key={index} order={el} rxDoc={cart} index={index} />
              ))}
            </Box>
          );
        });

        setCartList(content);
      });
    } catch (error) {
      console.log("CATCH ERROR ::: ", error);
    }
  }

  React.useEffect(() => {
    getCarts();
  }, []);

  React.useEffect(() => {
    if (data) {
      const organizedCart = data?.map((item: any) => {
        return {
          id: item?._data?.id,
          items: item?._data?.items,
          timestamp: item?._data?.timestamp,
        };
      });
      // console.log("CARTS DATA :: == :: ", ...organizedCart);
      // Now send this to main process
      window.electron.sendCartDataToMain(
        JSON.stringify([...organizedCart])
      );
    }
  }, [data, updater]);

  return (
    <Box px={2}>
      <Toolbar />
      <Toolbar />
      <br />
      {cartList?.length < 1 ? (
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
        >
          <img src={empty} alt="" />
          <Typography mt={-2} textAlign={"center"}>
            No orders found
          </Typography>
        </Box>
      ) : (
        <List>{cartList}</List>
      )}
    </Box>
  );
}
