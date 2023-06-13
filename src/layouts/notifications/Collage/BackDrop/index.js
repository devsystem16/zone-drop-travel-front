import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function SimpleBackdrop({ text = "Guardando...", open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        // onClick={handleClose}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <CircularProgress color="inherit" />
          <div style={{ marginTop: 10 }}> {text} </div>
        </div>

        {/* 
        <br></br>
        <CircularProgress color="inherit" /> */}
      </Backdrop>
    </div>
  );
}
