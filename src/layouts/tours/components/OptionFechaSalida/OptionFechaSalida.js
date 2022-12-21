import * as React from "react";
import { useContext } from "react";
import { redirect, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Chip from "@mui/material/Chip";
import moment from "moment";
import { RegistroTourClienteContext } from "../../context/RegistroTourClienteContext";
import { GlobalConfigContext } from "../../context/GlobalConfigContext";

import TourProvider from "../../context/TourContext";

import Divider from "@mui/material/Divider";
import TablaListaReservas from "../../TablaListaReservas/TablaListaReservas";

import Stack from "@mui/material/Stack";
import ContentPaste from "@mui/icons-material/ContentPaste";
import ContentEdit from "@mui/icons-material/Edit";
import ListItemIcon from "@mui/material/ListItemIcon";

import TourPrecios from "../PasosRegistro/TourPrecios";

// import Comprobante from "../../components/Comprobante/Comprobante";

export default function OptionFechaSalida({ tour, fecha, onClick, onDelete }) {
  const { setModalTourRegistroCliente, resetear } = useContext(RegistroTourClienteContext);
  const { setComponent, setModalGlobal } = useContext(GlobalConfigContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
    console.log(e.target.textContent);
    if (e.target.innerText !== "") {
      if (e.target.textContent == "Nueva Reserva") {
        resetear("all");
        localStorage.setItem("programacion_fecha_id", fecha.id);
        localStorage.setItem("tour_id", tour.id);

        setModalTourRegistroCliente(true);
      }
      if (e.target.textContent == "Generar Voucher") {
      }

      if (e.target.textContent == "Pasajeros") {
        setComponent(
          <TablaListaReservas
            tour={tour}
            fecha={fecha}
            titulo="DROP ZONE TRAVEL"
            fechaSalida={fecha.id}
          ></TablaListaReservas>
        );
        setModalGlobal(true);
      }

      if (e.target.textContent == "Editar Precios") {
        setComponent(
          <TourProvider>
            <TourPrecios dataTour={fecha} editing={true} />
          </TourProvider>
        );
        setModalGlobal(true);
      }
    }
  };
  var title = "";
  fecha.precios.map((precios) => {
    title = title + precios.descripcion + " $" + precios.precio + "     ";
  });
  return (
    <>
      {/* <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {`📆 ${moment(fecha.fecha).format("MMMM, D")}`}
      </Button> */}
      <nuevaEtiqueta onClick={handleClick} onDelete={handleClose}>
        <Chip
          label={`📆 ${moment(fecha.fecha).format("MMMM, D")}`}
          variant="outlined"
          title={title}
          sx={{
            color: "info.dark",
            fontWeight: "bold",
            mx: 0.5,
            fontSize: 11,
            cursor: "pointer",
          }}
          // onDelete={() => alert("Eliminar")}
          //   onClick={() => alert("asdas")}
        />
      </nuevaEtiqueta>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Nueva Reserva</MenuItem>
        <Link to={`/tables/${fecha.id}`}>
          <MenuItem onClick={handleClose}>Ver Reservas</MenuItem>
        </Link>
        {/* <MenuItem onClick={handleClose}>Generar Voucher</MenuItem> */}
        {/* <MenuItem onClick={handleClose}>Eliminar</MenuItem> */}
        <Divider sx={{ my: 0.5 }} />
        <strong>Informes</strong>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          Pasajeros
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />
        <strong>Opciones</strong>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ContentEdit fontSize="small" />
          </ListItemIcon>
          Editar Precios
        </MenuItem>
        {/* <Stack direction="row" spacing={1}>
          <Chip label="Reporte de Reservantes" />
          <Chip color="primary" label="Soft" />
          <Chip label="Medium" />
          <Chip label="Hard" />
        </Stack> */}
      </Menu>
    </>
  );
}
