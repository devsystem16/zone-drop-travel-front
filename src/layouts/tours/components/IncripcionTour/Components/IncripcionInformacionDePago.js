import * as React from "react";
import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import { RegistroTourClienteContext } from "../../../context/RegistroTourClienteContext";

import SelectBancos from "../../../../../components/SelectBancos/SelectBancos";

export default function IncripcionInformacionDePago() {
  const { cliente, acompañantes, informacionPagos, setInformacionPagos, banco, setBanco } =
    useContext(RegistroTourClienteContext);

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
    if (recalcularValores) {
      calcularValor();
      setRecalcularValores(false);
    }
  }, [recalcularValores]);

  const handleChangeCheck = (event) => {
    setCheckIsAgencia(event.target.checked);
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
            <TextField
              id="standard-search"
              required
              name="descuentoAgencia"
              onChange={handleChange}
              label="$ Comisión Agencia"
              type="search"
              variant="standard"
            />
          ) : null}
        </FormGroup>
      </div>

      <div>
        <TextField
          style={{ width: widthText }}
          id="standard-search"
          label="Descuento"
          name="descuento"
          onChange={handleChange}
          type="search"
          variant="standard"
        />
        <TextField
          style={{ width: widthText }}
          id="standard-search"
          label="Abono"
          name="abono"
          onChange={handleChange}
          type="search"
          variant="standard"
        />
      </div>
      <div>
        <SelectBancos banco={banco} setBanco={setBanco} />
      </div>
      <TextField
        id="standard-search"
        name="tipoTransaccion"
        onChange={handleChange}
        label="Tipo Transaccion"
        type="search"
        variant="standard"
      />
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
