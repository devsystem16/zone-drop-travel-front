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

import API from "../../Environment/config";

export default function ModalAbonar({ open, setOpen, setReload }) {
  const [openLoading, setOpenLoading] = React.useState(false);

  const [banco, setBanco] = useState({ id: 1 });
  const [numeroDeposito, setNumeroDeposito] = useState("");
  const [abono, setAbono] = useState(0);
  const [tipoTransaccion, setTipoTransaccion] = useState({ id: 2 });
  const [fecha, setFecha] = useState(moment().format("yyyy-MM-DD"));
  const [observacion, setObservacion] = useState("");

  const handleClose = () => {
    setOpen(false);
  };
  var datos = JSON.parse(localStorage.getItem("abonoDatos"));

  //   alert(JSON.stringify(datos));
  //   alert(datos.reserva_id);
  const guardarAbono = async () => {
    datos = {
      reserva_id: datos?.reserva_id,
      banco_id: banco?.id,
      tipo_transaccion_id: tipoTransaccion.id,
      valor: abono,
      fecha: fecha,
      observacion: observacion,
      numerodeposito: numeroDeposito,
      estado: true,
    };

    var response = null;
    setOpenLoading(true);
    try {
      response = await API.post("/abono", datos);
    } catch (error) {
      console.log(error);
    }

    setOpenLoading(false);

    if (response.status !== 201) {
      alertify.error("Ocurrió un error al procesar el pago, intente nuevamente.");
      return;
    }
    alertify.success("Pago registrado correctamente.");
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
        <DialogTitle id="alert-dialog-title">{"Realizar un nuevo Abono"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div>
              {`El cliente [${datos?.nombres}] ha abonado $ ${datos?.abonado} de un total de   $ ${datos?.total} `}
            </div>
            <SelectTipoTransaccion
              titulo="Tipo de transacción"
              pathApi="/tipo-transacciones/list-select"
              setGlobalValue={setTipoTransaccion}
            ></SelectTipoTransaccion>

            {tipoTransaccion?.descripcion === "TRANSFERENCIA" ||
            tipoTransaccion?.descripcion === "DEPOSITO" ? (
              <SelectBancos setBanco={setBanco} defaultValue="" />
            ) : null}

            <div>
              <TextField
                id="standard-disabled"
                label="Fecha"
                type="date"
                name="txtAbono"
                onChange={(event) => setFecha(event.target.value)}
                defaultValue={fecha}
                value={fecha}
                variant="standard"
                style={{ width: 200 }}
              />
            </div>
            <TextField
              id="standard-disabled"
              label="Valor abono"
              placeholder="$0"
              name="txtAbono"
              onChange={(event) => setAbono(event.target.value)}
              //   onChange={(event) => handleChange(event, tipo.id)}
              //   defaultValue={editing ? tiposAcompañantes.precio : 0}
              // value={editing ? tipo.precio : 0}
              variant="standard"
              style={{ width: 200 }}
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
            />

            {tipoTransaccion?.descripcion === "TRANSFERENCIA" ||
            tipoTransaccion?.descripcion === "DEPOSITO" ? (
              <div>
                <TextField
                  id="standard-disabled"
                  label="N° Deposito / Referencia"
                  placeholder=""
                  name="txtNumeroDeposito"
                  onChange={(event) => setNumeroDeposito(event.target.value)}
                  //   onChange={(event) => handleChange(event, tipo.id)}
                  //   defaultValue={editing ? tiposAcompañantes.precio : 0}
                  // value={editing ? tipo.precio : 0}
                  variant="standard"
                  style={{ width: 200 }}
                />
              </div>
            ) : null}

            <div>
              <TextField
                id="standard-disabled"
                label="Observación"
                name="txtAbono"
                onChange={(event) => setObservacion(event.target.value)}
                //   defaultValue={editing ? tiposAcompañantes.precio : 0}
                // value={editing ? tipo.precio : 0}
                variant="standard"
                style={{ width: 200 }}
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={guardarAbono} autoFocus>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
