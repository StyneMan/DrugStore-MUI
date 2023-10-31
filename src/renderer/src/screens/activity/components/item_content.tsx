import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import { MActivity } from "../../../data/activities";
import ProductTable from "./product_table";

interface ItemContentProps {
  activity: MActivity;
}

export default function ItemContent({ activity }: ItemContentProps) {
  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"start"}
    >
      <Button
        sx={{ width: "40%", p: 3, color: "black", bgcolor: "white", mb: 2 }}
      >
        Print Receipt
      </Button>
      <Card elevation={0} sx={{ width: "80%", p: 4 }}>
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"start"}
          alignItems={"start"}
        >
          <Box
            width={"80%"}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            pb={1}
          >
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"start"}
              alignItems={"center"}
            >
              <Box
                bgcolor={"#D9D9D9"}
                borderRadius={12}
                width={24}
                height={24}
              />
              <Typography
                color={"#D9D9D9"}
                px={2}
                fontSize={21}
                fontWeight={700}
              >
                Payment Method
              </Typography>
            </Box>
            <Typography color={"black"} fontSize={21} fontWeight={700}>
              {activity?.amount}
            </Typography>
          </Box>

          <Box
            py={1}
            width={"80%"}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography color={"black"} px={2} fontSize={21} fontWeight={700}>
              Cash
            </Typography>
            <Typography color={"black"} fontSize={21} fontWeight={700}>
              {'#20,000'}
            </Typography>
          </Box>

          <Box
            py={1}
            width={"80%"}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography color={"black"} px={2} fontSize={21} fontWeight={700}>
              Transfer
            </Typography>
            <Typography color={"black"} fontSize={21} fontWeight={700}>
              {'#10,000'}
            </Typography>
          </Box>

          <Box
            py={1}
            width={"80%"}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography color={"black"} px={2} fontSize={21} fontWeight={700}>
              Amount Due
            </Typography>
            <Typography color={"black"} fontSize={21} fontWeight={700}>
              {'#0.00'}
            </Typography>
          </Box>
        </Box>
      </Card>
      <br/>
      <br/>
      <ProductTable />
    </Box>
  );
}
