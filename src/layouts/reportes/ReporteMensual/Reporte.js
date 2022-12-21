// import "./style.css";
import React, { useEffect, useState, useRef } from "react";
import API from "Environment/config";
import PrintIcon from "@mui/icons-material/Print";
import { useReactToPrint } from "react-to-print";

import {
  tablaInscritos,
  tablaInscritos_th,
  tablaInscritos_td_th,
  tablaInscritos_th_vertical,
} from "./Styles";

import { Link } from "react-router-dom";
const ReporteM = ({ mes }) => {
  const pageStyle = `
  @media print {
    html,
    body {
      color-adjust: exact;
      -webkit-print-color-adjust: exact;
   }

   .verticalText1 {
    writing-mode: vertical-lr;
    transform: rotate(180deg);
    width: 3%;  
    }
`;

  // Print
  const componentRef = useRef();
  const fn_imprimir = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: pageStyle,
  });

  // END PRINTT

  const [reporte, setReporte] = useState([]);
  const [mensajeReporte, setMensajeReporte] = useState("Reporte Mensual: ");

  const cargarReporte = async () => {
    const jsonTours = await API.get(`/reporte/mensual/${mes}`);

    setReporte(jsonTours.data);
  };

  useEffect(() => {
    cargarReporte();

    setMensajeReporte("Reporte Mensual: " + getMes(mes));
  }, [mes]);

  const contarIncritors = (reservas) => {
    var suma = 0;
    reservas.map((reserv) => {
      suma += reserv.DetallesReservas.length;
    });
    return suma;
  };

  const getMes = (mes) => {
    if (mes === 1) return "Enero";
    if (mes === 2) return "Febrero";
    if (mes === 3) return "Marzo";
    if (mes === 4) return "Abril";
    if (mes === 5) return "Mayo";
    if (mes === 6) return "Junio";
    if (mes === 7) return "Julio";
    if (mes === 8) return "Agosto";
    if (mes === 9) return "Septiembre";
    if (mes === 10) return "Octubre";
    if (mes === 11) return "Nobiembre";
    if (mes === 12) return "Diciembre";
    return "";
  };

  return (
    <div style={{ width: "100%" }}>
      <PrintIcon title="Imprimir" style={{ cursor: "pointer" }} onClick={fn_imprimir} />

      <div ref={componentRef}>
        <center>
          <h3> {mensajeReporte}</h3>
        </center>

        <table id="customersa" style={tablaInscritos}>
          <tr>
            <th style={tablaInscritos_th}>N°</th>
            <th style={tablaInscritos_th}>FECHAS</th>
            <th style={tablaInscritos_th}>TOURS</th>
            <th style={tablaInscritos_th_vertical}>INSCRITOS</th>

            <th style={tablaInscritos_th}>ACCION</th>
            <th style={tablaInscritos_th}>AGUA</th>
            <th style={tablaInscritos_th}>BUS</th>
            <th style={tablaInscritos_th}>FOTOS</th>
          </tr>

          {reporte.map((datos, index) => {
            return (
              <tr key={`reporteM${index}`}>
                <td style={tablaInscritos_td_th}>{index + 1} </td>
                <td style={tablaInscritos_td_th}> {datos.fecha} </td>

                <td style={tablaInscritos_td_th}>
                  <Link
                    to={`/reportes/Mensual/Detalle/${datos.id}`}
                  >{`${datos?.tour?.titulo}`}</Link>
                </td>

                <td style={{ textAlign: "center", border: "1px solid #ddd" }}>
                  {contarIncritors(datos.reservas)}{" "}
                </td>

                <td style={tablaInscritos_td_th}> </td>
                <td style={tablaInscritos_td_th}> </td>
                <td style={tablaInscritos_td_th}> </td>
                <td style={tablaInscritos_td_th}> </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default ReporteM;
