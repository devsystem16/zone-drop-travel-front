import * as React from "react";
import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { TourContext } from "../../../context/TourContext";

export default function TourFormulario() {
  const { tour, setTour } = useContext(TourContext);

  const [titulo, setTitulo] = useState("");
  const [duracion, setDuracion] = useState("");
  const [detalles, setDetalles] = useState("");
  const [incluye, setIncluye] = useState("");
  const [noIncluye, setNoincluye] = useState("");
  const [informacionAdicional, setInformacionAdicional] = useState("");

  const handleChange = (event) => {
    const { name , value  } = event.target;

    const newValues = {
      ...tour,
      [name]: value,
    };
    setTour(newValues);

  };


  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div></div>

      <div>
        <TextField
          required
          id="standard-required"
          label="Titulo"
          multiline
          name="titulo"
          onChange={handleChange}
          //onChange={(e) => setTitulo(e.target.value)}
          style={{ width: 550 }}
          defaultValue=""
          variant="standard"
          helperText="Lugar del Tour, P. Ej: Máncora "
        />
        <TextField
          required
          id="standard-required"
          label="Duracion"
          name="duracion"
          onChange={handleChange}
          //onChange={(e) => setDuracion(e.target.value)}
          multiline
          style={{ width: 230 }}
          defaultValue=""
          variant="standard"
          helperText="Duración del Tour, P. Ej: 2 días."
        />
        <div></div>
        <TextField
          required
          id="standard-required"
          label="Detalles"
          name="detalles"
          onChange={handleChange}
          //onChange={(e) => setDetalles(e.target.value)}
          multiline
          style={{ width: 800 }}
          defaultValue=""
          variant="standard"
          helperText="Describa brevemente lo que el cliente disfrutará del tour."
        />
        <TextField
          required
          id="standard-required"
          label="Incluye"
          multiline
          name="incluye"
          onChange={handleChange}
          //onChange={(e) => setIncluye(e.target.value)}
          style={{ width: 400 }}
          defaultValue=""
          variant="standard"
          helperText="¿Qué se incluye en el Tour? P. Ej: Transporte, Seguro, etc."
        />
        <TextField
          required
          id="standard-required"
          label="No Incluye"
          name="noIncluye"
          onChange={handleChange}
          //onChange={(e) => setNoincluye(e.target.value)}
          multiline
          style={{ width: 400 }}
          defaultValue="12345"
          variant="standard"
          helperText="¿Qué NO incluye en el Tour? P. Ej: Gastos personales, Comidas extras, etc."
        />
        <div></div>
        <TextField
          required
          id="standard-required"
          label="Información Adicional"
          multiline
          name="informacionAdicional"
          onChange={handleChange}
          //onChange={(e) => setInformacionAdicional(e.target.value)}
          style={{ width: 800 }}
          defaultValue=""
          variant="standard"
          helperText="Añada aqui la información Adicional que desee, por Ej: los costos para reservar."
        />
      </div>
    </Box>
  );
}