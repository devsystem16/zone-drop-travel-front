import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import API from "../../../../../Environment/config";
import ModalSelectCantidadHabitacion from "./ModalSelectCantidadHabitacion";
import { RegistroTourClienteContext } from "../../../context/RegistroTourClienteContext";

import FormHelperText from "@mui/material/FormHelperText";

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

export default function SeleccionHabitaciones({ setValues, editing = false, dataReserva = [] }) {
  const [habitacionName, setHabitacionName] = React.useState([]);

  const [habitaciones, setHabitaciones] = useState([]);
  const [open, setOpen] = React.useState(false);

  const [currentHabitacion, setCurrentHabitacion] = React.useState("");
  const [listHabitaciones, setListHabitaciones] = useState([]);

  const { habitcionesEliminadas, setHabitacionesEliminadas } = useContext(
    RegistroTourClienteContext
  );

  const handleChangeSelect = (event) => {
    if (existeHabitacion(event.target.value, listHabitaciones)) {
      alertify.error("Ya Existe la habitacion.");
      return;
    }
    if (event.target.value === "No Aplica") {
      setCurrentHabitacion(event.target.value);

      var habitacionNoAplica = {
        tipo: event.target.value,
        cantidad: 0,
      };

      setValues([habitacionNoAplica]);
      setListHabitaciones([]);
      setHabitacionesEliminadas([]);

      // alert(JSON.stringify(habitacionNoAplica));

      return;
    }
    setOpen(true);
    setCurrentHabitacion(event.target.value);
  };

  const existeHabitacion = (habitacion, listado) => {
    var estado = false;
    listado.map((obj) => {
      if (habitacion === obj.tipo) estado = true;
    });
    return estado;
  };
  // const [valores, setValores] = useState({ id: 0, descri: "" });
  useEffect(() => {
    cargarHabitaciones();
    if (editing) {
      obtenerHabitacionesBD(dataReserva.id);

      setHabitacionesEliminadas([]);
    }
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

  const obtenerHabitacionesBD = async (id) => {
    const response = await API.get("reserva/habitaciones/obtener/" + id);

    setListHabitaciones(response.data);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setHabitacionName(value);
    // setHabitacionNameTEMP(value);
    // if (value.length > habitacionNameTEMP.length) {
    //   setOpen(true);
    // } else {
    //   setHabitacionName(value);
    // }

    // alert("value.len ->" + value.length);
    // alert("TEMP ->" + habitacionNameTEMP.length);
    // alert("NORM ->" + habitacionName.length);

    // setCurrentHabitacion(value[0]);
    // setPersonName(typeof value === "string" ? value.split(",") : value);
    // setValueHabitacion(value);

    setValues(typeof value === "string" ? value.split(",") : value);
  };

  const eliminarHabitacionListado = (habitacion) => {
    if (habitacion?.existente) {
      setHabitacionesEliminadas([...habitcionesEliminadas, habitacion]);
    }

    const filteredLibraries = listHabitaciones.filter((item) => item.tipo !== habitacion.tipo);

    setListHabitaciones(filteredLibraries);
    setValues(filteredLibraries);
  };

  return (
    <div>
      <ModalSelectCantidadHabitacion
        currentHabitacion={currentHabitacion}
        setListHabitaciones={setListHabitaciones}
        listHabitaciones={listHabitaciones}
        open={open}
        setOpen={setOpen}
        setValues={setValues}
        editing={editing}
      />

      <FormControl sx={{ m: 1, width: 300 }}>
        {/* <InputLabel id="demo-multiple-chip-label">HABITACIONES</InputLabel> */}

        <div>
          <FormControl sx={{ m: 1, minWidth: 220 }}>
            <Select
              value={currentHabitacion}
              onChange={handleChangeSelect}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}

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
            <FormHelperText>Seleccione una habitacion</FormHelperText>
          </FormControl>
        </div>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {listHabitaciones.map((habitacion) => {
            return (
              <Chip
                key="data"
                label={`(${habitacion.cantidad}) ${habitacion.tipo}`}
                onDelete={() => eliminarHabitacionListado(habitacion)}
              />
            );
          })}
        </Box>
      </FormControl>
    </div>
  );
}
