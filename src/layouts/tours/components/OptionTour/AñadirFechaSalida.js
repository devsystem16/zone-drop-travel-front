import { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import FechasSalida from "../Calendar/FechasSalida";
import API from "../../../../Environment/config";
import NumberFormatCustom from "components/ValidationCurrency/ValidationCurrency";
import Box from "@mui/material/Box";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import { GlobalConfigContext } from "../../context/GlobalConfigContext";
import { RegistroTourClienteContext } from "../../context/RegistroTourClienteContext";

const AñadirFechaSalida = ({ tour }) => {
  const [value, setValue] = useState([]);
  const [tiposAcompañantes, setTiposAcompañantes] = useState([]);
  const { setComponent, setModalGlobal } = useContext(GlobalConfigContext);
  const { setReloadListaTours } = useContext(RegistroTourClienteContext);
  const [isLoading, setIsLoading] = useState(false);

  const [precios, setPrecios] = useState({});

  const handleChange = (event, codigo) => {
    const { name, value } = event.target;
    setPrecios({
      ...precios,
      [name]: {
        id: codigo,
        valor: value,
      },
    });
  };

  const saveData = async () => {
    if (value.length < 1) {
      alertify.error("Seleccione 1 fecha al menos.");
      return;
    }

    if (Object.keys(precios).length === 0) {
      alertify.error("Configure con Mayor a 0 al menos 1 Precio.");
      return;
    }

    try {
      var parametros = {
        fechas: value,
        precios: precios,
      };
      setIsLoading(true);
      const response = await API.post(`/tour/add-fecha-salida/id/${tour.id}`, parametros);
      setIsLoading(false);
      if (response.status !== 200) {
        alertify.error("Ocurrió un error al guardar");
        return;
      }

      setModalGlobal(false);
      setReloadListaTours(true);
    } catch (error) {
      alertify.error("Ocurrió un error al guardar");
      setIsLoading(true);
    }
  };

  const loadTipoAcompañantes = async () => {
    const response = await API.get("/tipoacompanante");
    setTiposAcompañantes(response.data);
  };

  useEffect(() => {
    loadTipoAcompañantes();
  }, []);

  return (
    <>
      <center>
        <h2>
          Añada nuevas fechas al tour en conjunto con sus precios
          <br />
          <strong style={{ color: "#1A73E8" }}>{tour?.titulo}</strong>
        </h2>
      </center>
      SELECCIONE FECHAS: <FechasSalida value={value} setValue={setValue} />
      <br></br>
      <br></br>
      <br></br>
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
            Añada el precio que se le cobrará a los acompañantes según el tipo. Si coloca 0, no
            aplica cobro. <br /> <br />
          </div>

          {tiposAcompañantes.map((tipo) => {
            return (
              <TextField
                id="standard-disabled"
                label={tipo.descripcion}
                identificador={tipo.id}
                name={tipo.descripcion}
                onChange={(event) => handleChange(event, tipo.id)}
                //   placeholder={editing ? `Nuevo Precio` : null}
                //   helperText={editing ? `Valor Actual $ ${tipo.precio}` : null}
                variant="standard"
                style={{ width: 200 }}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
            );
          })}
        </div>
      </Box>
      <br />
      <div style={{ textAlign: "center" }}>
        <Button
          disabled={isLoading}
          style={{ color: "white" }}
          onClick={saveData}
          variant="contained"
          endIcon={<SaveIcon />}
        >
          Guardar
        </Button>
      </div>
    </>
  );
};

export default AñadirFechaSalida;
