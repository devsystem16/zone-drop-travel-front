import * as React from "react";
import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { TourContext } from "../../../context/TourContext";

export default function TourFormulario() {
  const { tour, setTour } = useContext(TourContext);

 
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
          
          style={{ width: 550 }}
          defaultValue={tour.titulo}
          variant="standard"
          helperText="Lugar del Tour, P. Ej: Máncora "
        />
        <TextField
          required
          id="standard-required"
          label="Duracion"
          name="duracion"
          onChange={handleChange}
          defaultValue={tour.duracion}
          multiline
          style={{ width: 230 }}
          
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
          defaultValue={tour.detalles}
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
          defaultValue={tour.incluye}
          variant="standard"
          helperText="¿Qué se incluye en el Tour? P. Ej: Transporte, Seguro, etc."
        />
        <TextField
          required
          id="standard-required"
          label="No Incluye"
          name="noIncluye"
          onChange={handleChange}
          
          multiline
          style={{ width: 400 }}
          defaultValue={tour.noIncluye}
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
          defaultValue={tour.informacionAdicional}
          variant="standard"
          helperText="Añada aqui la información Adicional que desee, por Ej: los costos para reservar."
        />
      </div>
    </Box>
  );
}
