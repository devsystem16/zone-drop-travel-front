import React, { createContext, useState, useEffect } from 'react';

export const TourContext = createContext();


const TourProvider = (props) => {

    const [ tour , setTour ] = useState({
        "titulo":"",
        "duracion":"",
        "detalles":"",
        "incluye":"",
        "noIncluye":"",
        "informacionAdicional":""
    })


    return (
        <TourContext.Provider value={{tour}}>
          {props.children}
        </TourContext.Provider>
      );
    
}

export default TourProvider;