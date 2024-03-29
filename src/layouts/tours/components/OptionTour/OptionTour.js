import * as React from "react";
import { useContext } from "react";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
// import PersonAdd from "@mui/icons-material/PersonAdd";

import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import AddICON from "@mui/icons-material/Add";

import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NewTour from "../NewTour";
import AñadirFechaSalida from "./AñadirFechaSalida";

import { GlobalConfigContext } from "../../context/GlobalConfigContext";
import { RegistroTourClienteContext } from "../../context/RegistroTourClienteContext";

export default function OptionTour({ tour, image }) {
  const { setComponent, setModalGlobal } = useContext(GlobalConfigContext);
  const { eliminarTour } = useContext(RegistroTourClienteContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
    // console.log(e.target.innerText);

    if (e.target.innerText !== "") {
      // alert(e.target.innerText);
      //  alert(tour.titulo);
      if (e.target.innerText === "Editar Tour") {
        setComponent(<NewTour editing={true} tour={tour} />);
        setModalGlobal(true);
      }

      if (e.target.innerText === "Añadir Fecha Salida") {
        setComponent(<AñadirFechaSalida tour={tour} />);
        setModalGlobal(true);
      }

      if (e.target.innerText === "Eliminar Tour") {
        alertify
          .confirm(
            "",
            `¿Está seguro de eliminar el Tour <strong> ${tour.titulo} </strong>?`,
            function () {
              eliminarTour(tour.id);
            },
            function () {
              // alertify.error("Cancel");
            }
          )
          .set("labels", { ok: "Si, eliminar", cancel: "Cancelar" });
      }
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: -1 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MoreVertIcon />
            {/* <Avatar sx={{ width: 32, height: 32 }} src={image}></Avatar> */}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* <Divider /> */}
        <MenuItem>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          Editar Tour
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <AddICON fontSize="small" />
          </ListItemIcon>
          Añadir Fecha Salida
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          Eliminar Tour
        </MenuItem>
        {/* <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem> */}
      </Menu>
    </React.Fragment>
  );
}
