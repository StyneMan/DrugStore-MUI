import { Box, Grid } from "@mui/material";

import RightHandSide from "./components/right_hand_side";
import LeftHandSide from "./components/left_hand_side";

const HomeScreen = () => {
  return (
    <Box py={1}>
      <Grid container spacing={2} height={"100vh"} width={"100vw"}>
        {/* Left side of the home screen */}
        <Grid
          item
          sm={7}
          md={7}
          width={"100%"}
          height={"99vh"}
          sx={{ overflowX: "hidden", overflowY: "visible" }}
        >
          <LeftHandSide />
        </Grid>

        {/* Right side of the home screen */}
        <Grid
          item
          sm={5}
          md={5}
          width={"100%"}
          height={"99vh"}
          sx={{ overflowX: "hidden", overflowY: "visible" }}
        >
          <RightHandSide />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeScreen;
