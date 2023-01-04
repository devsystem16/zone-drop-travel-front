import React, { useContext, useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DataTable from "examples/Tables/DataTable";
import NewTour from "../tours/components/NewTour";
import TextField from "@mui/material/TextField";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import SelectAño from "../reportes/Components/SelectAño";
// Data
import toursTableData from "layouts/tours/data/toursTableData";
import ModalNuevaReserva from "./components/TourRegistrarCliente/ModalNuevaReserva";
import Modal from "./components/Modal/Modal";

import { GlobalConfigContext } from "./context/GlobalConfigContext";

import { RegistroTourClienteContext } from "./context/RegistroTourClienteContext";

import ModalVoucher from "../Reservas/ModalVoucher";
import moment from "moment";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

function Tours() {
  const { setModalGlobal, setComponent } = useContext(GlobalConfigContext);
  const [año, setAño] = useState(moment().year());
  const {
    filtrarTours,
    openModalVoucher,
    setOpenModalVoucher,
    datosVoucher,
    mostrarFechasOld,
    setMostrarFechasOld,
    setReloadListaTours,
  } = useContext(RegistroTourClienteContext);

  const nuevoTour = () => {
    setComponent(<NewTour editing={false} tour={null} />);
    setModalGlobal(true);
  };

  const { columns, rows } = toursTableData();

  const filtrar = (e) => {
    filtrarTours(e);
  };

  const handleChange = (event) => {
    setMostrarFechasOld(event.target.checked);
    setReloadListaTours(true);
  };
  return (
    <DashboardLayout>
      <Modal Component={null}></Modal>
      <DashboardNavbar absolute isMini={false} />
      {/* <DashboardNavbar /> */}
      {/* <h3>Listado de Tours</h3> */}
      <ModalNuevaReserva />

      <ModalVoucher
        datos={datosVoucher}
        open={openModalVoucher}
        setOpen={setOpenModalVoucher}
      ></ModalVoucher>
      <br />

      {/* <SelectAño value={año} setValue={setAño} /> */}
      <FormGroup>
        <FormControlLabel
          control={<Switch defaultChecked={mostrarFechasOld} onChange={handleChange} />}
          label="Mostrar Fechas vencidas"
        />
      </FormGroup>
      <MDBox pt={2} pb={3}>
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
                    onChange={filtrar}
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
