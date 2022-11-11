import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useLocation, Link } from "react-router-dom";
import FaceIcon from "@mui/icons-material/Face";
import Chip from "@mui/material/Chip";

import Button from "@mui/material/Button";
import API from "Environment/config";
import moment from "moment";
import "./style.css";

import IconButton from "@mui/material/IconButton";
import AcompañanteIcon from "@mui/icons-material/Wc";
import PaidIcon from "@mui/icons-material/Paid";

import SummarizeIcon from "@mui/icons-material/Summarize";

// Import Modals
import ModalAbonar from "./ModalAbonar";
import ModalListadoAbonos from "./ModalListadoAbonos";
import ModalListadoAcompañantes from "./ModalListadoAcompañantes";
import ModalVoucher from "./ModalVoucher";

const Reservas = () => {
  const codigo = useLocation().pathname.split("/").slice(1);
  const [reporte, setReporte] = useState([]);

  const [reload, setReload] = useState(true);

  // data
  const [abonosListado, setAbonosListado] = useState([]);
  const [acompañantesListado, setAcompañantesListado] = useState([]);

  //   Modals
  const [openAbonar, setOpenAbonar] = React.useState(false);
  const [openListadoAbonos, setOpenListadoAbonos] = React.useState(false);
  const [openListadoAcompañantes, setOpenListadoAcompañantes] = React.useState(false);
  const [openModalVoucher, setOpenModalVoucher] = React.useState(false);

  const cargarReporte = async () => {
    const jsonTours = await API.get(`/reserva/listado/titulares/${codigo[codigo.length - 1]}`);

    setReporte(jsonTours.data);
  };

  useEffect(() => {
    if (reload) {
      cargarReporte();
      setReload(false);
    }
  }, [reload]);

  const eventClickAbonar = (reserva_id, abonado, total, cliente) => {
    var datos = {
      reserva_id: reserva_id,
      abonado: abonado,
      total: total,
      nombres: `${cliente.nombres}  ${cliente.apellidos}  `,
    };
    localStorage.setItem("abonoDatos", JSON.stringify(datos));

    setOpenAbonar(true);
  };

  const eventClickListadoAbonos = (abonos) => {
    setAbonosListado(abonos);
    setOpenListadoAbonos(true);
  };

  const eventClickListadoAcompañantes = (acompañantes) => {
    setAcompañantesListado(acompañantes);
    setOpenListadoAcompañantes(true);
  };

  const eventClickGenerarVoucher = (data) => {
    // alert(JSON.stringify(data));
    setOpenModalVoucher(true);
    // setAbonosListado(abonos);
    // setOpenListadoAbonos(true);
  };

  if (reporte?.listadoClientes == null)
    return (
      <DashboardLayout>
        <DashboardNavbar absolute isMini={false} />
        <div>Cargando Datos</div>
      </DashboardLayout>
    );
  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini={false} />

      <>
        <center>
          <h1>Reservas</h1>
        </center>
        <div>
          <strong>RUTA:</strong> {reporte.informacionTour.titulo}{" "}
        </div>
        <div>
          <strong>FECHA DE SALIDA:</strong>{" "}
          {`📆 ${moment(reporte.informacionTour.fecha_salida).format("dddd, D MMMM, yyyy")}`}
        </div>
        <div style={{ width: "100%" }}>
          <table id="customers">
            <tr>
              <th>N°</th>
              <th>N° CÉDULA</th>
              <th>NOMBRES Y APELLIDOS</th>

              <th>N° TELEFÓNICOS</th>
              <th>Abonado</th>
              <th>Total</th>
              <th>Acompañantes</th>
              <th>Opciones</th>
            </tr>
            {reporte.listadoClientes.map((cliente, index) => {
              return (
                <tr key={"list" + index}>
                  <td>{index + 1}</td>

                  <td class="center"> {cliente.documento} </td>
                  <td> {`${cliente.nombres}  ${cliente.apellidos}  `}</td>

                  <td class="center"> {`${cliente.telefono1} - ${cliente.telefono2}  `}</td>

                  <td class="center"> $ {CalcularAbonos(cliente.abonos)} </td>
                  <td class="center"> {`$ ${cliente.totalCalculado}`}</td>
                  <td style={{ textAlign: "center" }}>
                    <Chip
                      onClick={() => eventClickListadoAcompañantes(cliente.acompañantes)}
                      style={{ cursor: "pointer" }}
                      icon={<FaceIcon />}
                      label={cliente.acompañantes.length - 1}
                      variant="outlined"
                    />
                  </td>
                  <td class="center">
                    <IconButton
                      onClick={() =>
                        eventClickAbonar(
                          cliente.id,
                          CalcularAbonos(cliente.abonos),
                          cliente.total,
                          cliente
                        )
                      }
                      title="Abonar"
                      aria-label="delete"
                      size="small"
                    >
                      <PaidIcon fontSize="inherit" />
                    </IconButton>

                    <IconButton
                      onClick={() => eventClickListadoAbonos(cliente.abonos)}
                      title="Vér Abonos"
                      aria-label="delete"
                      size="small"
                    >
                      <SummarizeIcon fontSize="inherit" />
                    </IconButton>

                    <IconButton
                      onClick={() => eventClickGenerarVoucher(cliente)}
                      title="Generar Voucher"
                      aria-label="delete"
                      size="small"
                    >
                      <SummarizeIcon fontSize="inherit" />
                    </IconButton>
                    {/* <IconButton
                      onClick={() => eventClickListadoAcompañantes(cliente.acompañantes)}
                      title="Vér Acompañantes"
                      aria-label="delete"
                      size="small"
                    >
                      <AcompañanteIcon fontSize="inherit" />
                    </IconButton> */}
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
        <div>{/* <BotonFlotante></BotonFlotante> */}</div>

        <ModalAbonar setReload={setReload} open={openAbonar} setOpen={setOpenAbonar}></ModalAbonar>

        <ModalListadoAbonos
          setReload={setReload}
          open={openListadoAbonos}
          setOpen={setOpenListadoAbonos}
          abonos={abonosListado}
        ></ModalListadoAbonos>

        <ModalListadoAcompañantes
          setReload={setReload}
          open={openListadoAcompañantes}
          setOpen={setOpenListadoAcompañantes}
          acompañantes={acompañantesListado}
        ></ModalListadoAcompañantes>

        <ModalVoucher open={openModalVoucher} setOpen={setOpenModalVoucher}></ModalVoucher>
      </>
    </DashboardLayout>
  );
};

const CalcularAbonos = (abonos) => {
  var suma = 0;
  if (abonos === undefined) return <span> $0</span>;
  abonos.forEach(function (abono) {
    suma += abono.valor;
  });
  return suma;
};

export default Reservas;
