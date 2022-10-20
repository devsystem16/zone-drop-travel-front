import React, { useEffect, useState } from "react";
import API from "../../../../Environment/config";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

const SelectTipoAcompañante = ({ handleChange, value, ProgramacionFechaId }) => {
  const [listTipoAcompañante, setListTipoAcompañante] = useState([]);

  useEffect(() => {
    cargarTiposAcompañantePrecio();
  }, []);

  const cargarTiposAcompañantePrecio = async () => {
    try {
      var response = await API.get("/costo-tour/obtener-precios/" + ProgramacionFechaId);
      setListTipoAcompañante(response.data);
    } catch (error) {
      alert("Ocurrió un error.", error);
      console.error(error);
      return;
    }
  };

  return (
    <div>
      <TextField
        id="standard-select-currency"
        select
        label="Tipo de Acompañante"
        value={value}
        onChange={handleChange}
        defaultValue={value}
        helperText="El tipo de acompañante define el precio."
        variant="standard"
      >
        {listTipoAcompañante.map((option) => (
          <MenuItem key={option.id} value={option}>
            {`${option.descripcion} $ ${option.precio}`}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default SelectTipoAcompañante;
