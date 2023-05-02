import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import API from "Environment/config";
import BotonFlotante from "./BotonFlotante";
import PrintIcon from "@mui/icons-material/Print";

import { useReactToPrint } from "react-to-print";
import moment from "moment";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

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

  const [formatoANT, setFormatoANT] = useState(false);
  const handleChange = (event) => {
    setFormatoANT(event.target.checked);
    // setReloadListaTours(true);
  };

  if (reporte?.listadoClientes == null) return <div>Cargando Datos</div>;

  if (formatoANT)
    return (
      <>
        <PrintIcon title="Imprimir" style={{ cursor: "pointer" }} onClick={fn_imprimir} />
        <FormGroup className="siwtchANT">
          <FormControlLabel
            control={<Switch checked={formatoANT} onChange={handleChange} />}
            label="Formato ANT"
          />
        </FormGroup>
        <div ref={componentRef}>
          <div style={{ fontfamily: "Verdana", color: "black", width: "90%", margin: "auto" }}>
            <img
              className="imagenANT"
              src="https://zonetravel.s3.us-east-2.amazonaws.com/agenciaNacionalTransito.png"
            ></img>
            <center style={{ fontSize: "22px" }}>ANEXO No. 1</center>

            <table id="customersANT">
              <tr>
                <th colSpan={4} className="ant color textoAnt">
                  <center>LISTA DE PASAJEROS</center>
                </th>
              </tr>
              <tr>
                <th className="ant">No</th>
                <th className="ant"> </th>
                <th className="ant">NACIONALIDAD</th>
                <th className="ant">CÉDULA/PASAPORTE</th>
                {/* <th>N° TELEFÓNICOS</th> */}
              </tr>

              {reporte.listadoClientes.map((cliente, index) => {
                return (
                  <tr key={"list" + index}>
                    <td style={{ textAlign: "center" }}>{index + 1}</td>
                    <td style={{ textAlign: "center", width: "40%" }}>
                      {`${cliente.nombres.toUpperCase()}  ${cliente.apellidos.toUpperCase()}  `}
                    </td>

                    <td class="center"> {cliente?.nacionalidad} </td>
                    <td class="center"> {cliente.documento.toUpperCase()} </td>
                    {/* <td class="center">
                    {`${isNull(cliente.telefono1)} - ${isNull(cliente.telefono2)}  `}
                  </td> */}
                  </tr>
                );
              })}

              {/* <tr key="4k">
                <td> {reporte.listadoClientes.length + 1}</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr key="4k1">
                <td>{reporte.listadoClientes.length + 2}</td>
                <td></td>
                <td></td>
                <td></td>
              </tr> */}
            </table>
          </div>
          <div>{/* <BotonFlotante></BotonFlotante> */}</div>
        </div>
      </>
    );

  return (
    <>
      <PrintIcon title="Imprimir" style={{ cursor: "pointer" }} onClick={fn_imprimir} />
      <FormGroup className="siwtchDROPZONE">
        <FormControlLabel
          control={<Switch checked={formatoANT} onChange={handleChange} />}
          label="Ver Formato ANT"
        />
      </FormGroup>
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
                  <td>
                    {`${cliente.nombres.toUpperCase()}  ${cliente.apellidos.toUpperCase()}  `}
                  </td>
                  <td class="center"> {cliente.documento.toUpperCase()} </td>
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
