import React, { createContext, useState, useEffect } from "react";

export const TourContext = createContext();

const TourProvider = (props) => {
  const [tour, setTour] = useState({
    titulo: "",
    duracion: "",
    detalles: "",
    incluye: "",
    noIncluye: "",
    informacionAdicional: ""
   
  });

  const [precios , setPrecios] = useState ({
    "Adulto": 0 ,
    "terceraEdad": 0 ,
    "ninios": 0 ,
    "infantes": 0 
  });


  return <TourContext.Provider value={{ 
    tour,
    setTour,
    precios, 
    setPrecios }}>{props.children}</TourContext.Provider>;
};

export default TourProvider;
