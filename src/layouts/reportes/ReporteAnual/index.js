import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Reporte from "./Reporte";

import PrintComponent from "components/PrintComponent/PrintComponent";

const ReporteAnual = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <br /> <br />
      <PrintComponent ComponentToPrint={Reporte}></PrintComponent>
      <Reporte año={2023}></Reporte>
    </DashboardLayout>
  );
};

export default ReporteAnual;
