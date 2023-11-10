import { Box, Skeleton } from "@mui/material";
import React from "react";

export default function ProductShimmer() {
  return (
    <Box display={"flex"} flexDirection={"column"} p={1}>
      <Skeleton variant="rounded" height={200} width={"100%"} />
      <Box
        p={2}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"start"}
        alignItems={"stretch"}
      >
        <Box
          mb={1}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Skeleton variant="text" width={108} height={20} />
          <Skeleton variant="text" width={24} height={20} />
        </Box>
        <Skeleton variant="text" width={70} height={21} sx={{mb: 1}} />
        <Skeleton variant="text" width={100} height={21} />
      </Box>
    </Box>
  );
}
