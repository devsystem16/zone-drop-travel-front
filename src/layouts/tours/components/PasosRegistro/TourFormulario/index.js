import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function TourFormulario() {
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
      <div></div>
      <div>
        <TextField
          required
          id="standard-required"
          label="Titulo"
          multiline
          style={{ width: 550 }}
          defaultValue=""
          variant="standard"
          helperText="Lugar del Tour, P. Ej: Máncora "
        />
        <TextField
          required
          id="standard-required"
          label="Duracion"
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
          style={{ width: 400 }}
          defaultValue=""
          variant="standard"
          helperText="¿Qué se incluye en el Tour? P. Ej: Transporte, Seguro, etc."
        />
        <TextField
          required
          id="standard-required"
          label="No Incluye"
          multiline
          style={{ width: 400 }}
          defaultValue=""
          variant="standard"
          helperText="¿Qué NO incluye en el Tour? P. Ej: Gastos personales, Comidas extras, etc."
        />
        <div></div>
        <TextField
          required
          id="standard-required"
          label="Información Adicional"
          multiline
          style={{ width: 800 }}
          defaultValue=""
          variant="standard"
          helperText="Añada aqui la información Adicional que desee, por Ej: los costos para reservar."
        />
      </div>
    </Box>
  );
}
