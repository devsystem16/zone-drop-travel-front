import { useState, useContext, useEffect } from "react";
import FormularioClienteTitular from "../TourRegistrarCliente/FormularioClienteTitular";

import FormularioRegistrarAcompa├▒ante from "../FormularioRegistrarAcompa├▒ante/FormularioRegistrarAcompa├▒ante";
import SeleccionLugaresSalida from "./Components/SeleccionLugaresSalida";
import IncripcionInformacionDePago from "./Components/IncripcionInformacionDePago";

import { RegistroTourClienteContext } from "../../context/RegistroTourClienteContext";

const Switch = ({ step, editing = false, dataReserva }) => {
  // const { SetLugarSalida } = useContext(RegistroTourClienteContext);

  if (step == 1) return <FormularioClienteTitular editing={editing} dataReserva={dataReserva} />;
  if (step == 2)
    return <FormularioRegistrarAcompa├▒ante editing={editing} dataReserva={dataReserva} />;
  if (step == 3) {
    return <IncripcionInformacionDePago editing={editing} dataReserva={dataReserva} />;
  }
};

export default Switch;
// if (step == 3)
//   return (
//     <SeleccionLugaresSalida
//       setValues={SetLugarSalida}
//       editing={editing}
//       dataReserva={dataReserva}
//     />
//   );
