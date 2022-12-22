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

export default function FormularioRegistrarAcompañante({ editing = false, dataReserva }) {
  const {
    acompañantes,
    setAcompañantes,
    obtenerAcompañantes,
    setHabitaciones,
    habitciones,
    setAcompañantesEliminados,
    habitcionesEliminadas,
    setHabitacionesEliminadas,
  } = useContext(RegistroTourClienteContext);

  //

  useEffect(() => {
    if (editing) {
      obtenerAcompañantes(dataReserva.id);
      setAcompañantesEliminados([]);
      //setAcompañantes(dataReserva.acompañantes);
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormularioAcompañante editing={editing} />
        </Grid>
        <Grid item xs={6}>
          <label>Habitaciones</label>
          <SeleccionHabitaciones
            // habitcionesEliminadas={habitcionesEliminadas}
            // setHabitacionesEliminadas={setHabitacionesEliminadas}
            setValues={setHabitaciones}
            dataReserva={dataReserva}
            editing={editing}
          />
          <div>
            <label>Listado de Acompañantes</label>
          </div>
          {acompañantes.map((persona) => {
            return <ItemAcompañante key={persona.id} acompañante={persona} />;
          })}
        </Grid>
      </Grid>
    </Box>
  );
}

const FormularioAcompañante = ({ editing = false }) => {
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
  const [listLugaresSalida, setListLugaresSalida] = useState([]);
  const [lugarSalida, setLugarSalida] = useState({});
  const [lugarSalidaId, setLugarSalidaId] = useState(2);
  useEffect(() => {
    localStorage.setItem("current_component", "component-acompañantes");
    cargarTiposAcompañantePrecio();
    cargarLugaresSalidaTour();
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
      añadirAlDetalle: editing,
      lugarSalida: lugarSalida,
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
      añadirAlDetalle: false,
    });
  };

  const handleChangeSelect = (event) => {
    console.log("TARGET", event.target.value);
    setTipoAcompañante(event.target.value);
  };
  const handleChangeSelectLugarSalida = (event, dataset) => {
    var lugarSalidaSelected = JSON.parse(dataset.props.objetoAtributos);
    setLugarSalida(lugarSalidaSelected);
    setLugarSalidaId(event.target.value);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    setAcompañante({
      ...acompañante,
      [name]: value,
    });
  };

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

  const cargarLugaresSalidaTour = async () => {
    try {
      var response = await API.get("/lugar-salida-tour/obtener/" + localStorage.getItem("tour_id"));

      setListLugaresSalida(response.data);
    } catch (error) {
      alert("Ocurrió un error.", error);
      console.error(error);
      return;
    }
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

          <TextField
            id="standard-select-currency"
            select
            label="Lugar de Salida"
            value={lugarSalidaId}
            onChange={handleChangeSelectLugarSalida}
            helperText="Lugar de Salida del Acompañante."
            variant="standard"
          >
            {listLugaresSalida.map((lugarSalida) => (
              <MenuItem
                key={lugarSalida.id}
                value={lugarSalida.id}
                objetoAtributos={JSON.stringify(lugarSalida)}
              >
                <TextLugarSalida lugarSalida={lugarSalida} />
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

const TextLugarSalida = ({ lugarSalida }) => {
  var html = (
    <div>
      <div>
        {`${lugarSalida.descripcion} (${lugarSalida.hora})  `}
        <b style={{ color: "blue", fontSize: "10px" }}>
          {lugarSalida.siguienteDia ? "(sig. día)" : ""}
        </b>
      </div>
    </div>
  );
  return html;
};

const ItemAcompañante = ({ acompañante }) => {
  const { acxompañantes, setAcompañantes, acompañantesEliminados, setAcompañantesEliminados } =
    useContext(RegistroTourClienteContext);

  const EliminarAcompañante = (acompañante) => {
    if (!acompañante?.añadirAlDetalle) {
      setAcompañantesEliminados([...acompañantesEliminados, acompañante]);
    }

    const results = acompañantes.filter((itemAcompañante) => {
      return !(itemAcompañante.id === acompañante.id);
    });
    setAcompañantes(results);
  };

  const isNull = (dato) => {
    if (dato === null) return "";
    if (dato === undefined) return "";
    return dato;
  };

  var html = (
    <div style={{ margin: 5, fontSize: "11px" }}>
      <div>
        <strong>CI: </strong>
        {`${acompañante.documento} - ${acompañante.nombres} ${acompañante.apellidos}   (${acompañante.tipoAcompañante.descripcion})  $ ${acompañante.tipoAcompañante.precio}  `}
      </div>
      <div style={{ fontSize: "9px", color: "rgb(26, 115, 232)" }}>
        <strong>
          {` ${isNull(acompañante?.lugarSalida?.descripcion)} ${isNull(
            acompañante?.lugarSalida?.hora
          )}`}
        </strong>
        {acompañante?.lugarSalida?.siguienteDia ? " (sig. día)" : ""}
      </div>
    </div>
  );

  return (
    <Chip
      label={html}
      variant="outlined"
      // onClick={handleClick}
      onDelete={() => EliminarAcompañante(acompañante)}
    />
  );
};
