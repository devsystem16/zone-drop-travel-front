import * as React from "react";
import { useState, useEffect, useContext } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import API from "../../../../../Environment/config";

export default function SeleccionLugaresSalida({ setValues, editing = false, dataReserva }) {
  const [lugaresSalidaTour, setLugaresSalidaTour] = useState([]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event) => {
    // alert(JSON.stringify(event.target.value));
    setValue(event.target.value);
    setValues(event.target.value);
  };

  useEffect(() => {
    localStorage.setItem("current_component", "component-lugares-salida");
    cargarLugaresSalidaTour();
    if (editing) {
      loadLugarSalidaDefault();
    }
  }, []);
  const cargarLugaresSalidaTour = async () => {
    try {
      var response = await API.get("/lugar-salida-tour/obtener/" + localStorage.getItem("tour_id"));
      setLugaresSalidaTour(response.data);
    } catch (error) {
      alert("Ocurrió un error.", error);
      console.error(error);
      return;
    }
  };

  const loadLugarSalidaDefault = async () => {
    try {
      var response = await API.get("/reserva/lugar-salida/obtener/" + dataReserva.id);
      // alert(JSON.stringify(response.data));
      setValue(response.data.lugar_salida_tours_id);
      setValues(response.data.lugar_salida_tours_id);
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
