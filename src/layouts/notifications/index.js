import React from "react";

import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Collage from "./Collage/Collage";

import API from "../../Environment/config";
import { transformText } from "../../Environment/utileria";

function Notifications() {
  const [toursList, setToursList] = useState([]);
  const [toursListOrigi, setToursListOrigi] = useState([]);
  const [imagenPortada, setImagenPortada] = useState(null);
  const [imagenminiaturas, setImagenminiaturas] = useState([]);
  const [tourId, setTourid] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [miniaturas, setMiniaturas] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loadTours = async () => {
    var parameters = {
      mostrarFechasOld: true,
    };
    const jsonTours = await API.post("/tour/listado/tabla", parameters);

    setToursList(jsonTours.data);
    setToursListOrigi(jsonTours.data);
  };

  // const initialMainImage = null;
  // // "https://zonetravel.s3.us-east-2.amazonaws.com/uploads/tours/quevedo.jpg";
  // const initialThumbnailImages = [
  //   // "https://zonetravel.s3.us-east-2.amazonaws.com/uploads/tours/jairo.jpg",
  //   // "https://zonetravel.s3.us-east-2.amazonaws.com/uploads/tours/uteq.jpg",
  //   // "https://zonetravel.s3.us-east-2.amazonaws.com/uploads/PC.jpg",
  //   // "https://zonetravel.s3.us-east-2.amazonaws.com/5.jpg",
  // ];

  const cargarImagenes = async (id) => {
    setTourid(id);
    const miniaturas = [];
    const responseImages = await API.get("tour/experiency/getimages/" + id);

    setImagenPortada(null);
    setImagenminiaturas([]);
    setMiniaturas([]);
    setImagenPortada(responseImages?.data?.principal?.paths3);
    if (responseImages?.data?.miniaturas?.length > 0) {
      setMiniaturas(responseImages.data.miniaturas);

      responseImages.data.miniaturas.map((mini) => {
        miniaturas.push(mini.paths3);
      });
      setImagenminiaturas(miniaturas);
    }

    setOpen(true);
  };
  useEffect(() => {
    // alert(JSON.stringify(transformText(text4)));
    loadTours();
  }, []);
  // const text1 = "2 dias 3 dias 2 noches 4 noches asdasddías 3 noches 6 ";
  // const text2 = "1 (días) 3 (noches)";
  // const text3 = "2 noches 4 días";
  // const text4 = "días7";
  // const text5 = " días";
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <div>
        <p>{transformText(text1)}</p>
        <p>{transformText(text2)}</p>
        <p>{transformText(text3)}</p>
        <p>{transformText(text4)}</p>
      </div> */}
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2}>
                <MDTypography variant="h5">Listado Tours</MDTypography>
              </MDBox>
              <MDBox pt={2} px={2}>
                {toursList.map((tour) => {
                  return (
                    <MDAlert
                      style={{ cursor: "pointer" }}
                      onClick={() => cargarImagenes(tour.id)}
                      key={tour.id}
                      color="info"
                      texto={tour.titulo}
                      // dismissible
                    ></MDAlert>
                  );
                })}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/* VENTANA MODAL */}
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Añada en imagenes las experiencias de este tour"}
          </DialogTitle>
          <DialogContent>
            <Collage
              Thumbnails={miniaturas}
              setThumbnails={setMiniaturas}
              initialMainImage={imagenPortada}
              setOpen={setOpen}
              tourId={tourId}
            />
          </DialogContent>
          {/* <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleClose} autoFocus>
              Guardar
            </Button>
          </DialogActions> */}
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

export default Notifications;
