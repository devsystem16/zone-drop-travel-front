// import "./style.css";
import React, { useEffect, useState } from "react";
import API from "Environment/config";
import {
  tablaInscritos,
  tablaInscritos_th,
  tablaInscritos_td_th,
  tablaInscritos_th_vertical,
} from "./Styles";

const ReporteAnual = ({ año = 2023 }) => {
  const [reporte, setReporte] = useState([]);

  const cargarReporte = async () => {
    const jsonTours = await API.get(`/reporte/anual/${año}`);
    setReporte(jsonTours.data);
  };

  useEffect(() => {
    cargarReporte();
  }, [año]);

  const contarInscritos = (reservas) => {
    var suma = reservas.DetallesReservas.length;
    return suma;
  };

  const getTitular = (reservas) => {
    var nombreTitular = "";

    reservas.DetallesReservas.map((detalle) => {
      if (detalle.tipo_cliente === "Titular") {
        nombreTitular = detalle.nombres + " " + detalle.apellidos;
      }
    });

    return nombreTitular;
  };
  var contador = 1;
  return (
    <div style={{ width: "100%" }}>
      <table style={tablaInscritos}>
        <tr>
          <th style={tablaInscritos_th}>RESERVA</th>
          <th style={tablaInscritos_th}>FECHAS</th>
          <th style={tablaInscritos_th}>N° PAX</th>
          <th style={tablaInscritos_th}>TOURS</th>

          <th style={tablaInscritos_th}>NOMBRES</th>
          <th style={tablaInscritos_th}>OBSERVACION</th>
        </tr>

        {reporte.map((datos, index) => {
          return datos.reservas.map((reserva) => {
            contador += 5;

            return (
              <tr key={`reporteM${contador}`}>
                <td style={tablaInscritos_td_th}> {reserva.id} </td>
                <td style={tablaInscritos_td_th}> {datos.fecha} </td>
                <td style={{ textAlign: "center", border: "1px solid #ddd" }}>
                  {" "}
                  {contarInscritos(reserva)}{" "}
                </td>
                <td style={tablaInscritos_td_th}> {`${datos.tour.titulo}`} </td>
                <td style={tablaInscritos_td_th}> {getTitular(reserva)} </td>
                <td style={tablaInscritos_td_th}> </td>
              </tr>
            );
          });
        })}
      </table>
    </div>
  );
};

export default ReporteAnual;
