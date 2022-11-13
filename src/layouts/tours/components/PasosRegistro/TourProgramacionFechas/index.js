import React, { useState } from "react";
import Box from "@mui/material/Box";
import Calendar from "../../Calendar";
import MDOption from "../../../../../components/MDOption/MDoption";
import moment from "moment";
import Stack from "@mui/material/Stack";
const TourProgramacionFechas = ({ editing, dataTour }) => {
  const [fechas, setFechas] = useState(dataTour?.programacionFechas);
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      style={{ height: "20ch" }}
      noValidate
      autoComplete="off"
    >
      Fechas
      <Calendar editing={editing} dataTour={dataTour} />
      <Stack direction="row" spacing={1}>
        {editing ? <FechasGuardadas fechas={fechas}></FechasGuardadas> : null}
      </Stack>
    </Box>
  );
};

export default TourProgramacionFechas;

const FechasGuardadas = ({ fechas }) => {
  return fechas.map((fecha) => {
    return <MDOption label={`📆 ${moment(fecha.fecha).format("MMMM, D")}`}></MDOption>;
  });
};
