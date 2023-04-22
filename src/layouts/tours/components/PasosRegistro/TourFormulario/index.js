import * as React from "react";
import { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { TourContext } from "../../../context/TourContext";

import UploadImage from "./UploadImage";

export default function TourFormulario({ editing, dataTour }) {
  const { tour, setTour, image, setImage } = useContext(TourContext);

  const handleChange = (event) => {
    const { name, value } = event.target;

    const newValues = {
      ...tour,
      [name]: value,
    };
    setTour(newValues);
  };

  useEffect(() => {
    localStorage.setItem("current_component", "component-informacion-tour");
    if (editing) setTour(dataTour);
  }, []);

  function replaceAll(str, find, replace) {
    if (str === null) return;
    return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
  }
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
  }
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

      <UploadImage image={image} setImage={setImage}></UploadImage>
      <div>
        <TextField
          required
          id="standard-required"
          label="Titulo"
          multiline
          name="titulo"
          onChange={handleChange}
          style={{ width: 550 }}
          defaultValue={replaceAll(tour.titulo, "<br />", "\n")}
          variant="standard"
          helperText="Lugar del Tour, P. Ej: Máncora "
        />
        <TextField
          required
          id="standard-required"
          label="Duración"
          name="duracion"
          onChange={handleChange}
          defaultValue={replaceAll(tour.duracion, "<br />", "\n")}
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
          defaultValue={replaceAll(tour.detalles, "<br />", "\n")}
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
          defaultValue={replaceAll(tour.incluye, "<br />", "\n")}
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
          defaultValue={replaceAll(tour.noIncluye, "<br />", "\n")}
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
          defaultValue={replaceAll(tour.informacionAdicional, "<br />", "\n")}
          variant="standard"
          helperText="Añada aqui la información Adicional que desee, por Ej: los costos para reservar."
        />
      </div>
    </Box>
  );
}
