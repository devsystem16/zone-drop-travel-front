import React, { createContext, useState, useEffect, useContext } from "react";
import API from "../../../Environment/config";
import { RegistroTourClienteContext } from "./RegistroTourClienteContext";

export const TourContext = createContext();

const TourProvider = (props) => {
  const { setReloadListaTours } = useContext(RegistroTourClienteContext);

  const [modalTourRegistroCliente, setModalTourRegistroCliente] = useState(false);
  const [tour, setTour] = useState({
    titulo: "",
    duracion: "",
    detalles: "",
    incluye: "",
    imagen: "",
    estado: true,
    noIncluye: "",
    informacionAdicional: "",
    lugaresSalidas: null,
    programacionFechas: null,
  });
  const [precios, setPrecios] = useState({});
  const [listLugaresSalida, setListLugaresSalida] = useState([]);

  const guardarTour = async () => {
    const datos = {
      ...tour,
      lugaresSalidas: listLugaresSalida,
    };
    const cadena = JSON.stringify(datos);
    const jsonDatos = JSON.parse(cadena.replace(/\\n/g, "<br />"));
    setTour(jsonDatos);

    const response = await API.post("/tour", jsonDatos);

    if (response.status === 200) {
      setTour({
        titulo: "",
        duracion: "",
        detalles: "",
        incluye: "",
        imagen: "",
        estado: true,
        noIncluye: "",
        informacionAdicional: "",
        lugaresSalidas: null,
        programacionFechas: null,
      });
      setPrecios({});
      setListLugaresSalida([]);
      setReloadListaTours(true);
      alertify.success("Guardado correctamente.");
    } else {
      alertify.error("Error al guardar");
    }
  };

  const ActualizarPrecios = async (programacionFecha) => {
    try {
      Object.keys(precios).map((datos) => {
        if (precios[datos].valor === "") {
          delete precios[datos];
        }
      });

      if (Object.keys(precios).length === 0) {
        return { codigo: 404, mensaje: "Ningún Registro Actualizado" };
      }
      var request = {
        precios: precios,
      };

      const response = await API.post(`/tour/actualizar-precio/${programacionFecha.id}`, request);

      if (response.status === 209) {
        return { codigo: 209, mensaje: response.data.Message };
      }

      if (response.status !== 200) {
        return { codigo: 500, mensaje: "Ocurrió un error" };
      }

      setPrecios({});
      setReloadListaTours(true);
      // alertify.success(response.data.Message);
      return { codigo: 200, mensaje: response.data.Message };
    } catch (error) {
      //alertify.error("Error al Actualizar");
      return { codigo: 500, mensaje: "Ocurrió un error" };
    }
  };
  const ActualizarTour = async () => {
    const datos = {
      ...tour,
      lugaresSalidas: listLugaresSalida,
    };
    const cadena = JSON.stringify(datos);
    const jsonDatos = JSON.parse(cadena.replace(/\\n/g, "<br />"));
    setTour(jsonDatos);

    const response = await API.post(`/tour/actualizar/${jsonDatos.id}`, jsonDatos);

    if (response.status === 200) {
      setTour({
        titulo: "",
        duracion: "",
        detalles: "",
        incluye: "",
        imagen: "",
        estado: true,
        noIncluye: "",
        informacionAdicional: "",
        lugaresSalidas: null,
        programacionFechas: null,
      });
      setPrecios({});
      setListLugaresSalida([]);
      setReloadListaTours(true);
      alertify.success("Actualizado correctamente.");
    } else {
      alertify.error("Error al guardar");
    }
  };

  const validar = (option, editing = false) => {
    switch (option) {
      case "component-informacion-tour":
        return validarInformacionTour();

      case "component-registro-precios":
        return validarInformacionPrecios(editing);

      case "component-programacion-fechas":
        return validarInformacionFechas(editing);

      case "component-lugares-salida":
        return validarLugaresSalida(editing);
    }
    return { estado: true, mensaje: "Datos correctos" };
  };

  const validarInformacionTour = () => {
    if (tour.titulo === "") return { estado: false, mensaje: "Ingrese el titulo del Tour" };
    // if (tour.duracion === "") return { estado: false, mensaje: "Falta la duración del tour" };
    // if (tour.detalles === "") return { estado: false, mensaje: "Ingrese los detalles" };
    // if (tour.incluye === "")
    //   return { estado: false, mensaje: "Falta colocar que servicios incluye el tour" };
    // if (tour.noIncluye === "")
    //   return { estado: false, mensaje: "Falta colocar que servicios NO incluye el tour" };

    return { estado: true, mensaje: "Datos correctos" };
  };
  const validarInformacionPrecios = (editing = false) => {
    if (editing) return { estado: true, mensaje: "Datos correctos" };
    if (Object.keys(precios).length === 0)
      return { estado: false, mensaje: "Configure con Mayor a 0 al menos 1 Precio." };
    return { estado: true, mensaje: "Datos correctos" };
  };
  const validarInformacionFechas = (editing) => {
    // if (editing) return { estado: true, mensaje: "Datos correctos" };

    if (tour.programacionFechas === null)
      return { estado: false, mensaje: "Configure al menos 1 fecha." };
    return { estado: true, mensaje: "Datos correctos" };
  };
  const validarLugaresSalida = (editing) => {
    if (editing) return { estado: true, mensaje: "Datos correctos" };

    if (listLugaresSalida.length === 0)
      return { estado: false, mensaje: "Configure al menos 1 lugar de salida." };
    return { estado: true, mensaje: "Datos correctos" };
  };

  return (
    <TourContext.Provider
      value={{
        tour,
        validar,
        setTour,
        precios,
        setPrecios,
        guardarTour,
        ActualizarTour,
        listLugaresSalida,
        setListLugaresSalida,
        modalTourRegistroCliente,
        setModalTourRegistroCliente,
        ActualizarPrecios,
      }}
    >
      {props.children}
    </TourContext.Provider>
  );
};

export default TourProvider;
