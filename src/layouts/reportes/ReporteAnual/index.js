import { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Reporte from "./Reporte";
import SelectAño from "../Components/SelectAño";
import moment from "moment";

import PrintComponent from "components/PrintComponent/PrintComponent";

const ReporteAnual = () => {
  const [año, setAño] = useState(moment().year());

  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <br /> <br />
      <center>
        <PrintComponent ComponentToPrint={Reporte}></PrintComponent>
      </center>
      <SelectAño value={año} setValue={setAño} />
      <Reporte año={año}></Reporte>
    </DashboardLayout>
  );
};

export default ReporteAnual;
