/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import zone_drop_travel_icon from "assets/images/zone-drop-travel/zone-drop-travel-icon.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
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
      { Header: "status", accessor: "status", align: "center" },
      { Header: "employed", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        author: (
          <Author
            image={zone_drop_travel_icon}
            name="🏊‍♂️GUANÁBANA + YAHUARCOCHA🏊‍♂️"
            email="(1 día) Visita el complejo turístico Guanábana Republic con sus 4 piscinas con su río, viaja en lancha en la Laguna de Yahuarcocha y mucho más salida desde Quito."
          />
        ),
        function: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            <div>📆 Octubre: 02, 08, 09, 10, 16, 22 y 30</div>
            <div>📆 Noviembre: 04, 06, 13, 20 y 27 </div>
            <div>📆 Diciembre: 03, 05, 18 y 25</div>
          </MDTypography>
        ),
        incluye: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            <div>🚌 Transporte de Turismo.</div>
            <div>⛑ Seguro de Accidente Vial.</div>
            <div>🦠 Protocolo de Bioseguridad.</div>
            <div>{/* <strong style={{ color: "#1A73E8" }}>Ver mas</strong> */}</div>
          </MDTypography>
        ),
        noIncluye: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            <div>📜 No especificado en el itinerario.</div>
            <div>🍔 Comidas extras.</div>
            <div>🎊 Gastos personales.</div>
          </MDTypography>
        ),
        lugarSalida: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            <div>🅿️ 03:00 am: Valle Chillos, Centro Comercial San Luis. </div>
            <div> 🅿️ 03:05 am: Triangulo, parada de los buses.</div>
            <div> 🅿️ 03:35 am: Centro Comercial Quicentro Sur.</div>
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
            <div>💰 Con $ 20,00 dólares por cada uno.</div>
            <div>💵 Efectivo, Transferencia o Depósito Bancario.</div>
            <div> 💳 Tarjeta Crédito hasta 12 meses con intereses.</div>
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
      },
      {
        author: <Author image={team3} name="Alexa Liras" email="alexa@creative-tim.com" />,
        function: <Job title="Programator" description="Developer" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            11/01/19
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        author: <Author image={team4} name="Laurent Perrier" email="laurent@creative-tim.com" />,
        function: <Job title="Executive" description="Projects" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            19/09/17
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        author: <Author image={team3} name="Michael Levi" email="michael@creative-tim.com" />,
        function: <Job title="Programator" description="Developer" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            24/12/08
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        author: <Author image={team3} name="Richard Gran" email="richard@creative-tim.com" />,
        function: <Job title="Manager" description="Executive" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            04/10/21
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        author: <Author image={team4} name="Miriam Eric" email="miriam@creative-tim.com" />,
        function: <Job title="Programator" description="Developer" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            14/09/20
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
    ],
  };
}
