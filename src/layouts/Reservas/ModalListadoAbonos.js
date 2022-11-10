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

export default function ModalListadoAbonos({ open, setOpen, setReload, abonos }) {
  const [openLoading, setOpenLoading] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const eventEliminarAbono = async (abono) => {
    var response = null;
    setOpenLoading(true);
    try {
      response = await API.post("/abono/eliminar/" + abono.id);
    } catch (error) {
      console.log(error);
    }
    setOpenLoading(false);

    if (response.status !== 200) {
      alertify.error("Ocurrió un error al procesar el pago, intente nuevamente.");
      return;
    }

    alertify.success("Abono eliminado correctamente.");

    setReload(true);
    setOpen(false);
  };
  var datos = JSON.parse(localStorage.getItem("abonoDatos"));

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
          <DialogContentText id="alert-dialog-description">
            <table id="customers" border="1" style={{ borderCollapse: "collapse" }}>
              <tr style={{ margin: 5 }}>
                <th>N°</th>
                <th>Fecha</th>
                <th>Abono</th>
                <th>Observaciones</th>
                <th>Acciones</th>
              </tr>

              {abonos.map((abono, index) => {
                return (
                  <tr>
                    <td> {index + 1}</td>
                    <td> {abono.fecha}</td>
                    <td style={{ textAlign: "center" }}> $ {abono.valor}</td>
                    <td>{abono.observacion}</td>
                    <td>
                      <Button onClick={() => eventEliminarAbono(abono)}>Eliminar</Button>
                    </td>
                  </tr>
                );
              })}
            </table>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
