import React, { useEffect, useState } from "react";
import "./style.css";
import API from "Environment/config";
import BotonFlotante from "./BotonFlotante";
import moment from "moment";
const TablaListaReservas = ({ tour, fecha, titulo, fechaSalida = -1 }) => {
  //   if (fechaSalida == -1) return <div>Cargando datos...</div>;
  const [reporte, setReporte] = useState([]);

  const cargarReporte = async () => {
    const jsonTours = await API.get(`/reporte/titulares/${fechaSalida}`);
    setReporte(jsonTours.data);
  };

  useEffect(() => {
    cargarReporte();
  }, []);

  if (reporte?.listadoClientes == null) return <div>Cargando Datos</div>;
  return (
    <>
      <center>
        <h1>{titulo} </h1>
      </center>
      <div>
        <strong>RUTA:</strong> {tour.titulo}{" "}
      </div>
      <div>
        <strong>FECHA DE SALIDA:</strong> {`📆 ${moment(fecha.fecha).format("dddd, D MMMM, yyyy")}`}
      </div>
      <div style={{ width: "100%" }}>
        <table id="customers">
          <tr>
            <th>N°</th>
            <th>NOMBRES Y APELLIDOS</th>
            <th>N° CÉDULA</th>
            <th>N° TELEFÓNICOS</th>
          </tr>
          {reporte.listadoClientes.map((cliente, index) => {
            return (
              <tr key={"list" + index}>
                <td>{index + 1}</td>
                <td> {`${cliente.nombres}  ${cliente.apellidos}  `}</td>
                <td class="center"> {cliente.documento} </td>
                <td class="center"> {`${cliente.telefono1} - ${cliente.telefono2}  `}</td>
              </tr>
            );
          })}
        </table>
      </div>
      <div>{/* <BotonFlotante></BotonFlotante> */}</div>
    </>
  );
};

export default TablaListaReservas;
