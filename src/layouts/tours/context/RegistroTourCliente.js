import React, { createContext, useState, useEffect } from "react";
import API from "../../../Environment/config";
export const RegistroTourClienteContext = createContext();

const RegistroTourClienteProvider = (props) => {
  const [modalTourRegistroCliente, setModalTourRegistroCliente] = useState(false);
  return (
    <RegistroTourClienteContext.Provider
      value={{
        modalTourRegistroCliente,
        setModalTourRegistroCliente,
      }}
    >
      {props.children}
    </RegistroTourClienteContext.Provider>
  );
};
export default RegistroTourClienteProvider;
