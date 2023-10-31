import { Box, Card, Grid, TextField, Typography } from "@mui/material";
import React from "react";

const denominations: number[] = [5, 10, 20, 50, 100, 200, 500, 1000];

export default function CashDenominations() {
  return (
    <Box>
      {/* Header Section */}
      <Grid container spacing={2} mb={1}>
        <Grid item sm={4} md={4}>
          <Typography textAlign={"left"}>Denomination</Typography>
        </Grid>
        <Grid item sm={4} md={4}>
          <Typography textAlign={"center"}>Count</Typography>
        </Grid>
        <Grid item sm={4} md={4}>
          <Typography textAlign={"center"}>Subtotal</Typography>
        </Grid>
      </Grid>
      <Card sx={{ borderRadius: 3 }}>
        <Box p={1}>
          {denominations.map((item: number, index: number) => (
            <Grid key={index} container spacing={2} p={3}>
              <Grid item sm={4} md={4}>
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  mr={6}
                >
                  <Typography textAlign={"start"}>{item}</Typography>
                  <Typography>X</Typography>
                </Box>
              </Grid>
              <Grid item sm={4} md={4}>
                <TextField
                  variant="filled"
                  size="small"
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      borderRadius: 4,
                    },
                  }}
                />
              </Grid>
              <Grid item sm={4} md={4}>
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  ml={6}
                >
                  <Typography>=</Typography>
                  <Typography textAlign={"start"}>{item}</Typography>
                </Box>
              </Grid>
            </Grid>
          ))}
        </Box>
      </Card>
    </Box>
  );
}
