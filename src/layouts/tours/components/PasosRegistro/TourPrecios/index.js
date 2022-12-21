import React, { createContext, useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import NumberFormatCustom from "components/ValidationCurrency/ValidationCurrency";
import { TourContext } from "../../../context/TourContext";
import { GlobalConfigContext } from "../../../context/GlobalConfigContext";
import SaveIcon from "@mui/icons-material/Save";
import API from "../../../../../Environment/config";

const TourPrecios = ({ editing, dataTour }) => {
  const { precios, setPrecios, ActualizarPrecios } = useContext(TourContext);
  const { setModalGlobal } = useContext(GlobalConfigContext);

  const [tiposAcompañantes, setTiposAcompañantes] = useState([]);
  const [tiposAcompañantesEditing, setTiposAcompañantesEditing] = useState([]);

  useEffect(() => {
    localStorage.setItem("current_component", "component-registro-precios");
    if (editing) {
      // alert(JSON.stringify(dataTour.precios));
      setTiposAcompañantesEditing(dataTour.precios);

      loadTipoAcompañantes();
    } else {
      loadTipoAcompañantes();
    }
  }, []);

  const loadTipoAcompañantes = async () => {
    const response = await API.get("/tipoacompanante");
    setTiposAcompañantes(response.data);
  };

  const handleChange = (event, codigo, type = "new") => {
    const { name, value } = event.target;
    setPrecios({
      ...precios,
      [name]: {
        id: codigo,
        valor: value,
        type: type,
      },
    });
  };
  const Actualizar = async (programacionFecha) => {
    const response = await ActualizarPrecios(programacionFecha);
    setModalGlobal(false);

    if (response.codigo === 200) {
      alertify.success(response.mensaje);
    } else if (response.codigo === 404) {
      alertify.warning(response.mensaje);
    } else if (response.codigo === 209) {
      alertify.warning(response.mensaje);
    } else {
      alertify.error("Error al Actualizar");
    }
  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <div>
          Añada el precio que se le cobrará a los acompañantes según el tipo. Si coloca 0, no aplica
          cobro. <br /> <br />
        </div>

        {tiposAcompañantes.map((tipo) => {
          return (
            <InputPrecio
              precio={tipo}
              handleChange={handleChange}
              NumberFormatCustom={NumberFormatCustom}
              editing={editing}
              preciosActuales={tiposAcompañantesEditing}
            ></InputPrecio>
            // <TextField
            //   id="standard-disabled"
            //   label={tipo.descripcion}
            //   identificador={tipo.id}
            //   name={tipo.descripcion}
            //   onChange={(event) => handleChange(event, tipo.id)}
            //   placeholder={editing ? `Nuevo Precio` : null}
            //   helperText={editing ? `Valor Actual $ ${tipo.precio}` : null}
            //   variant="standard"
            //   style={{ width: 200 }}
            //   InputProps={{
            //     inputComponent: NumberFormatCustom,
            //   }}
            // />
          );
        })}

        {editing && (
          <div style={{ textAlign: "left", paddingTop: "3%" }}>
            <Button
              // disabled={isLoading}
              style={{ color: "white" }}
              onClick={() => Actualizar(dataTour)}
              variant="contained"
              endIcon={<SaveIcon />}
            >
              Guardar
            </Button>
          </div>
        )}
      </div>
      {/* <Button variant="secondary" endIcon={<SendIcon />}>
        Añadir
      </Button> */}
      {/* <Test /> */}
    </Box>
  );
};

const InputPrecio = ({ precio, handleChange, NumberFormatCustom, editing, preciosActuales }) => {
  var datos = null;
  if (editing) {
    preciosActuales.map((unPrecio) => {
      if (
        precio.id === unPrecio.tipo_acompanante_id &&
        precio.descripcion === unPrecio.descripcion
      ) {
        datos = unPrecio;
        // alert(JSON.stringify(unPrecio));
        return;
      }
    });
  }
  // alert(JSON.stringify(datos));
  if (datos === null) {
    return (
      <TextField
        id="standard-disabled"
        label={precio.descripcion}
        identificador={precio.id}
        name={precio.descripcion}
        FormHelperTextProps={{
          style: { color: "orange", fontWeight: "bold" },
        }}
        onChange={(event) => handleChange(event, precio.id, "new")}
        placeholder={editing ? `Añadir Precio` : null}
        helperText={editing ? ` NO CONFIGURADO` : null}
        variant="standard"
        style={{ width: 200 }}
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
    );
  } else {
    return (
      <TextField
        id="standard-disabled"
        label={datos.descripcion}
        identificador={datos.tipo_acompanante_id}
        name={datos.descripcion}
        onChange={(event) => handleChange(event, datos.id, "updated")}
        placeholder={editing ? `Nuevo Precio` : null}
        helperText={editing ? `Valor Actual $ ${datos.precio}` : null}
        variant="standard"
        FormHelperTextProps={{
          style: { color: "green", fontWeight: "bold" },
        }}
        style={{ width: 200 }}
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
    );
  }
};

export default TourPrecios;
