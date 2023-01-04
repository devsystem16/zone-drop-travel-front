import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import moment from "moment";

export default function SelectAño({ value, setValue }) {
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  moment().subtract(0, "year").year();

  return (
    <Box sx={{ minWidth: 120, width: 200, margin: 0, padding: 0 }}>
      Año
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={handleChange}
        >
          <MenuItem value={moment().subtract(1, "year").year()}>
            {moment().subtract(1, "year").year()}
          </MenuItem>
          <MenuItem value={moment().year()}> {moment().year()}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
