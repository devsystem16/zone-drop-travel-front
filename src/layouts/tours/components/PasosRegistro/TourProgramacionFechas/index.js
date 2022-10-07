import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
    </Box>
  );
};

export default TourProgramacionFechas;
