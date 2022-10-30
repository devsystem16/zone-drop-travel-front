import React, { useContext } from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DataTable from "examples/Tables/DataTable";
import NewTour from "../tours/components/NewTour";
import TextField from "@mui/material/TextField";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

// Data
import toursTableData from "layouts/tours/data/toursTableData";
import ModalNuevaReserva from "./components/TourRegistrarCliente/ModalNuevaReserva";
import Modal from "./components/Modal/Modal";

import { GlobalConfigContext } from "./context/GlobalConfigContext";
const Ejemmplo2 = ({ text }) => {
  return (
    <div>
      <h1> {text}</h1>
    </div>
  );
};
function Tours() {
  const { setModalGlobal, setComponent } = useContext(GlobalConfigContext);
  const { columns, rows } = toursTableData();

  const nuevoTour = () => {
    setComponent(<NewTour />);
    setModalGlobal(true);
  };

  return (
    <DashboardLayout>
      <Modal Component={null}></Modal>

      {/* <DashboardNavbar /> */}
      <h3>Listado de Tours</h3>
      <ModalNuevaReserva />

      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
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

              <MDBox pt={0}>
                <div style={{ textAlign: "center", width: "100%" }}>
                  <TextField
                    id="standard-search"
                    label="Buscar..."
                    type="search"
                    variant="standard"
                  />
                  <Fab
                    title="Añadir Nuevo Tour"
                    style={{ marginLeft: "78%" }}
                    color="secondary"
                    onClick={nuevoTour}
                    aria-label="add"
                  >
                    <AddIcon />
                  </Fab>
                </div>

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
