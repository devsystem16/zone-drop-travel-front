import * as React from "react";
import { useEffect, useState, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { GlobalConfigContext } from "../../context/GlobalConfigContext";
export default function Modal({ titulo }) {
  const { modalGlobal, setModalGlobal, Component } = useContext(GlobalConfigContext);

  const handleClickOpen = () => {
    setModalGlobal(true);
  };
  const handleClose = () => {
    setModalGlobal(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open max-width dialog
      </Button>
      <Dialog fullWidth={true} maxWidth="xl" open={modalGlobal} onClose={handleClose}>
        <DialogTitle> {titulo}</DialogTitle>
        <DialogContent>
          <DialogContentText>{Component}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
