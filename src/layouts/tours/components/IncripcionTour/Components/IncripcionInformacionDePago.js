import * as React from "react";
import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import { RegistroTourClienteContext } from "../../../context/RegistroTourClienteContext";

import SelectBancos from "../../../../../components/SelectBancos/SelectBancos";
import SelectTipoTransaccion from "../../../../../components/SelectTipoTransaccion/SelectTipoTransaccion";
import InputMoneda from "./InputMoneda";
export default function IncripcionInformacionDePago() {
  const [precioDistribuidor, setPrecioDistribuidor] = useState(0);
  const {
    cliente,
    acompañantes,
    informacionPagos,
    setInformacionPagos,
    banco,
    setBanco,
    setTipoTransaccion,
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
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInformacionPagos({
      ...informacionPagos,
      [name]: value,
    });

    if (name === "descuentoAgencia" || name === "descuento" || name === "abono") {
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
            control={<Switch onChange={handleChangeCheck} />}
            title="Si esta reservación es recomendada por otra agencia, usted puede definir un valor de comisión para agradecimiento de la misma."
            label="Aplica Descuento por Agencia"
          />
          {checkIsAgencia ? (
            <InputMoneda
              label="$ Comisión Agencia"
              name="descuentoAgencia"
              setValue={handleChange}
            ></InputMoneda>
          ) : null}
        </FormGroup>
      </div>

      <div>
        <InputMoneda label="Descuento" name="descuento" setValue={handleChange}></InputMoneda>
        <InputMoneda label="Abono" name="abono" setValue={handleChange}></InputMoneda>
      </div>
      <div>
        <SelectBancos setBanco={setBanco} defaultValue="" />
      </div>
      <SelectTipoTransaccion
        titulo="Tipo de transacción"
        pathApi="/tipo-transacciones/list-select"
        setGlobalValue={setTipoTransaccion}
      ></SelectTipoTransaccion>

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
      <TextField
        style={{ width: "50%" }}
        id="standard-search"
        label="Observaciones"
        name="observaciones"
        onChange={handleChange}
        type="search"
        variant="standard"
      />
    </Box>
  );
}
