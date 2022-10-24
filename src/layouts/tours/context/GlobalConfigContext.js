import React, { createContext, useState, useEffect } from "react";
// import API from "../../../Environment/config";
export const GlobalConfigContext = createContext();

const GlobalConfigProvider = (props) => {
  const [modalGlobal, setModalGlobal] = useState(false);
  const [Component, setComponent] = useState(
    <defaultComponent titulo="PRueba">(Vacio)</defaultComponent>
  );
  return (
    <GlobalConfigContext.Provider
      value={{
        modalGlobal,
        setModalGlobal,
        Component,
        setComponent,
      }}
    >
      {props.children}
    </GlobalConfigContext.Provider>
  );
};
export default GlobalConfigProvider;
