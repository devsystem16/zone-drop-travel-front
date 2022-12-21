import React, { useEffect, useState, useContext } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import Chip from "@mui/material/Chip";

import moment from "moment";
// Images
import zone_drop_travel_icon from "assets/images/zone-drop-travel/zone-drop-travel-icon.jpg";
import API from "../../../Environment/config";
import { RegistroTourClienteContext } from "../context/RegistroTourClienteContext";

import OptionTour from "../components/OptionTour/OptionTour";
import OptionFechaSalida from "../components/OptionFechaSalida/OptionFechaSalida";

export default function ToursTableData() {
  const { setModalTourRegistroCliente, listaTours } = useContext(RegistroTourClienteContext);

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

  const [filas, setFilas] = useState([]);
  useEffect(() => {
    // console.log("RECARGA DE TOUR ");
    cargarTours();
  }, [listaTours]);

  const cargarTours = async () => {
    // const jsonTours = await API.get("/tour/listado/tabla");
    const Elementos = listaTours.map((tour) => {
      return {
        lugarDestino: (
          <DestinoTour
            tour={tour}
            image={zone_drop_travel_icon}
            titulo={tour.titulo}
            descripcion={` (${tour?.duracion == null ? "" : tour?.duracion})   ${
              tour?.detalles == null ? "" : tour?.detalles
            }`}
          />
        ),
        fechas_salida: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {tour.programacionFechas.map((fecha, index) => {
              if (saltoLinea(index, 3)) {
                return (
                  <>
                    <OptionFechaSalida
                      fecha={fecha}
                      tour={tour}
                      onClick={clicFecha}
                      onDelete={clicFecha}
                      setModalTourRegistroCliente={setModalTourRegistroCliente}
                    ></OptionFechaSalida>
                    <br />
                    {/* <FechaSalida fecha={fecha} onClick={clicFecha} onDelete={clicFecha} /> <br /> */}
                  </>
                );
              } else {
                return (
                  <OptionFechaSalida
                    tour={tour}
                    fecha={fecha}
                    onClick={clicFecha}
                    onDelete={clicFecha}
                  ></OptionFechaSalida>
                );
                // return <FechaSalida fecha={fecha} onClick={clicFecha} onDelete={clicFecha} />;
              }
            })}
          </MDTypography>
        ),
        incluye: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            <div
              title={tour.incluye}
              dangerouslySetInnerHTML={{ __html: acotarText(tour.incluye) }}
            ></div>

            <div>{/* <strong style={{ color: "#1A73E8" }}>Ver mas</strong> */}</div>
          </MDTypography>
        ),
        noIncluye: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            <div dangerouslySetInnerHTML={{ __html: tour.noIncluye }}></div>
          </MDTypography>
        ),
        lugarSalida: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            {tour.lugaresSalidas.map((lugares, index) => {
              if (saltoLinea(index, 5)) {
                return (
                  <>
                    <LugarSalida lugar={lugares} onClick={clicFecha} onDelete={clicFecha} /> <br />
                  </>
                );
              } else {
                return <LugarSalida lugar={lugares} onClick={clicFecha} onDelete={clicFecha} />;
              }
            })}
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
            <div dangerouslySetInnerHTML={{ __html: tour.informacionAdicional }}></div>
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
      };
    });
    setFilas(Elementos);
  };

  const clicFecha = (id) => {
    localStorage.setItem("programacion_fecha_id", id);
    setModalTourRegistroCliente(true);
  };
  const saltoLinea = (index, columnas) => {
    return (index + 1) % columnas === 0 ? true : false;
  };

  const retornarArray = (cadena) => {
    let lineas = mensaje.split("<br />");
  };

  const acotarText = (text) => {
    if (text.length > 50) return text.substring(0, 50) + "...";
    return text;
  };

  const DestinoTour = ({ tour, image, titulo, descripcion }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <OptionTour tour={tour} image={image}></OptionTour>
      <MDAvatar src={image} name={titulo} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {titulo}
        </MDTypography>
        <MDTypography title={descripcion} variant="caption">
          {acotarText(descripcion)}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const FechaSalida = ({ fecha, onClick, onDelete }) => {
    var title = "";
    fecha.precios.map((precios) => {
      title = title + precios.descripcion + " $" + precios.precio + "     ";
    });
    return (
      <Chip
        label={`📆 ${moment(fecha.fecha).format("MMMM, D")}`}
        variant="outlined"
        title={title}
        sx={{
          color: "info.dark",
          fontWeight: "bold",
          mx: 0.5,
          fontSize: 11,
          cursor: "pointer",
        }}
        onClick={() => onClick(fecha.id)}
        onDelete={() => onDelete(fecha.id)}
      />
    );
  };

  const LugarSalida = ({ lugar, onClick, onDelete }) => {
    return (
      <Chip
        label={`🅿️ ${lugar.descripcion} (${lugar.hora})`}
        variant="outlined"
        sx={{
          color: "info.dark",
          fontWeight: "bold",
          margin: 0.5,
          mx: 0.5,
          fontSize: 11,
          cursor: "pointer",
        }}
        // onClick={() => onClick(lugar.id)}
        // onDelete={() => onDelete(lugar.id)}
      />
    );
  };

  return {
    columns: [
      { Header: "destino", accessor: "lugarDestino", width: "20", align: "left" },
      { Header: "Fechas", accessor: "fechas_salida", align: "left" },
      { Header: "Incluye", accessor: "incluye", align: "left" },
      { Header: "no incluye", accessor: "noIncluye", align: "left" },
      { Header: "Lugares Salida", accessor: "lugarSalida", align: "left" },
      // { Header: "Costos", accessor: "costos", align: "left" },
      // { Header: "reservacion", accessor: "reservacion", align: "left" },
      // { Header: "status", accessor: "status", align: "center" },
      // { Header: "employed", accessor: "employed", align: "center" },
      // { Header: "action", accessor: "action", align: "center" },
    ],

    rows: filas,
  };
}
