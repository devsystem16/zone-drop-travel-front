import * as React from "react";
import { useState, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import ListaGenero from "./ListaGenero.js";
import { RegistroTourClienteContext } from "../../context/RegistroTourClienteContext";
import SelectTipoAcompañante from "../SelectTipoAcompañante/SelectTipoAcompañante.js";
import Loading from "../../../../components/Loading/Loading";

import { buscarCliente } from "../../../../Controllers/ClienteController";

export default function FormularioClienteTitular() {
  const { cliente, setCliente, guardarCliente } = useContext(RegistroTourClienteContext);
  const [tipoAcompañante, setTipoAcompañante] = useState({ descripcion: "adulto", id: -1 });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;

    const newValues = {
      ...cliente,
      [name]: value,
    };
    setCliente(newValues);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      find();
    }
  };
  const find = async () => {
    setIsLoading(true);
    const data = await buscarCliente(cliente.documento);
    if (data.encontro) {
      setCliente(data.cliente);
    }
    setIsLoading(false);
  };
  const handleChangeSelect = (event) => {
    const newValues = {
      ...cliente,
      tipoCliente: event.target.value,
    };
    setCliente(newValues);
    setTipoAcompañante(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { ml: 1, mt: 0.3 },
      }}
      noValidates
      autoComplete="off"
    >
      <Loading open={isLoading}></Loading>;
      <div>
        <TextField
          required
          id="standard-required"
          label="Documento"
          name="documento"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={cliente.documento}
          style={{ width: 350 }}
          defaultValue={cliente.documento}
          variant="standard"
          helperText="Ingrese una Cédula o RUC "
        />
        <Button
          variant="outlined"
          size="small"
          style={{ backgroundColor: "#1A73E8" }}
          onClick={find}
          endIcon={<SearchIcon />}
        ></Button>
      </div>
      <TextField
        required
        id="standard-required"
        label="Nombres"
        name="nombres"
        value={cliente.nombres}
        onChange={handleChange}
        style={{ width: 250 }}
        defaultValue={cliente.nombres}
        variant="standard"
        helperText="Nombres del Titular de la reserva"
      />{" "}
      <TextField
        required
        id="standard-required"
        label="Apellidos"
        name="apellidos"
        onChange={handleChange}
        style={{ width: 250 }}
        defaultValue={cliente.apellidos}
        value={cliente.apellidos}
        variant="standard"
        helperText="Apellidos del Titular de la reserva"
      />{" "}
      <div></div>
      <ListaGenero></ListaGenero>
      <SelectTipoAcompañante
        handleChange={handleChangeSelect}
        value={cliente.tipoCliente}
        ProgramacionFechaId={localStorage.getItem("programacion_fecha_id")}
      />
      <div></div>
      <TextField
        required
        id="standard-required"
        label="Fecha Nacimiento"
        name="fechaNacimiento"
        type="date"
        value={cliente.fechaNacimiento}
        onChange={handleChange}
        style={{ width: 210 }}
        defaultValue={cliente.fechaNacimiento}
        variant="standard"
        helperText="Fecha Nacimiento"
      />
      <TextField
        required
        id="standard-required"
        label="Correo"
        name="correo"
        value={cliente.correo}
        onChange={handleChange}
        style={{ width: 250 }}
        defaultValue={cliente.correo}
        variant="standard"
        helperText="Correo P. Ej: zonedroptravel@outlook.com"
      />
      <TextField
        required
        id="standard-required"
        label="Dirección"
        name="direccion"
        value={cliente.direccion}
        onChange={handleChange}
        style={{ width: 500 }}
        defaultValue={cliente.direccion}
        variant="standard"
        helperText="Dirección del Titular de la reserva"
      />
      <div></div>
      <TextField
        required
        id="standard-required"
        label="Teléfono 1"
        value={cliente.telefono1}
        name="telefono1"
        onChange={handleChange}
        style={{ width: 160 }}
        defaultValue={cliente.telefono1}
        variant="standard"
        helperText="Teléfono"
      />
      <TextField
        id="standard-required"
        label="Teléfono 2"
        name="telefono2"
        value={cliente.telefono2}
        onChange={handleChange}
        style={{ width: 160 }}
        defaultValue={cliente.telefono2}
        variant="standard"
        helperText="Teléfono 2"
      />
      <TextField
        id="standard-required"
        label="Teléfono 3"
        name="telefono3"
        onChange={handleChange}
        value={cliente.telefono3}
        style={{ width: 160 }}
        defaultValue={cliente.telefono3}
        variant="standard"
        helperText="Teléfono 3"
      />
      <TextField
        id="standard-required"
        label="Observacion"
        value={cliente.observaciones}
        name="observaciones"
        onChange={handleChange}
        style={{ width: 400 }}
        defaultValue={cliente.observaciones}
        variant="standard"
        helperText="¿Alguna observación?"
      />
      <div></div>
      <center>
        {/* <Button
          variant="outlined"
          onClick={guardarCliente}
          style={{ backgroundColor: "#1A73E8" }}
          endIcon={<SaveIcon />}
        >
          Guardar
        </Button> */}
      </center>
    </Box>
  );
}
