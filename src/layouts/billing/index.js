/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Billing page components
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";

import { redirect, Link } from "react-router-dom";
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
