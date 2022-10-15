import * as React from "react";
import { useState } from "react";

import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
const ariaLabel = { "aria-label": "description" };

export default function FormularioClienteTitular() {
  const [cliente, setCliente] = useState({
    documento: "",
    nombres: "",
    apellidos: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    const newValues = {
      ...cliente,
      [name]: value,
    };
    setCliente(newValues);
  };

  const buscarCliente = (text) => {};
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
      }}
      noValidates
      autoComplete="off"
    >
      <div>
        <Input
          defaultValue={cliente.documento}
          onchange={handleChange}
          placeholder="Cédula/Rsuc"
          inputProps={ariaLabel}
          name="documento"
        />{" "}
        <Button
          variant="outlined"
          size="small"
          style={{ backgroundColor: "#1A73E8" }}
          endIcon={<SearchIcon />}
        ></Button>
      </div>
      <Input disabled placeholder="Nombres" inputProps={ariaLabel} />
      <Input disabled placeholder="Apellidos" defaultValue="" inputProps={ariaLabel} />
      <div>
        <Input disabled placeholder="Fecha Nacimiento" defaultValue="" inputProps={ariaLabel} />
        <Input disabled placeholder="Correo" defaultValue="" inputProps={ariaLabel} />
      </div>
      {/* <Input disabled defaultValue="" error inputProps={ariaLabel} /> */}
    </Box>
  );
}
