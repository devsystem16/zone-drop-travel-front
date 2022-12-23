import * as React from "react";
import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import { RegistroTourClienteContext } from "../../../context/RegistroTourClienteContext";

import API from "../../../../../Environment/config";

import SelectBancos from "../../../../../components/SelectBancos/SelectBancos";
import SelectTipoTransaccion from "../../../../../components/SelectTipoTransaccion/SelectTipoTransaccion";
import InputMoneda from "./InputMoneda";
import alertify from "alertifyjs";
export default function IncripcionInformacionDePago({ editing = false, dataReserva }) {
  const {
    cliente,
    acompañantes,
    informacionPagos,
    setInformacionPagos,
    setBanco,
    setTipoTransaccion,
    tipoTransaccion,
    setExisteError,
  } = useContext(RegistroTourClienteContext);

  const [totalCalculado, setTotalCalculado] = useState(0);
  const [recalcularValores, setRecalcularValores] = useState(true);
  const [checkIsAgencia, setCheckIsAgencia] = useState(false);

  const calcularValor = () => {
    if (cliente?.tipoCliente === null) return;
    var valorClientePrincipal = cliente.tipoCliente.precio;
    acompañantes.map((acomp) => {
      valorClientePrincipal += acomp.tipoAcompañante.precio;
    });
    var totalDescuento =
      +informacionPagos.descuentoAgencia + +informacionPagos.descuento + +informacionPagos.abono;
    valorClientePrincipal = valorClientePrincipal - totalDescuento;
    valorClientePrincipal = valorClientePrincipal + +informacionPagos.costoAdicional;

    if (valorClientePrincipal < 0) {
      alertify.error("Error en el precio");
      setExisteError(true);
    } else {
      setExisteError(false);
    }
    setTotalCalculado(valorClientePrincipal);
  };

  useEffect(() => {
    localStorage.setItem("current_component", "component-informacion-pago");
    if (recalcularValores) {
      calcularValor();
      setRecalcularValores(false);
    }
  }, [recalcularValores]);

  const handleChangeCheck = (event) => {
    setCheckIsAgencia(event.target.checked);

    setInformacionPagos({
      ...informacionPagos,
      esAgencia: event.target.checked,
      descuentoAgencia: event.target.checked ? informacionPagos.descuentoAgencia : 0,
    });
    setRecalcularValores(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInformacionPagos({
      ...informacionPagos,
      [name]: value,
    });

    if (
      name === "descuentoAgencia" ||
      name === "descuento" ||
      name === "abono" ||
      name === "costoAdicional"
    ) {
      setRecalcularValores(true);
    }
  };

  const setValueInputMoneda = (e) => {
    console.log(e);
  };

  const widthText = "7%";
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <strong>Total Calculado: </strong> $ {totalCalculado}
      </div>
      <div>
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={informacionPagos.esAgencia} onChange={handleChangeCheck} />}
            title="Si esta reservación es recomendada por otra agencia, usted puede definir un valor de comisión para agradecimiento de la misma."
            label="Aplica Descuento por Agencia"
          />
          {informacionPagos.esAgencia ? (
            <InputMoneda
              label="$ Comisión Agencia"
              name="descuentoAgencia"
              defaultValue={informacionPagos.descuentoAgencia}
              setValue={handleChange}
            ></InputMoneda>
          ) : null}
        </FormGroup>
      </div>

      <div>
        <InputMoneda
          defaultValue={informacionPagos.descuento}
          label="Descuento"
          name="descuento"
          setValue={handleChange}
        ></InputMoneda>
        <InputMoneda
          defaultValue={informacionPagos.abono}
          label="Abono"
          name="abono"
          inactivo={editing}
          setValue={handleChange}
        ></InputMoneda>
        <div>
          <InputMoneda
            defaultValue={informacionPagos.costoAdicional}
            label="Costos Adicionales"
            name="costoAdicional"
            setValue={handleChange}
          ></InputMoneda>
          <TextField
            style={{ width: "20%" }}
            id="standard-search"
            defaultValue={informacionPagos.costoAdicionalMotivo}
            label="Motivo"
            name="costoAdicionalMotivo"
            onChange={handleChange}
            type="search"
            variant="standard"
          />
        </div>
      </div>

      <SelectTipoTransaccion
        inactivo={editing}
        titulo="Tipo de transacción"
        pathApi="/tipo-transacciones/list-select"
        setGlobalValue={setTipoTransaccion}
      ></SelectTipoTransaccion>

      {tipoTransaccion?.descripcion === "TRANSFERENCIA" ||
      tipoTransaccion?.descripcion === "DEPOSITO" ? (
        <>
          <div>
            <SelectBancos setBanco={setBanco} defaultValue="" />
          </div>
          <TextField
            id="standard-search"
            name="numeroDeposito"
            onChange={handleChange}
            label="N° Deposito"
            type="search"
            variant="standard"
          />
          <TextField
            id="standard-search"
            name="fechaDeposito"
            onChange={handleChange}
            label="Fecha Deposito"
            type="date"
            variant="standard"
          />
          <div></div>
        </>
      ) : null}

      <TextField
        style={{ width: "50%" }}
        id="standard-search"
        label="Observaciones Generales"
        name="observaciones"
        defaultValue={informacionPagos.observaciones}
        onChange={handleChange}
        type="search"
        variant="standard"
      />
    </Box>
  );
}
