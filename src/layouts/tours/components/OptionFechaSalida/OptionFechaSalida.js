import * as React from "react";
import { useContext } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Chip from "@mui/material/Chip";
import moment from "moment";
import { RegistroTourClienteContext } from "../../context/RegistroTourClienteContext";
import { GlobalConfigContext } from "../../context/GlobalConfigContext";

import TablaListaReservas from "../../TablaListaReservas/TablaListaReservas";

export default function OptionFechaSalida({ tour, fecha, onClick, onDelete }) {
  const { setModalTourRegistroCliente } = useContext(RegistroTourClienteContext);
  const { setComponent, setModalGlobal } = useContext(GlobalConfigContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
    console.log(e.target);
    if (e.target.innerText !== "") {
      if (e.target.textContent == "Nueva Reserva") {
        localStorage.setItem("programacion_fecha_id", fecha.id);
        setModalTourRegistroCliente(true);
      }
      if (e.target.textContent == "Ver Inscritos") {
        // alert(JSON.stringify(tour));
        setComponent(
          <TablaListaReservas
            tour={tour}
            fecha={fecha}
            titulo="Reporte de Inscritos"
            fechaSalida={fecha.id}
          ></TablaListaReservas>
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
          onDelete={() => alert("Eliminar")}
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
        <MenuItem onClick={handleClose}>Ver Inscritos</MenuItem>
        {/* <MenuItem onClick={handleClose}>Eliminar</MenuItem> */}
      </Menu>
    </>
  );
}
