import * as React from "react";
import { useState, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import API from "../../../../Environment/config";
import { RegistroTourClienteContext } from "../../context/RegistroTourClienteContext";
import SeleccionHabitaciones from "../../components/IncripcionTour/Components/SeleccionHabitaciones";
import { buscarAcompañante } from "../../../../Controllers/AcompañanteController";
import { buscarCliente } from "../../../../Controllers/ClienteController";
import Loading from "../../../../components/Loading/Loading";

export default function FormularioRegistrarAcompañante() {
  const { acompañantes, setHabitaciones } = useContext(RegistroTourClienteContext);

  //

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormularioAcompañante />
        </Grid>
        <Grid item xs={6}>
          <label>Habitaciones</label>
          <SeleccionHabitaciones setValues={setHabitaciones} />
          <div>
            <label>Listado de Acompañantes</label>
          </div>
          {acompañantes.map((persona) => {
            return <ItemAcompañante key={persona.documento} acompañante={persona} />;
          })}
        </Grid>
      </Grid>
    </Box>
  );
}

const FormularioAcompañante = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { acompañantes, setAcompañantes } = useContext(RegistroTourClienteContext);
  const [tipoAcompañante, setTipoAcompañante] = useState(null);
  const [acompañante, setAcompañante] = useState({
    id: -1,
    cliente_id: -1,
    documento: "",
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    correo: "",
    direccion: "",
    genero: "",
    telefono1: "",
    telefono2: "",
    observaciones: "",
    existente: false,
  });
  const [listaTiposAcompañante, setListaTiposAcompañante] = useState([]);

  useEffect(() => {
    localStorage.setItem("current_component", "component-acompañantes");
    cargarTiposAcompañantePrecio();
  }, []);

  const cargarTiposAcompañantePrecio = async () => {
    try {
      var programacion_fecha_id = localStorage.getItem("programacion_fecha_id");
      var response = await API.get("/costo-tour/obtener-precios/" + programacion_fecha_id);
      setListaTiposAcompañante(response.data);
    } catch (error) {
      alert("Ocurrió un error.", error);
      console.error(error);
      return;
    }
  };

  const añadirTipoAcompañante = () => {
    if (acompañante.nombres === "") {
      alertify.error("Ingrese un nombre");
      return;
    }
    if (acompañante.apellidos === "") {
      alertify.error("Ingrese un nombre");
      return;
    }
    if (tipoAcompañante === null) {
      alertify.error("Seleccione el tipo de acompañante");
      return;
    }
    var newAcom = {
      ...acompañante,

      documento: acompañante.documento === "" ? "9999999999" : acompañante.documento,
      nombres: acompañante.nombres,
      apellidos: acompañante.apellidos,
      tipoAcompañante: tipoAcompañante,
    };
    setAcompañantes([...acompañantes, newAcom]);

    setAcompañante({
      id: -1,
      cliente_id: -1,
      documento: "",
      nombres: "",
      apellidos: "",
      fechaNacimiento: "",
      correo: "",
      direccion: "",
      genero: "",
      telefono1: "",
      telefono2: "",
      observaciones: "",
      existente: false,
    });
  };

  const handleChangeSelect = (event) => {
    console.log("TARGET", event.target.value);
    setTipoAcompañante(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setAcompañante({
      ...acompañante,
      [name]: value,
    });
  };

  // const find = async () => {
  //   const data = await buscarAcompañante(acompañante.documento);
  //   if (data.encontro) {
  //     setAcompañante(data.acompañante);
  //   }
  // };

  const find = async () => {
    if (acompañante.documento === "") return;
    setIsLoading(true);
    const data = await buscarCliente(acompañante.documento);
    if (data.encontro) {
      setAcompañante(data.cliente);
    } else {
      alertify.error("No encontrado");
      // resetear("cliente");
    }
    setIsLoading(false);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { ml: 1, mt: 0.3 },
      }}
      noValidates
      autoComplete="off"
      style={{ backgroundColor: "#f4f4f4", borderRadius: 20 }}
    >
      <Loading open={isLoading}></Loading>
      <div>
        <TextField
          required
          id="standard-required"
          label="Documento"
          name="documento"
          onChange={handleChange}
          style={{ width: "80%" }}
          value={acompañante.documento}
          defaultValue={acompañante.documento}
          variant="standard"
          helperText="Ingrese una Cédula o RUC "
        />
        <Button
          variant="outlined"
          size="small"
          style={{ backgroundColor: "#1A73E8" }}
          onClick={find}
          endIcon={<SearchIcon />}
        ></Button>
      </div>
      <TextField
        required
        id="standard-required"
        label="Nombres"
        style={{ width: "48%" }}
        name="nombres"
        onChange={handleChange}
        value={acompañante.nombres}
        defaultValue={acompañante.nombres}
        variant="standard"
        helperText="Nombres del Titular de la reserva"
      />
      <TextField
        required
        id="standard-required"
        label="Apellidos"
        name="apellidos"
        value={acompañante.apellidos}
        style={{ width: "48%" }}
        onChange={handleChange}
        defaultValue={acompañante.apellidos}
        variant="standard"
        helperText="Apellidos del Titular de la reserva"
      />
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="standard-select-currency"
            select
            label="Tipo de Acompañante"
            value={tipoAcompañante}
            onChange={handleChangeSelect}
            helperText="El tipo de acompañante define el precio."
            variant="standard"
          >
            {listaTiposAcompañante.map((option) => (
              <MenuItem key={option.id} value={option}>
                {`${option.descripcion} $ ${option.precio}`}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <center>
          <Button
            variant="outlined"
            onClick={añadirTipoAcompañante}
            style={{ backgroundColor: "#1A73E8" }}
            endIcon={<SaveIcon />}
          >
            Añadir
          </Button>
        </center>
      </Box>
    </Box>
  );
};

const ItemAcompañante = ({ acompañante }) => {
  const { acompañantes, setAcompañantes } = useContext(RegistroTourClienteContext);

  const EliminarAcompañante = (acompañante) => {
    const results = acompañantes.filter((itemAcompañante) => {
      return !(itemAcompañante.documento === acompañante.documento);
    });
    setAcompañantes(results);
  };

  return (
    <Chip
      label={`CI: ${acompañante.documento} - ${acompañante.nombres} ${acompañante.apellidos}  (${acompañante.tipoAcompañante.descripcion} )  $ ${acompañante.tipoAcompañante.precio}  `}
      variant="outlined"
      // onClick={handleClick}
      onDelete={() => EliminarAcompañante(acompañante)}
    />
  );
};
