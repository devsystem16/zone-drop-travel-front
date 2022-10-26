import * as React from "react";
import { useState, useEffect, useContext } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import API from "../../../../../Environment/config";

export default function SeleccionLugaresSalida({ setValues }) {
  const [lugaresSalidaTour, setLugaresSalidaTour] = useState([]);

  const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
    setValues(event.target.value);
  };

  useEffect(() => {
    localStorage.setItem("current_component", "component-lugares-salida");
    cargarLugaresSalidaTour();
  }, []);
  const cargarLugaresSalidaTour = async () => {
    try {
      var response = await API.get("/lugar-salida-tour/obtener/2");
      setLugaresSalidaTour(response.data);
    } catch (error) {
      alert("Ocurrió un error.", error);
      console.error(error);
      return;
    }
  };

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Lugar de Salida</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        {lugaresSalidaTour.map((lugar) => {
          return (
            <FormControlLabel
              key={lugar.id}
              value={lugar.id}
              control={<Radio />}
              label={`${lugar.descripcion} (${lugar.hora})`}
            />
          );
        })}
        {/* <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" /> */}
      </RadioGroup>
    </FormControl>
  );
}
