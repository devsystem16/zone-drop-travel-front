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
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import DataTable from "examples/Tables/DataTable";

import NewTour from "../tours/components/NewTour";

import CardTour from "./components/CardTour/CardTour";
import TextField from "@mui/material/TextField";
import TablaListaReservas from "./TablaListaReservas/TablaListaReservas";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import toursTableData from "layouts/tours/data/toursTableData";
import TourRegistrarCliente from "./components/TourRegistrarCliente/ModalNuevaReserva";
import Modal from "./components/Modal/Modal";
const Ejemmplo2 = ({ text }) => {
  return (
    <div>
      <h1> {text}</h1>
    </div>
  );
};
function Tours() {
  const { columns, rows } = toursTableData();

  return (
    <DashboardLayout>
      <Modal Component={null}></Modal>

      {/* <DashboardNavbar /> */}
      <h3>Listado de Tours</h3>
      <TourRegistrarCliente />

      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          {/* <Grid item xs={12}>
            <NewTour></NewTour>
          </Grid> */}

          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={1}
                mt={-3}
                py={1}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Tours
                </MDTypography>
              </MDBox>

              <MDBox
                pt={0}
                /*style={{ backgroundColor: "rgb(0, 30, 60)", borderRadius: 20 }}*/
              >
                <TextField
                  id="standard-search"
                  label="Buscar..."
                  type="search"
                  variant="standard"
                />
                <DataTable
                  table={{ columns, rows }}
                  isSorted={true}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Tours;
