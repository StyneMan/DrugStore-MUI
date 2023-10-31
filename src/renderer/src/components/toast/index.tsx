import { Button } from "@mui/material";
import React from "react";
import toast, { Toaster, ToastBar } from "react-hot-toast";

export default function CustomToast() {
  return (
    <Toaster>
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== "loading" && (
                <Button onClick={() => toast.dismiss(t.id)}>X</Button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}
