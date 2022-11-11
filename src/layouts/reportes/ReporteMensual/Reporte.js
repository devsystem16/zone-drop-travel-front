import "./style.css";
import React, { useEffect, useState, useRef } from "react";
import API from "Environment/config";
import PrintIcon from "@mui/icons-material/Print";
import { useReactToPrint } from "react-to-print";

const ReporteM = ({ mes }) => {
  // Print
  const componentRef = useRef();
  const fn_imprimir = useReactToPrint({
    content: () => componentRef.current,
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

        <table id="customers">
          <tr>
            <th>N°</th>
            <th>FECHAS</th>
            <th>TOURS</th>
            <th className="verticalText">INSCRITOS</th>

            <th>ACCION</th>
            <th>AGUA</th>
            <th>BUS</th>
            <th>FOTOS</th>
          </tr>

          {reporte.map((datos, index) => {
            return (
              <tr key={`reporteM${index}`}>
                <td>{index + 1} </td>
                <td> {datos.fecha} </td>
                <td> {`${datos.tour.titulo}`} </td>

                <td style={{ textAlign: "center" }}> {contarIncritors(datos.reservas)} </td>

                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default ReporteM;
