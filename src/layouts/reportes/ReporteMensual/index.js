import React, { useEffect, useState, useRef } from "react";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Reporte from "./Reporte";
import SelectMeses from "../Components/SelectMeses";
import PrintComponent from "components/PrintComponent/PrintComponent";

const ReporteMensual = () => {
  const [mes, setMes] = useState("Enero");

  const [Component, setComponent] = useState(Reporte.defaultComponent);

  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <br /> <br />
      <SelectMeses value={mes} setValue={setMes}></SelectMeses>
      {/* <PrintComponent ComponentToPrint={Reporte}></PrintComponent> */}
      <Reporte mes={mes}></Reporte>
    </DashboardLayout>
  );
};

export default ReporteMensual;
