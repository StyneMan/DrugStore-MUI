import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type CustomDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showClose?: boolean;
  content: React.JSX.Element;
};

export default function CustomDialog({
  open,
  setOpen,
  content,
  showClose = true,
}: CustomDialogProps) {
  // const [op, seOp] = React.useState(false);
  // const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("xs");

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        maxWidth={"sm"}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box
          p={1}
          display="flex"
          flexDirection={"column"}
          justifyContent={"start"}
          alignItems={"center"}
        >
          {showClose && (
            <Box
              display="flex"
              flexDirection={"row"}
              justifyContent={"end"}
              width={"100%"}
            >
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
          )}
          {content}
        </Box>
      </Dialog>
    </div>
  );
}
