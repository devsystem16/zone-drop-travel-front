import * as React from "react";
import { useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import FormularioClienteTitular from "./FormularioClienteTitular";

import { RegistroTourClienteContext } from "../../context/RegistroTourClienteContext";

import StepsIncripcionTour from "../IncripcionTour/StepsIncripcionTour";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalNuevaReserva() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { modalTourRegistroCliente, setModalTourRegistroCliente } = useContext(
    RegistroTourClienteContext
  );

  const handleClickOpen = () => {
    setModalTourRegistroCliente(true);
  };

  const handleClose = (event, reason) => {
    if (reason && reason == "backdropClick") return;

    setModalTourRegistroCliente(false);
  };

  return (
    <div>
      <Dialog
        fullScreen={true}
        disableclo
        open={modalTourRegistroCliente}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Nueva Reserva
            </Typography>
            <Button autoFocus color="error" onClick={handleClose}>
              Cerrar
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <center>{/* <h2>Registro de TOUR</h2> */}</center>

          <StepsIncripcionTour></StepsIncripcionTour>
          {/* <FormularioClienteTitular></FormularioClienteTitular> */}
        </List>
      </Dialog>
    </div>
  );
}
