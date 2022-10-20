import { useState, useContext, useEffect } from "react";
import FormularioClienteTitular from "../TourRegistrarCliente/FormularioClienteTitular";

import FormularioRegistrarAcompañante from "../FormularioRegistrarAcompañante/FormularioRegistrarAcompañante";
import SeleccionLugaresSalida from "./Components/SeleccionLugaresSalida";
import IncripcionInformacionDePago from "./Components/IncripcionInformacionDePago";

import { RegistroTourClienteContext } from "../../context/RegistroTourClienteContext";

const Switch = ({ step }) => {
  const { SetLugarSalida } = useContext(RegistroTourClienteContext);

  if (step == 1) return <FormularioClienteTitular />;
  if (step == 2) return <FormularioRegistrarAcompañante />;
  if (step == 3) return <SeleccionLugaresSalida setValues={SetLugarSalida} />;
  if (step == 4) return <IncripcionInformacionDePago />;
};

export default Switch;
