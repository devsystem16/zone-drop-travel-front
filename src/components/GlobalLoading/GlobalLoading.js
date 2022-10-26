import * as React from "react";
import { useContext, useEffect } from "react";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { GlobalConfigContext } from "../../layouts/tours/context/GlobalConfigContext";

export default function GlobalLoading() {
  const { loadGlobal } = useContext(GlobalConfigContext);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadGlobal}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
