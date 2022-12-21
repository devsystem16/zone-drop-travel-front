import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import API from "../../Environment/config";

const SelectTipoTransaccion = ({
  titulo,
  pathApi,
  setGlobalValue,
  globalDefaultValue = "",
  inactivo = false,
}) => {
  const [listValues, setListValues] = useState([]);
  const [defaultValue, setDefaultValue] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const EstsablecerDefault = (array) => {
    if (globalDefaultValue !== "") {
      setDefaultValue(globalDefaultValue);
      return;
    }
    array.map((obj) => {
      if (obj?.default === 1) {
        setDefaultValue(obj.descripcion);
        return;
      }
    });
  };
  const loadData = async () => {
    try {
      var response = await API.get(pathApi /*"/bancos"*/);
      setListValues(response.data);
      EstsablecerDefault(response.data);
    } catch (error) {
      alertify.error("Ocurrió un error. Al carcar los valores." + error);
      return;
    }
  };

  const handleChangeSelect = (event, dataset) => {
    setGlobalValue(JSON.parse(dataset.props.objetoAtributos));
    setDefaultValue(event.target.value);
  };

  return (
    <>
      {titulo}
      <Box sx={{ minWidth: 120 }}>
        <FormControl sx={{ m: 1, minWidth: 220 }}>
          <InputLabel id="demo-simple-select-label">******</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={defaultValue}
            label="listValues"
            onChange={handleChangeSelect}
            disabled={inactivo}
          >
            {listValues.map((obj) => {
              return (
                <MenuItem
                  objetoAtributos={JSON.stringify(obj)}
                  key={obj.id}
                  value={obj.descripcion}
                >
                  {obj.descripcion}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default SelectTipoTransaccion;
