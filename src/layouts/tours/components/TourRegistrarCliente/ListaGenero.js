import * as React from "react";
import { useContext } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { RegistroTourClienteContext } from "../../context/RegistroTourClienteContext";

export default function ListaGenero() {
  const { cliente, setCliente } = useContext(RegistroTourClienteContext);

  const handleRadioChange = (event) => {
    const newValues = {
      ...cliente,
      ["genero"]: event.target.value,
    };
    setCliente(newValues);
  };

  return (
    <FormControl>
      <FormLabel style={{ fontSize: 15 }} id="demo-row-radio-buttons-group-label">
        Genero
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue="Masculino"
        onChange={handleRadioChange}
      >
        <FormControlLabel value="Masculino" control={<Radio />} label="Masculino" />
        <FormControlLabel value="Femenino" control={<Radio />} label="Femenino" />
        <FormControlLabel value="Otro" control={<Radio />} label="Otro" />
      </RadioGroup>
    </FormControl>
  );
}
