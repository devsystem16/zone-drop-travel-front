import React, { createContext, useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import NumberFormatCustom from "components/ValidationCurrency/ValidationCurrency";
import { TourContext } from "../../../context/TourContext";

import API from "../../../../../Environment/config";

const TourPrecios = ({ editing, dataTour }) => {
  const { precios, setPrecios } = useContext(TourContext);

  const [tiposAcompañantes, setTiposAcompañantes] = useState([]);

  useEffect(() => {
    localStorage.setItem("current_component", "component-registro-precios");
    if (editing) {
      alert(JSON.stringify(dataTour.programacionFechas[0].precios));
      setTiposAcompañantes(dataTour.programacionFechas[0].precios);
      console.log("hola");
    } else {
      loadTipoAcompañantes();
    }
  }, []);

  const loadTipoAcompañantes = async () => {
    const response = await API.get("/tipoacompanante");
    setTiposAcompañantes(response.data);
  };

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
            <TextField
              id="standard-disabled"
              label={tipo.descripcion}
              identificador={tipo.id}
              name={tipo.descripcion}
              onChange={(event) => handleChange(event, tipo.id)}
              defaultValue={editing ? tiposAcompañantes.precio : 0}
              // value={editing ? tipo.precio : 0}
              variant="standard"
              style={{ width: 200 }}
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
            />
          );
        })}
      </div>
      {/* <Button variant="secondary" endIcon={<SendIcon />}>
        Añadir
      </Button> */}
      {/* <Test /> */}
    </Box>
  );
};

export default TourPrecios;
