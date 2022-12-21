import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import API from "Environment/config";
import BotonFlotante from "./BotonFlotante";
import PrintIcon from "@mui/icons-material/Print";

import { useReactToPrint } from "react-to-print";
import moment from "moment";
const TablaListaReservas = ({ tour, fecha, titulo, fechaSalida = -1 }) => {
  //   if (fechaSalida == -1) return <div>Cargando datos...</div>;
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
  const componentRef = useRef();
  const fn_imprimir = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: pageStyle,
  });

  const [reporte, setReporte] = useState([]);

  const cargarReporte = async () => {
    const jsonTours = await API.get(`/reporte/titulares/${fechaSalida}`);
    setReporte(jsonTours.data);
  };

  useEffect(() => {
    cargarReporte();
  }, []);

  const isNull = (dato) => {
    if (dato === null) return "";
    if (dato === undefined) return "";
    return dato;
  };
  if (reporte?.listadoClientes == null) return <div>Cargando Datos</div>;
  return (
    <>
      <PrintIcon title="Imprimir" style={{ cursor: "pointer" }} onClick={fn_imprimir} />

      <div ref={componentRef}>
        <center>
          <h1>{titulo} </h1>
        </center>

        <div>
          <strong>FECHA DE SALIDA:</strong>{" "}
          {`📆 ${moment(fecha.fecha).format("dddd, D MMMM, yyyy")}`}
        </div>

        <div>
          <strong>FECHA DE RETORNO:</strong>{" "}
        </div>
        <div>
          <strong>RUTA:</strong> {tour.titulo}{" "}
        </div>
        <div>
          <strong>PLACA DE BUS:</strong>{" "}
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
                  <td class="center">
                    {`${isNull(cliente.telefono1)} - ${isNull(cliente.telefono2)}  `}
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
        <div>{/* <BotonFlotante></BotonFlotante> */}</div>
      </div>
    </>
  );
};

export default TablaListaReservas;
