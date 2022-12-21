import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import API from "../../Environment/config";

const SelectBancos = ({ setBanco, defaultValue = "" }) => {
  const [bancos, setBancos] = useState([]);
  const [defaultBank, setDefaultBank] = useState("");

  useEffect(() => {
    cargarBancos();
  }, []);

  const EstsablecerBancoDefault = (array) => {
    if (defaultValue !== "") {
      setDefaultBank(defaultValue);
      return;
    }
    array.map((obj) => {
      if (obj.default === 1) {
        setDefaultBank(obj.descripcion);
        return;
      }
    });
  };
  const cargarBancos = async () => {
    try {
      var response = await API.get("/bancos");
      setBancos(response.data);
      EstsablecerBancoDefault(response.data);
    } catch (error) {
      alertify.error("Ocurrió un error. Al carcar los bancos." + error);
      return;
    }
  };
  const handleChangeSelect = (event, dataset) => {
    console.log(JSON.parse(dataset.props.objetoAtributos));
    setBanco(JSON.parse(dataset.props.objetoAtributos));
    setDefaultBank(event.target.value);
  };

  return (
    <>
      Bancos
      <Box sx={{ minWidth: 120 }}>
        <FormControl sx={{ m: 1, minWidth: 220 }}>
          <InputLabel id="demo-simple-select-label">******</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={defaultBank}
            label="Bancos"
            onChange={handleChangeSelect}
          >
            {bancos.map((banc) => {
              return (
                <MenuItem
                  objetoAtributos={JSON.stringify(banc)}
                  key={banc.id}
                  value={banc.descripcion}
                >
                  {banc.descripcion}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default SelectBancos;
