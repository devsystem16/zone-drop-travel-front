import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";

const options = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];

export default function ModalSelectCantidadHabitacion({
  setOpen,
  open,
  currentHabitacion,
  listHabitaciones,
  setListHabitaciones,
  setValues,
  editing = false,
}) {
  const [value, setValue] = React.useState("1");
  const radioGroupRef = React.useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    var dato = {
      tipo: currentHabitacion,
      cantidad: value,
    };
    setListHabitaciones([
      ...listHabitaciones,
      {
        tipo: currentHabitacion,
        cantidad: value,
      },
    ]);
    setValues([
      ...listHabitaciones,
      {
        tipo: currentHabitacion,
        cantidad: value,
      },
    ]);
    setOpen(false);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          Cantidad de Habitaciones <br />
          <center> {currentHabitacion}</center>
        </DialogTitle>

        <DialogContent>
          <DialogContent dividers>
            <RadioGroup
              ref={radioGroupRef}
              aria-label="ringtone"
              name="ringtone"
              value={value}
              onChange={handleChange}
            >
              {options.map((option) => (
                <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
              ))}
            </RadioGroup>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Aceptar</Button> */}
          <Button onClick={handleClose} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
