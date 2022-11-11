import "./style.css";
import React, { useEffect, useState } from "react";
import API from "Environment/config";

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
      <table id="customers">
        <tr>
          <th>RESERVA</th>
          <th>FECHAS</th>
          <th>N° PAX</th>
          <th>TOURS</th>

          <th>NOMBRES</th>
          <th>OBSERVACION</th>
        </tr>

        {reporte.map((datos, index) => {
          return datos.reservas.map((reserva) => {
            contador += 5;

            return (
              <tr key={`reporteM${contador}`}>
                <td> {reserva.id} </td>
                <td> {datos.fecha} </td>
                <td style={{ textAlign: "center" }}> {contarInscritos(reserva)} </td>
                <td> {`${datos.tour.titulo}`} </td>
                <td> {getTitular(reserva)} </td>
                <td> </td>
              </tr>
            );
          });
        })}
      </table>
    </div>
  );
};

export default ReporteAnual;
