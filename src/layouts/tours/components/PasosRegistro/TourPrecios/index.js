import React, { createContext, useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { TourContext } from "../../../context/TourContext";

const TourPrecios = () => {
  const { precios, setPrecios } = useContext(TourContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    let codigo = event.target.offsetParent.offsetParent.attributes.identificador.value;
    setPrecios({
      ...precios,
      [name]: {
        id: codigo,
        valor: value,
      },
    });
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
      <div>
        <div>
          Añada el precio que se le cobrará a los acompañantes según el tipo. Si coloca 0, no aplica
          cobro. <br /> <br />
        </div>

        <TextField
          id="standard-disabled"
          label="Adultos"
          identificador="1"
          name="adultos"
          onChange={handleChange}
          defaultValue={precios.adultos.valor}
          variant="standard"
          style={{ width: 200 }}
        />
        <TextField
          id="standard-disableds"
          identificador="2"
          name="ninios"
          label="Niños"
          onChange={handleChange}
          defaultValue={precios.niños.valor}
          variant="standard"
          style={{ width: 200 }}
        />
        <TextField
          id="standard-disableds"
          name="terceraEdad"
          identificador="3"
          label="3era Edad & Discapacitados"
          defaultValue={precios.terceraEdad.valor}
          onChange={handleChange}
          variant="standard"
          style={{ width: 200 }}
        />
        <TextField
          id="standard-disableds"
          identificador="4"
          label="infantes"
          name="infantes"
          variant="standard"
          defaultValue={precios.infantes.valor}
          onChange={handleChange}
          style={{ width: 200 }}
        />
      </div>
      {/* <Button variant="secondary" endIcon={<SendIcon />}>
        Añadir
      </Button> */}
      {/* <Test /> */}
    </Box>
  );
};

export default TourPrecios;
