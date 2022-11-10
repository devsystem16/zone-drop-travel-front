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

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import "./style.css";
import API from "../../Environment/config";

export default function ModalListadoAcompañantes({ open, setOpen, setReload, acompañantes }) {
  const [openLoading, setOpenLoading] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const eventEliminarAcompañante = async (acompañante) => {
    var response = null;
    setOpenLoading(true);
    try {
      response = await API.post("/detalle-reserva/eliminar/" + acompañante.id);
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
        <DialogTitle id="alert-dialog-title">{"Listado de acompañantes"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            El titular aparecerá marcado.
            <table id="customers" border="1" style={{ borderCollapse: "collapse" }}>
              <tr style={{ margin: 5 }}>
                <th>N°</th>
                <th>Documento</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Categoria</th>
                <th>Costo</th>
                <th>Acciones</th>
              </tr>

              {acompañantes.map((acompañante, index) => {
                if (acompañante.tipo_cliente !== "Titular")
                  return (
                    <RowTable
                      setReload={setReload}
                      index={index}
                      acompañante={acompañante}
                      isTitular={false}
                      eventDelete={eventEliminarAcompañante}
                    ></RowTable>
                  );
                else
                  return (
                    <RowTable
                      eventDelete={eventEliminarAcompañante}
                      index={index}
                      acompañante={acompañante}
                      isTitular={true}
                    ></RowTable>
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

const RowTable = ({ acompañante, isTitular, index, eventDelete }) => {
  const backgroundColor = isTitular ? "#42424a" : "white";
  const color = isTitular ? "white" : "black";
  const title = isTitular ? "Titular que realizó la reserva" : "Acompañante";

  return (
    <tr title={title} style={{ backgroundColor: backgroundColor, color: color }}>
      <td> {index + 1}</td>
      <td> {acompañante.documento}</td>
      <td>
        <div style={{ paddingLeft: 10, paddingRight: 10 }}>{acompañante.nombres}</div>
      </td>
      <td>
        <div style={{ paddingLeft: 10, paddingRight: 10 }}>{acompañante.apellidos}</div>
      </td>
      <td> {acompañante.categoria}</td>
      <td style={{ textAlign: "center" }}>
        <div style={{ paddingLeft: 10, paddingRight: 10 }}>$ {acompañante.precio}</div>
      </td>

      {isTitular ? null : (
        <td style={{ textAlign: "center" }}>
          <IconButton
            onClick={() => eventDelete(acompañante)}
            title="Eliminar"
            aria-label="delete"
            size="small"
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </td>
      )}

      {/* <td>
        <Button onClick={() => eventEliminarAbono(abono)}>Eliminar</Button>
      </td> */}
    </tr>
  );
};
