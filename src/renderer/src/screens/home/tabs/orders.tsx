import React from "react";
import { Box, List, Toolbar, Typography } from "@mui/material";
import OrderCard from "../../../components/cards/order_card";
import { getDatabase } from "../../../database";
// import electron from "electron";
// import { getRxStorageIpcRenderer } from "rxdb/plugins/electron";
// import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
// import { getDatabase } from "../../../database";

export default function Orders() {
  const [cartList, setCartList] = React.useState<JSX.Element[]>([]);
  // const [updater, setUpdater] = React.useState();

  async function getCarts() {
    try {
      const db = await getDatabase("drugstore");

      db.carts.find().$.subscribe(function (heroes) {
        if (!heroes) {
          console.log("EMPTY DATA ");

          // heroesList.innerHTML = 'Loading..';
          return;
        }
        // setUpdater(heroes[0]?._data)
        console.log("OBS fired");
        // console.dir(heroes[0]?._data);

        const content = heroes.map((hero) => {
          return (
            <Box
              py={1}
              display="flex"
              flexDirection={"column"}
              justifyContent={"start"}
              alignItems={"start"}
            >
              <Typography gutterBottom>{`Order ${hero?._data?.id}`}</Typography>
              {hero?._data?.items?.map((el: any, index: number) => (
                <OrderCard key={index} order={el} rxDoc={hero} index={index} />
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

  return (
    <Box px={2}>
      <Toolbar />
      <Toolbar />
      <br />
      <List>{cartList}</List>
    </Box>
  );
}
