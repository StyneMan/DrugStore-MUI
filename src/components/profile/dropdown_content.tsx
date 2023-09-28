import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CustomDialog from "../dialog";
import { useNavigate } from "react-router-dom";

export default function ProfileDropDownContent() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const navigate = useNavigate();

  const confirmDialogBody = (
    <Box
      px={8}
      py={6}
      display="flex"
      flexDirection="column"
      justifyContent={"center"}
      alignItems={"center"}
      maxWidth={360}
    >
      <Typography fontWeight={300} fontSize={26} gutterBottom textAlign={'center'} >
        Are you sure you want to clock out
      </Typography>
      <br />
      <Button
        variant="contained"
        sx={{ px: 4, py: 1 }}
        onClick={() => {
          setOpenDialog(false);
          navigate("/");
        }}
      >
        Clock out
      </Button>
      <br />
      <Button
        variant="text"
        sx={{ px: 4, py: 1 }}
        onClick={() => setOpenDialog(false)}
      >
        Cancel
      </Button>
    </Box>
  );

  return (
    <Box
      display={"flex"}
      px={1}
      py={2}
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"center"}
    >
      <CustomDialog
        open={openDialog}
        setOpen={setOpenDialog}
        showClose={false}
        content={confirmDialogBody}
      />
      <Typography color={"black"} gutterBottom fontWeight={600} fontSize={16}>
        Oluwamayowa
      </Typography>
      <Typography fontSize={13} color={"gray"} gutterBottom>
        Attendant • 4hr 56m
      </Typography>
      <Divider
        variant="middle"
        sx={{ height: 1, width: "90%", backgroundColor: "#DAE1E7", my: 2 }}
      />
      <Box
        p={1}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"start"}
        alignSelf={"start"}
        alignItems={"center"}
      >
        <AccountCircleIcon sx={{ color: "#bbb" }} />
        <Typography px={2} fontWeight={200} fontSize={15} color={"grey"}>
          View Profile
        </Typography>
      </Box>
      <Box
        p={1}
        mb={2}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"start"}
        alignSelf={"start"}
        alignItems={"center"}
      >
        <AccountBalanceWalletIcon sx={{ color: "#bbb" }} />
        <Typography px={2} fontWeight={200} fontSize={15} color={"grey"}>
          Edit Account Number
        </Typography>
      </Box>

      <Button
        variant="contained"
        sx={{ py: 1, px: 4 }}
        onClick={() => setOpenDialog(true)}
      >
        Clock Out
      </Button>
    </Box>
  );
}
