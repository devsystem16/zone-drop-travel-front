import React, { useState, useEffect, useContext } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useLocation, Link } from "react-router-dom";
import FaceIcon from "@mui/icons-material/Face";
import Chip from "@mui/material/Chip";

import Button from "@mui/material/Button";
import API from "Environment/config";
import moment from "moment";
// import "./Style2.css";

import IconButton from "@mui/material/IconButton";
import AcompañanteIcon from "@mui/icons-material/Wc";
import PaidIcon from "@mui/icons-material/Paid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import SummarizeIcon from "@mui/icons-material/Summarize";

import ReceiptIcon from "@mui/icons-material/Receipt";

// Import Modals
import ModalAbonar from "./ModalAbonar";
import ModalListadoAbonos from "./ModalListadoAbonos";
import ModalListadoAcompañantes from "./ModalListadoAcompañantes";
import ModalVoucher from "./ModalVoucher";
import ModalEditarReserva from "./ModalEditarReserva";

import { RegistroTourClienteContext } from "../tours/context/RegistroTourClienteContext";

const Reservas = () => {
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

  const { modalTourRegistroCliente, setModalTourRegistroCliente } = useContext(
    RegistroTourClienteContext
  );

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
  const [openModalEditarReserva, setOpenModalEditarReserva] = React.useState(false);
  const [dataReserva, setDataReserva] = React.useState(null);

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

  const [datos, setDatos] = useState([]);

  const eventClickGenerarVoucher = async (data) => {
    const jsonTours = await API.get(`/reserva/voucher/generar/${data.id}`);

    setDatos(jsonTours.data);
    setOpenModalVoucher(true);
  };

  const eliminarReserva = async (id) => {
    const jsonTours = await API.post(`/reserva/procesos/eliminar/${id}`);

    setReload(true);
  };
  const eventClickElimnar = async (data) => {
    alertify
      .confirm(
        "",
        `Sel eliminará la reserva del Sr/a: <br></br> <strong> ${data.nombres}  ${data.apellidos}  </strong>   <br></br>  ¿Está seguro?`,
        function () {
          eliminarReserva(data.id);
        },
        function () {}
      )
      .set("labels", { ok: "Si, eliminar", cancel: "Cancelar" });
  };

  const fn_editarReserva = (reserva) => {
    //alert(JSON.stringify(reserva));
    setDataReserva(reserva);
    // setOpenModalEditarReserva(true);

    setModalTourRegistroCliente(true);
  };

  if (reporte?.listadoClientes == null)
    return (
      <DashboardLayout>
        <DashboardNavbar absolute isMini={false} />
        <div>Cargando Datos</div>
      </DashboardLayout>
    );

  const isNull = (dato) => {
    if (dato === null) return "0";
    if (dato === undefined) return "0";
    return dato;
  };

  const verificarNull = (dato) => {
    if (dato === null) return "";
    else return dato;
  };
  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini={false} />
      <ModalEditarReserva
        setReload={setReload}
        // openModal={openModalEditarReserva}
        openModal={modalTourRegistroCliente}
        // setOpenModal={setOpenModalEditarReserva}
        setOpenModal={setModalTourRegistroCliente}
        dataReserva={dataReserva}
      ></ModalEditarReserva>
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
              <th>(-)Descuentos</th>
              <th>(-)Comisión Ag.</th>
              <th>(+)Costo adic.</th>
              <th>Abonado</th>
              <th>Total</th>
              <th>Acompañantes</th>
              <th>Observaciones</th>
              <th>Opciones</th>
            </tr>
            {reporte.listadoClientes.map((cliente, index) => {
              return (
                <tr key={"list" + index}>
                  <td>{index + 1}</td>

                  <td class="center"> {cliente.documento} </td>
                  <td> {`${cliente.nombres}  ${cliente.apellidos}  `}</td>

                  <td class="center">
                    {`${verificarNull(cliente.telefono1)} - ${verificarNull(cliente.telefono2)}  `}
                  </td>

                  <td class="center"> {` $ ${cliente.descuento}   `} </td>
                  <td class="center"> {` $ ${cliente.comisionAgencia}  `} </td>
                  <td class="center"> {` $ ${isNull(cliente.costoAdicional)}  `} </td>

                  <td class="center"> $ {CalcularAbonos(cliente.abonos)} </td>
                  <td class="center">
                    {" "}
                    {`$ ${
                      cliente.totalCalculado - cliente.totalDescuento + cliente.costoAdicional
                    }`}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Chip
                      onClick={() => eventClickListadoAcompañantes(cliente.acompañantes)}
                      style={{ cursor: "pointer" }}
                      icon={<FaceIcon />}
                      label={cliente.acompañantes.length - 1}
                      variant="outlined"
                    />
                  </td>

                  <td style={{ textAlign: "left" }}> {cliente.observaciones}</td>
                  <td class="center">
                    <IconButton
                      disabled={
                        CalcularAbonos(cliente.abonos) ==
                        cliente.totalCalculado - cliente.totalDescuento
                          ? true
                          : false
                      }
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
                      <ReceiptIcon fontSize="inherit" />
                    </IconButton>

                    <IconButton
                      onClick={() => fn_editarReserva(cliente)}
                      title="Editar Reserva"
                      aria-label="delete"
                      size="small"
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>

                    <IconButton
                      onClick={() => eventClickElimnar(cliente)}
                      title="Eliminar"
                      aria-label="delete"
                      size="small"
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
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

        <ModalVoucher
          datos={datos}
          open={openModalVoucher}
          setOpen={setOpenModalVoucher}
        ></ModalVoucher>
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
