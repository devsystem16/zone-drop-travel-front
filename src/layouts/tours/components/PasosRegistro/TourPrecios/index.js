import React, { createContext, useState, useEffect, useContext } from "react";

import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";

import { TourContext } from "../../../context/TourContext";

const TourPrecios = () => {
  const { precios, setPrecios } = useContext(TourContext);

  const handleChange = (event) => {
    const { name, value } = event.target;

    const newValues = {
      ...precios,
      [name]: value,
    };
    setPrecios(newValues);
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
        <TextField
          id="standard-disabled"
          label="Adultos"
          name="adultos"
          onChange={handleChange}
          defaultValue={precios.adultos}
          variant="standard"
          style={{ width: 200 }}
        />
        <TextField
          id="standard-disableds"
          name="ninios"
          label="Niños"
          onChange={handleChange}
          defaultValue={precios.ninios}
          variant="standard"
          style={{ width: 200 }}
        />
        <TextField
          id="standard-disableds"
          name="terceraEdad"
          label="3era Edad & Discapacitados"
          defaultValue={precios.terceraEdad}
          onChange={handleChange}
          variant="standard"
          style={{ width: 200 }}
        />
        <TextField
          id="standard-disableds"
          label="infantes"
          name="infantes"
          variant="standard"
          defaultValue={precios.infantes}
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
