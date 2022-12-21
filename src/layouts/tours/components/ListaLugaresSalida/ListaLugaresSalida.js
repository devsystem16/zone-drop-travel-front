import React, { useState, useContext, Fragment } from "react";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { TourContext } from "../../context/TourContext";

const filter = createFilterOptions();

export default function ListaLugaresSalida({ lugaresSalida }) {
  const { listLugaresSalida, setListLugaresSalida } = useContext(TourContext);
  const [value, setValue] = useState(null);
  const [open, toggleOpen] = useState(false);

  const [dialogValue, setDialogValue] = useState({
    id: -1,
    descripcion: "",
    hora: "00:00",
    new: false,
  });

  const handleClose = () => {
    setDialogValue({ id: "", descripcion: "", hora: "00:00", new: false });
    toggleOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (dialogValue.hora === undefined) {
      alertify.error("Hora de salida NO especificada.");
      return;
    }
    setValue({
      descripcion: dialogValue.descripcion,
      id: dialogValue.id,
      hora: dialogValue.hora,
      new: dialogValue.new,
    });

    setListLugaresSalida([
      ...listLugaresSalida,
      {
        id: dialogValue.id,
        descripcion: dialogValue.descripcion,
        hora: dialogValue.hora,
        new: dialogValue.new,
      },
    ]);
    handleClose();
  };

  return (
    <Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          // alert(JSON.stringify(newValue));
          if (typeof newValue === "string") {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                id: newValue.id,
                descripcion: newValue,
                hora: "",
              });
            });
          } else if (newValue && newValue.inputValue) {
            // alert("Añadir nuevo");
            toggleOpen(true);
            setDialogValue({
              id: -1,
              descripcion: newValue.inputValue,
              hora: "",
              new: true,
            });
          } else {
            // alert(JSON.stringify(newValue));
            // Añadir nuevo lugar de salida Existente (Solo colocar la hora).
            if (newValue !== null) {
              setDialogValue({
                descripcion: newValue.descripcion,
                hora: newValue.hora,
                id: newValue.id,
                new: false,
              });
              toggleOpen(true);
            }

            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              descripcion: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={lugaresSalida}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.descripcion;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option.descripcion}</li>}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Lugares de Salidas" />}
      />

      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Nuevo Lugar de salida</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {dialogValue.new && (
                <>¿No existe este lugar de salida? {<br></br>}¡Por favor, añádelo! </>
              )}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              disabled={!dialogValue.new}
              style={{ width: 500 }}
              id="name"
              value={dialogValue.descripcion}
              onChange={(event) => {
                setDialogValue({
                  ...dialogValue,
                  descripcion: event.target.value,
                });
              }}
              label="Descripción"
              type="text"
              variant="standard"
            />

            <TextField
              margin="dense"
              id="name"
              style={{ width: 70 }}
              value={dialogValue.hora}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  hora: event.target.value,
                })
              }
              label="Hora Salida"
              type="time"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit">Añadir</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
}
