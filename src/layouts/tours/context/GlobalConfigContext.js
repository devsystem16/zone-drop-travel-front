import React, { createContext, useState, useEffect } from "react";
// import API from "../../../Environment/config";
export const GlobalConfigContext = createContext();

const GlobalConfigProvider = (props) => {
  const [loadGlobal, setGlobalLoad] = useState(false);
  const [modalGlobal, setModalGlobal] = useState(false);
  const [Component, setComponent] = useState(
    <defaultComponent titulo="PRueba">(Vacio)</defaultComponent>
  );

  useEffect(() => {}, [loadGlobal]);
  return (
    <GlobalConfigContext.Provider
      value={{
        modalGlobal,
        setModalGlobal,
        Component,
        setComponent,
        loadGlobal,
        setGlobalLoad,
      }}
    >
      {props.children}
    </GlobalConfigContext.Provider>
  );
};
export default GlobalConfigProvider;
