// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
function Billing() {
  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini={false} />
      <br /> <br />
      <Link to={`/reportes/Mensual`}>
        <MenuItem>* Reporte Mensual</MenuItem>
      </Link>
      <Link to={`/reportes/Anual`}>
        <MenuItem>* Reporte Anual</MenuItem>
      </Link>
    </DashboardLayout>
  );
}

export default Billing;
