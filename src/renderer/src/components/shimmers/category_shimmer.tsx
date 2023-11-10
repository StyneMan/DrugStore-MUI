import { Box, Skeleton } from "@mui/material";

export default function CategoryShimmer() {
  return (
    <Box display={"flex"} flexDirection={"column"}  width={"100%"} >
      <Skeleton variant="rounded" height={186} width={'100%'} animation="wave"  />
    </Box>
  );
}
