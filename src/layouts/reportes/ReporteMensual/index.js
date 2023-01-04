import React, { useEffect, useState, useRef } from "react";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Reporte from "./Reporte";
import SelectMeses from "../Components/SelectMeses";
import SelectAño from "../Components/SelectAño";
import PrintComponent from "components/PrintComponent/PrintComponent";
import moment from "moment";

const ReporteMensual = () => {
  const [mes, setMes] = useState(1);
  const [año, setAño] = useState(moment().year());
  const [Component, setComponent] = useState(Reporte.defaultComponent);

  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <br /> <br />
      <SelectAño value={año} setValue={setAño} />
      <SelectMeses value={mes} setValue={setMes}></SelectMeses>
      {/* <PrintComponent ComponentToPrint={Reporte}></PrintComponent> */}
      <Reporte mes={mes} año={año}></Reporte>
    </DashboardLayout>
  );
};

export default ReporteMensual;
