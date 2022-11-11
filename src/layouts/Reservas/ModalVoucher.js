import * as React from "react";
import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import NumberFormatCustom from "components/ValidationCurrency/ValidationCurrency";
import SelectBancos from "../../components/SelectBancos/SelectBancos";
import SelectTipoTransaccion from "../../components/SelectTipoTransaccion/SelectTipoTransaccion";
import moment from "moment";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "./style.css";
import API from "../../Environment/config";

export default function ModalVoucher({ open, setOpen }) {
  const [openLoading, setOpenLoading] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 999 }}
        open={openLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Listado de abonos"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
