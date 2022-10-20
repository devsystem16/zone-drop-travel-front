import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import API from "../../Environment/config";

const SelectBancos = ({ banco, setBanco }) => {
  const [bancos, setBancos] = useState([]);

  useEffect(() => {
    cargarBancos();
  }, []);

  const cargarBancos = async () => {
    try {
      var response = await API.get("/bancos");
      setBancos(response.data);
    } catch (error) {
      alert("Ocurrió un error.", error);
      console.error(error);
      return;
    }
  };
  const handleChangeSelect = (event) => {
    setBanco(event.target.value);
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
            value={banco}
            label="Bancos"
            onChange={handleChangeSelect}
          >
            {bancos.map((banc) => {
              return (
                <MenuItem key={banc.id} value={banc.id}>
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
