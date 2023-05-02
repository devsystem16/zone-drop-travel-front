import * as React from "react";
import { useState, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import ListaGenero from "./ListaGenero.js";
import { RegistroTourClienteContext } from "../../context/RegistroTourClienteContext";
import { GlobalConfigContext } from "../../context/GlobalConfigContext";
import SelectTipoAcompañante from "../SelectTipoAcompañante/SelectTipoAcompañante.js";
import Loading from "../../../../components/Loading/Loading";
import { buscarCliente } from "../../../../Controllers/ClienteController";
import MenuItem from "@mui/material/MenuItem";
import API from "../../../../Environment/config";
import SelectTipoTransaccion from "../../../../components/SelectTipoTransaccion/SelectTipoTransaccion.js";

export default function FormularioClienteTitular({ editing = false, dataReserva }) {
  const {
    cliente,
    setCliente,
    SetLugarSalida,
    resetear,
    setInformacionPagos,
    nacionalidad,
    setNacionalidad,
  } = useContext(RegistroTourClienteContext);

  const [tipoAcompañante, setTipoAcompañante] = useState({ descripcion: "adulto", id: -1 });
  const [isLoading, setIsLoading] = useState(false);
  const [textEditing, setTextEditing] = useState("");
  const [listLugaresSalida, setListLugaresSalida] = useState([]);
  const [lugarSalidaId, setLugarSalidaId] = useState(0);

  //
  const handleChange = (event) => {
    const { name, value } = event.target;

    const newValues = {
      ...cliente,
      [name]: value,
    };
    setCliente(newValues);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      find();
    }
  };

  const find = async () => {
    if (cliente.documento === "") return;
    setIsLoading(true);
    const data = await buscarCliente(cliente.documento);
    if (data.encontro) {
      if (editing) {
        if (data.cliente.documento === dataReserva.documento) {
          var tipoCliente = cliente.tipoCliente;
          var clienteTemp = data.cliente;
          clienteTemp.tipoCliente = tipoCliente;

          setCliente(clienteTemp);
        } else {
          setCliente(data.cliente);
        }
      } else {
        setCliente(data.cliente);
      }
    } else {
      // alertify.error("No encontrado");
      // resetear("cliente");
    }
    setIsLoading(false);
  };
  const handleChangeSelect = (event) => {
    const newValues = {
      ...cliente,
      tipoCliente: event.target.value,
    };
    setCliente(newValues);

    setTipoAcompañante(event.target.value);
  };
  useEffect(() => {
    resetear("all");
    localStorage.setItem("current_component", "component-registro-titular");
    cargarLugaresSalidaTour();
    if (editing) {
      setLugarSalidaId(dataReserva.lugar_salida_tours_id);
      SetLugarSalida(dataReserva.lugar_salida_tours_id);

      dataReserva.acompañantes.map((acompa) => {
        if (acompa.tipo_cliente === "Titular") {
          setTextEditing(`¿Desea cambiar el actual valor? ${acompa.categoria} $ ${acompa.precio} `);
        }
      });
      cargarDatos(dataReserva.documento);
    }

    // return () => {
    //   resetear("all");
    // };
  }, []);

  const obtenerPreciosDB = async () => {
    const response = await API.get("/reserva/precios/obtener/" + dataReserva.id);

    setInformacionPagos({
      esAgencia: response.data.esAgencia,
      descuentoAgencia: response.data.comisionAgencia,
      abono: response.data.totalAbonos,
      descuento: response.data.descuento,
      costoAdicional: response.data.costoAdicional,
      costoAdicionalMotivo: response.data.costoAdicionalMotivo,
      numeroDeposito: "",
      fechaDeposito: "",
      observaciones: response.data.observaciones,
    });
  };

  const cargarDatos = async (documento) => {
    if (documento === "") return;

    setIsLoading(true);
    var dataClienteR = null;
    const data = await buscarCliente(documento);

    if (data.encontro) {
      obtenerPreciosDB();

      dataReserva.acompañantes.map((acompa) => {
        if (acompa.tipo_cliente === "Titular") {
          dataClienteR = data.cliente;
          dataClienteR.tipoCliente = {
            descripcion: acompa.categoria,
            precio: acompa.precio,
            estado: 1,
            aplicapago: 1,
          };
        }
      });

      setCliente(dataClienteR);
    } else {
      // alertify.error("No encontrado");
      // resetear("cliente");
    }
    setIsLoading(false);
  };

  const cargarLugaresSalidaTour = async () => {
    try {
      var idTour = 0;
      if (editing) idTour = dataReserva.tour_id;
      else idTour = localStorage.getItem("tour_id");
      //

      var response = await API.get("/lugar-salida-tour/obtener/" + idTour);

      setListLugaresSalida(response.data);
    } catch (error) {
      alert("Ocurrió un error.", error);
      console.error(error);
      return;
    }
  };
  const handleChangeSelectLugarSalida = (event, dataset) => {
    var lugarSalidaSelected = JSON.parse(dataset.props.objetoAtributos);
    // setLugarSalida(lugarSalidaSelected);
    setLugarSalidaId(event.target.value);
    SetLugarSalida(event.target.value);
  };
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { ml: 1, mt: 0.3 },
      }}
      noValidates
      autoComplete="off"
    >
      <Loading open={isLoading}></Loading>
      <div>
        <TextField
          required
          id="standard-required"
          label="Documento"
          name="documento"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={find}
          value={cliente.documento}
          style={{ width: 350 }}
          defaultValue={cliente.documento}
          variant="standard"
          helperText="Ingrese una Cédula/RUC o Pasaporte "
          inputProps={{
            maxLength: 15,
          }}
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
        name="nombres"
        value={cliente.nombres}
        onChange={handleChange}
        style={{ width: 250 }}
        defaultValue={cliente.nombres}
        variant="standard"
        helperText="Nombres del Titular de la reserva"
        inputProps={{
          maxLength: 100,
        }}
      />{" "}
      <TextField
        required
        id="standard-required"
        label="Apellidos"
        name="apellidos"
        onChange={handleChange}
        style={{ width: 250 }}
        defaultValue={cliente.apellidos}
        value={cliente.apellidos}
        variant="standard"
        helperText="Apellidos del Titular de la reserva"
        inputProps={{
          maxLength: 100,
        }}
      />{" "}
      <SelectTipoTransaccion
        editing={editing}
        tituloSmall={"Nacionalidad"}
        titulo=""
        pathApi="/nacionalidads"
        setGlobalValue={setNacionalidad}
        defaultById={cliente?.nacionalidad_id}
      ></SelectTipoTransaccion>
      <div></div>
      <ListaGenero editing={editing} generoDefault={cliente.genero}></ListaGenero>
      <div>
        <SelectTipoAcompañante
          editing={editing}
          textEditing={textEditing}
          handleChange={handleChangeSelect}
          value={cliente.tipoCliente}
          ProgramacionFechaId={localStorage.getItem("programacion_fecha_id")}
        />{" "}
        <TextField
          style={{ marginLeft: "15px" }}
          id="standard-select-currency"
          select
          label="Lugar de Salida"
          value={lugarSalidaId}
          onChange={handleChangeSelectLugarSalida}
          helperText="Lugar de Salida del titular."
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
      <div></div>
      <TextField
        id="standard-required"
        label="Fecha Nacimiento"
        name="fechaNacimiento"
        type="date"
        value={cliente.fechaNacimiento}
        onChange={handleChange}
        style={{ width: 210 }}
        defaultValue={cliente.fechaNacimiento}
        variant="standard"
        helperText="Fecha Nacimiento"
      />
      <TextField
        id="standard-required"
        label="Correo"
        name="correo"
        value={cliente.correo}
        onChange={handleChange}
        style={{ width: 250 }}
        inputProps={{
          maxLength: 100,
        }}
        defaultValue={cliente.correo}
        variant="standard"
        helperText="Correo P. Ej: zonedroptravel@outlook.com"
      />
      <TextField
        required
        id="standard-required"
        label="Dirección"
        name="direccion"
        value={cliente.direccion}
        onChange={handleChange}
        style={{ width: 500 }}
        defaultValue={cliente.direccion}
        inputProps={{
          maxLength: 499,
        }}
        variant="standard"
        helperText="Dirección del Titular de la reserva"
      />
      <div></div>
      <TextField
        required
        id="standard-required"
        label="Teléfono 1"
        inputProps={{
          maxLength: 15,
        }}
        value={cliente.telefono1}
        name="telefono1"
        onChange={handleChange}
        style={{ width: 160 }}
        defaultValue={cliente.telefono1}
        variant="standard"
        helperText="Teléfono"
      />
      <TextField
        id="standard-required"
        label="Teléfono 2"
        name="telefono2"
        inputProps={{
          maxLength: 15,
        }}
        value={cliente.telefono2}
        onChange={handleChange}
        style={{ width: 160 }}
        defaultValue={cliente.telefono2}
        variant="standard"
        helperText="Teléfono 2"
      />
      <TextField
        id="standard-required"
        label="Teléfono 3"
        name="telefono3"
        onChange={handleChange}
        value={cliente.telefono3}
        style={{ width: 160 }}
        inputProps={{
          maxLength: 15,
        }}
        defaultValue={cliente.telefono3}
        variant="standard"
        helperText="Teléfono 3"
      />
      <TextField
        id="standard-required"
        label="Observacion"
        value={cliente.observaciones}
        name="observaciones"
        onChange={handleChange}
        style={{ width: 400 }}
        defaultValue={cliente.observaciones}
        variant="standard"
        helperText="¿Alguna observación?"
        inputProps={{
          maxLength: 500,
        }}
      />
      <div></div>
      <center>
        {/* <Button
          variant="outlined"
          onClick={guardarCliente}
          style={{ backgroundColor: "#1A73E8" }}
          endIcon={<SaveIcon />}
        >
          Guardar
        </Button> */}
      </center>
    </Box>
  );
}

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
