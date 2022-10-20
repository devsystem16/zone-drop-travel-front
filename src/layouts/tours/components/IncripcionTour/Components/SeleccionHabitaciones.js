import * as React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import API from "../../../../../Environment/config";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SeleccionHabitaciones({ setValues }) {
  const [personName, setPersonName] = React.useState([]);

  const [habitaciones, setHabitaciones] = useState([]);

  // const [valores, setValores] = useState({ id: 0, descri: "" });
  useEffect(() => {
    cargarHabitaciones();
  }, []);
  const cargarHabitaciones = async () => {
    try {
      var response = await API.get("/habitacion");
      setHabitaciones(response.data);
    } catch (error) {
      alert("Ocurrió un error.", error);
      console.error(error);
      return;
    }
  };
  const handleChange = (event) => {
    var codigo = event.explicitOriginalTarget.attributes.codigo.value;
    const {
      target: { value },
    } = event;
    // console.log("REVSAR", value);

    // var newss = {
    //   id: codigo,
    //   descri: value[0],
    // };
    // setValores({ ...valores, newss });

    setPersonName(typeof value === "string" ? value.split(",") : value);
    setValues(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">HABITACIONES</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {habitaciones.map((habitacion) => (
            <MenuItem
              key={habitacion.id}
              codigo={habitacion.id}
              value={`${habitacion.descripcion}`}
            >
              {habitacion.descripcion}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
