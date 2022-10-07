import React, { createContext, useState, useEffect } from "react";

export const TourContext = createContext();

const TourProvider = (props) => {
  const [tour, setTour] = useState({
    titulo: "",
    duracion: "",
    detalles: "",
    incluye: "",
    noIncluye: "",
    informacionAdicional: "",
  });

  const [precios, setPrecios] = useState({
    adultos: 0,
    terceraEdad: 0,
    ninios: 0,
    infantes: 0,
  });

  const guardarTour = () => {
    alert(JSON.stringify(tour));
  };
  return (
    <TourContext.Provider
      value={{
        tour,
        setTour,
        precios,
        setPrecios,
        guardarTour,
      }}
    >
      {props.children}
    </TourContext.Provider>
  );
};

export default TourProvider;
