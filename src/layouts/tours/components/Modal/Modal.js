import * as React from "react";
import { useEffect, useState, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { GlobalConfigContext } from "../../context/GlobalConfigContext";

export default function Modal({ titulo = "" }) {
  const { modalGlobal, setModalGlobal, Component } = useContext(GlobalConfigContext);

  const handleClose = (e) => {
    console.log(e.target.textContent);
    if (e.target.textContent === "Cerrar") setModalGlobal(false);
  };

  return (
    <React.Fragment>
      <Dialog
        // sx={{ "& .MuiDialog-paper": { width: "80%", height: "80%", maxHeight: 935 } }}
        // fullScreen={true}
        fullWidth={true}
        maxWidth="xl"
        open={modalGlobal}
        onClose={handleClose}
      >
        <DialogTitle> {titulo}</DialogTitle>
        <DialogContent>
          <DialogContentText>{Component}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="secondary" color="error">
            Cerrar
          </Button>

          {/* <Button onClick={handleClose}>Cerrar</Button> */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
