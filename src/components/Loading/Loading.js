import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function GlobalLoading({ open, text = "Loading..." }) {
  return (
    <div>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <CircularProgress color="inherit" />
          <div style={{ marginTop: 10 }}> {text} </div>
        </div>
      </Backdrop>
    </div>
    // <div>
    //   <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
    //     <CircularProgress color="inherit" />
    //   </Backdrop>
    // </div>
  );
}
