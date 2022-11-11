import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectMeses({ value, setValue }) {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, width: 200 }}>
      Seleccione el Mes
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={handleChange}
        >
          <MenuItem value={1}>Enero</MenuItem>
          <MenuItem value={2}>Febrero</MenuItem>
          <MenuItem value={3}>Marzo</MenuItem>
          <MenuItem value={4}>Abril</MenuItem>
          <MenuItem value={5}>Mayo</MenuItem>
          <MenuItem value={6}>Junio</MenuItem>
          <MenuItem value={7}>Julio</MenuItem>
          <MenuItem value={8}>Agosto</MenuItem>
          <MenuItem value={9}>Septiembre</MenuItem>
          <MenuItem value={10}>Octubre</MenuItem>
          <MenuItem value={11}>Noviembre</MenuItem>
          <MenuItem value={12}>Diciembre</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
