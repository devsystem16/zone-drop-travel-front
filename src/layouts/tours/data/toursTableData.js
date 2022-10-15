import React, { useEffect, useState, useContext } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import Chip from "@mui/material/Chip";

import moment from "moment";
// Images
import zone_drop_travel_icon from "assets/images/zone-drop-travel/zone-drop-travel-icon.jpg";
import API from "../../../Environment/config";
import { RegistroTourClienteContext } from "../context/RegistroTourCliente";

export default function data() {
  const { modalTourRegistroCliente, setModalTourRegistroCliente } = useContext(
    RegistroTourClienteContext
  );

  moment.locale("es", {
    months:
      "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
        "_"
      ),
    monthsShort: "Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.".split("_"),
    weekdays: "Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado".split("_"),
    weekdaysShort: "Dom._Lun._Mar._Mier._Jue._Vier._Sab.".split("_"),
    weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_"),
  });
  const [filas, setFilas] = useState([]);
  useEffect(() => {
    cargarTours();
  }, []);

  const clicFecha = (id) => {
    // alert("Clic Fecha " + id);
    setModalTourRegistroCliente(true);
  };

  const cargarTours = async () => {
    const jsonTours = await API.get("/tour/listado/tabla");
    const Elementos = jsonTours.data.map((tour) => {
      return {
        author: (
          <Author
            image={zone_drop_travel_icon}
            name={tour.titulo}
            email={`${tour.duracion} ${tour.detalles}`}
          />
        ),
        function: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {/* <div>📆 Octubre: 02, 08, 09, 10, 16, 22 y 30</div>
            <div>📆 Noviembre: 04, 06, 13, 20 y 27 </div>
            <div>📆 Diciembre: 03, 05, 18 y 25</div> */}
            {tour.programacionFechas.map((fecha) => {
              return (
                <Chip
                  // label=" 📆 22/01/2011"
                  label={`📆 ${moment(fecha.fecha).format("MMMM, D")}`}
                  variant="outlined"
                  sx={{
                    color: "info.dark",
                    fontWeight: "bold",

                    mx: 0.5,
                    fontSize: 11,
                    cursor: "pointer",
                  }}
                  onClick={() => clicFecha(fecha.id)}
                  onDelete={() => clicFecha(fecha.id)}
                />
              );
            })}
          </MDTypography>
        ),
        incluye: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {/* <div>🚌 Transporte de Turismo.</div>
            <div>⛑ Seguro de Accidente Vial.</div>
            <div>🦠 Protocolo de Bioseguridad.</div> */}

            <div dangerouslySetInnerHTML={{ __html: tour.incluye }}></div>

            <div>
              <strong style={{ color: "#1A73E8" }}>Ver mas</strong>
            </div>
          </MDTypography>
        ),
        noIncluye: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {/* <div>📜 No especificado en el itinerario.</div>
            <div>🍔 Comidas extras.</div>
            <div>🎊 Gastos personales.</div> */}
            <div dangerouslySetInnerHTML={{ __html: tour.noIncluye }}></div>
          </MDTypography>
        ),
        lugarSalida: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {tour.lugaresSalidas.map((lugares) => {
              return (
                <Chip
                  label={`🅿️ ${lugares.descripcion} (${lugares.hora})`}
                  variant="outlined"
                  sx={{
                    color: "info.dark",
                    fontWeight: "bold",

                    mx: 0.5,
                    fontSize: 11,
                    cursor: "pointer",
                  }}
                  onClick={() => clicFecha(lugares.id)}
                  onDelete={() => clicFecha(lugares.id)}
                />
              );
            })}

            {/* <div>🅿️ 03:00 am: Valle Chillos, Centro Comercial San Luis. </div>
            <div> 🅿️ 03:05 am: Triangulo, parada de los buses.</div>
            <div> 🅿️ 03:35 am: Centro Comercial Quicentro Sur.</div> */}
            <div>{/* <strong style={{ color: "#1A73E8" }}>Ver mas</strong> */}</div>
          </MDTypography>
        ),

        costos: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            <div>💸 $ 35,00 dólares, adultos</div>
            <div> 💸 $ 32,00 dólares, niños, 3era edad y con discapacidad.</div>
          </MDTypography>
        ),
        reservacion: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            <div dangerouslySetInnerHTML={{ __html: tour.informacionAdicional }}></div>
            {/* <div>💰 Con $ 20,00 dólares por cada uno.</div>
            <div>💵 Efectivo, Transferencia o Depósito Bancario.</div>
            <div> 💳 Tarjeta Crédito hasta 12 meses con intereses.</div> */}
          </MDTypography>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/04/18
          </MDTypography>
        ),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Pagado" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      };
    });
    setFilas(Elementos);
  };
  const acotarText = (text) => {
    if (text.length > 80) return text.substring(0, 60) + "...";
    return text;
  };

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography title={email} variant="caption">
          {acotarText(email)}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "destino", accessor: "author", width: "20", align: "left" },
      { Header: "Salidas", accessor: "function", align: "left" },
      { Header: "Incluye", accessor: "incluye", align: "left" },
      { Header: "no incluye", accessor: "noIncluye", align: "left" },
      { Header: "Lugares Salida", accessor: "lugarSalida", align: "left" },
      { Header: "Costos", accessor: "costos", align: "left" },
      { Header: "reservacion", accessor: "reservacion", align: "left" },
      // { Header: "status", accessor: "status", align: "center" },
      // { Header: "employed", accessor: "employed", align: "center" },
      // { Header: "action", accessor: "action", align: "center" },
    ],

    rows: filas,
  };
}
