import React, { useState } from "react";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Reporte from "./Reporte";

const ReporteMensual = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <br></br> <br></br>
      <Reporte></Reporte>
    </DashboardLayout>
  );
};

export default ReporteMensual;
