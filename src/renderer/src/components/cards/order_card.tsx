import { Box, Typography } from "@mui/material";
import React from "react";
// import { OrderItem } from "../../data/orders";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { NumericFormat } from "react-number-format";

interface OrderProps {
  order: any;
  rxDoc: any;
  index: number;
}

export default function OrderCard({ order, rxDoc, index }: OrderProps) {
  // const [count, setCount] = React.useState(3);

  React.useEffect(() => {
    console.log("RXDOC", rxDoc);
    console.log("ORDER", order);
  }, []);

  return (
    <Box
      py={1}
      width={"100%"}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"stretch"}
    >
      <Box pr={2}>
        <img src={order?.image} width={56} height={56} alt="" />
      </Box>
      <Box
        flex={1}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"start"}
        alignItems={"start"}
      >
        <Typography fontSize={16} fontWeight={600}>
          {order?.title}
        </Typography>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"start"}
          alignItems={"center"}
        >
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            bgcolor="#C6D2DD"
            width={34}
            height={36}
            sx={{ cursor: "pointer" }}
            onClick={async () => {
              // await rxDoc?.modify((docData: any) => {
              console.log("RX DOC SD:: ", rxDoc?._data.items[index].quantity);

              if (rxDoc?._data.items[index].quantity > 1) {
                await rxDoc?.update({
                  $set: {
                    [`items.${index}.quantity`]:
                      rxDoc.items[index].quantity - 1,
                  },
                });
              }
              //   console.log("RX DOC AFTER :: ", docData?.items[index].quantity);
              //   return docData;
              // });
            }}
          >
            <RemoveIcon />
          </Box>
          <Typography p={2}>{rxDoc.items[index].quantity}</Typography>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            bgcolor="#C6D2DD"
            width={34}
            height={36}
            sx={{ cursor: "pointer" }}
            onClick={async () => {
              await rxDoc?.update({
                $set: {
                  [`items.${index}.quantity`]: rxDoc.items[index].quantity + 1,
                },
              });
            }}
          >
            <AddIcon />
          </Box>
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"start"}
      >
        <NumericFormat
          style={{ fontSize: 15, fontFamily: "sans-serif" }}
          value={rxDoc.items[index].unitPrice.toFixed(2)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₦"}
        />
        <Box
          marginTop={-6}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"start"}
          alignItems={"center"}
        >
          <Box px={1} sx={{ cursor: "pointer" }}>
            <DescriptionIcon sx={{ color: "grey" }} />
          </Box>
          <Box
            px={1}
            sx={{ cursor: "pointer" }}
            onClick={async () => {
              const re = rxDoc?._data.items.filter((item: any) => item.name !== rxDoc.items[index]?.name);
              console.log("FILTERED :: ", re);

              await rxDoc?.update({
                $set: {
                  [`items`]: re,
                },
              });
              
        
              // await rxDoc?.remove;
            }}
          >
            <DeleteForeverIcon sx={{ color: "grey" }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
