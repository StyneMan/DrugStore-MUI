import { Grid, Skeleton } from "@mui/material";
import React from "react";

export default function ProductListShimmer() {
  return (
    <Grid container spacing={1} py={2}>
      <Grid item sm={2} md={2}>
        <Skeleton variant="rounded" height={72} width={72} />
      </Grid>
      <Grid item sm={4} md={4}>
        <Skeleton variant="text" height={36} width={128} />
      </Grid>
      <Grid item sm={2} md={2}>
        <Skeleton variant="text" height={36} width={48} />
      </Grid>
      <Grid item sm={2} md={2}>
        <Skeleton variant="text" height={36} width={48} />
      </Grid>
      <Grid item sm={2} md={2}>
      <Skeleton variant="text" height={36} width={56} />
      </Grid>
    </Grid>
  );
}
