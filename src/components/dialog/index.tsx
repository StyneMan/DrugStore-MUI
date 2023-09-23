import * as React from 'react';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, IconButton } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close"

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type CustomDialogProps = {
    open: boolean;
    setOpen: any;
    content: React.JSX.Element;
}

export default function CustomDialog({open, setOpen, content} : CustomDialogProps) {

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box p={1} display="flex" flexDirection={"column"} justifyContent={"start"} alignItems={"center"} >
            <Box display="flex" flexDirection={"row"} justifyContent={"end"} width={'100%'} >
                <IconButton onClick={() => setOpen(false)} >
                    <CloseIcon />
                </IconButton>
            </Box>
            {content}
        </Box>
        
      </Dialog>
    </div>
  );
}
