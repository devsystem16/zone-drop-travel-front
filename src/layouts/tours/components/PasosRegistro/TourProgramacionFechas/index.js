import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Test from "./Test";
import Calendar from "../../Calendar";

const TourProgramacionFechas = () => {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      Fechas
      <Calendar />
      <div>
        <TextField
          id="standard-disabled"
          label="Adultos"
          defaultValue="0"
          variant="standard"
          style={{ width: 200 }}
        />
        <TextField
          id="standard-disableds"
          label="Niños"
          defaultValue="0"
          variant="standard"
          style={{ width: 200 }}
        />
        <TextField
          id="standard-disableds"
          label="3era Edad & Discapacitados"
          defaultValue="0"
          variant="standard"
          style={{ width: 200 }}
        />
        <TextField
          id="standard-disableds"
          label="infantes"
          defaultValue="0"
          variant="standard"
          style={{ width: 200 }}
        />
      </div>
      {/* <Button variant="secondary" endIcon={<SendIcon />}>
        Añadir
      </Button> */}
      {/* <Test /> */}
    </Box>
  );
};

export default TourProgramacionFechas;
