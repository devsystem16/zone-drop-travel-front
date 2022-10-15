import React, { createContext, useState, useEffect } from "react";
import API from "../../../Environment/config";
export const TourContext = createContext();

const TourProvider = (props) => {
  const [modalTourRegistroCliente, setModalTourRegistroCliente] = useState(false);
  const [tour, setTour] = useState({
    titulo: "",
    duracion: "",
    detalles: "",
    incluye: "",
    imagen: "",
    estado: true,
    noIncluye: "",
    informacionAdicional: "",
    lugaresSalidas: null,
  });

  const [precios, setPrecios] = useState({
    adultos: {
      id: "1",
      valor: "0",
    },
    terceraEdad: {
      id: "2",
      valor: "0",
    },
    niños: {
      id: "3",
      valor: "0",
    },
    infantes: {
      id: "4",
      valor: "0",
    },
  });

  const [listLugaresSalida, setListLugaresSalida] = useState([]);

  const guardarTour = async () => {
    const datos = {
      ...tour,
      lugaresSalidas: listLugaresSalida,
    };
    const cadena = JSON.stringify(datos);
    const jsonDatos = JSON.parse(cadena.replace(/\\n/g, "<br />"));
    setTour(jsonDatos);

    const response = await API.post("/tour", jsonDatos);

    if (response.status === 200) {
      setTour({
        titulo: "",
        duracion: "",
        detalles: "",
        incluye: "",
        imagen: "",
        estado: true,
        noIncluye: "",
        informacionAdicional: "",
        lugaresSalidas: null,
      });
      setPrecios({
        adultos: {
          id: "1",
          valor: "0",
        },
        terceraEdad: {
          id: "2",
          valor: "0",
        },
        niños: {
          id: "3",
          valor: "0",
        },
        infantes: {
          id: "4",
          valor: "0",
        },
      });
      alert("Todo Guardado");
    }
    setListLugaresSalida([]);

    // alert(JSON.stringify(response));
  };
  return (
    <TourContext.Provider
      value={{
        tour,
        setTour,
        precios,
        setPrecios,
        guardarTour,
        listLugaresSalida,
        setListLugaresSalida,
        modalTourRegistroCliente,
        setModalTourRegistroCliente,
      }}
    >
      {props.children}
    </TourContext.Provider>
  );
};

export default TourProvider;
