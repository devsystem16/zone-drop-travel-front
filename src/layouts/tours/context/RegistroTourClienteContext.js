import React, { createContext, useState, useEffect } from "react";
import API from "../../../Environment/config";
export const RegistroTourClienteContext = createContext();

const RegistroTourClienteProvider = (props) => {
  const [modalTourRegistroCliente, setModalTourRegistroCliente] = useState(false);

  /// Cliente titular del registro del paseo
  const [cliente, setCliente] = useState({
    documento: "",
    tipoDocumento: "cedula",
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    correo: "",
    genero: "Masculino",
    direccion: "",
    telefono1: "",
    telefono2: "",
    telefono3: "",
    observaciones: "",
    estado: true,
    tipoCliente: null,
    tipo_acompanante_id: -1,
    existente: false,
  });

  // Acompañantes del cliente titular del registro.
  const [acompañantes, setAcompañantes] = useState([]);
  const [banco, setBanco] = useState(null);
  const [habitciones, setHabitaciones] = useState([]);
  const [lugarSalida, SetLugarSalida] = useState(null);
  const [currentComponent, setCurrentComponent] = useState({
    complete: false,
    component: "not load",
  });
  const [informacionPagos, setInformacionPagos] = useState({
    esAgencia: false,
    descuentoAgencia: 0,
    abono: 0,
    descuento: 0,
    tipoTransaccion: "",
    numeroDeposito: "",
    fechaDeposito: "",
    observaciones: "",
  });

  const resetear = (opcion) => {
    if (opcion === "cliente" || "all") {
      setCliente({
        documento: "",
        tipoDocumento: "cedula",
        nombres: "",
        apellidos: "",
        fechaNacimiento: "",
        correo: "",
        genero: "Masculino",
        direccion: "",
        telefono1: "",
        telefono2: "",
        telefono3: "",
        observaciones: "",
        estado: true,
        tipoCliente: null,
      });
    }
    if (opcion === "informacionPagos" || "all") {
      setInformacionPagos({
        esAgencia: false,
        descuentoAgencia: 0,
        abono: 0,
        descuento: 0,
        tipoTransaccion: "",
        numeroDeposito: "",
        fechaDeposito: "",
        observaciones: "",
      });
    }
    if (opcion === "banco" || "all") {
      setBanco(null);
    }
    if (opcion === "acompañantes" || "all") {
      setAcompañantes([]);
    }
    if (opcion === "lugarSalida" || "all") {
      SetLugarSalida(null);
    }

    // if (opcion === "informacionPagos" || "all") {
    // }
  };
  const validar = (option) => {
    switch (option) {
      case "component-registro-titular":
        return validarCliente();

      case "component-acompañantes":
        break;
      case "component-lugares-salida":
        return validarLugarSalida();

      case "component-informacion-pago":
        break;
    }
    return { estado: true, mensaje: "Datos correctos" };
  };

  const validarCliente = () => {
    if (cliente.documento === "")
      return { estado: false, mensaje: "Ingrese el documento del cliente" };
    if (cliente.nombres === "")
      return { estado: false, mensaje: "Ingrese los nombres del cliente" };
    if (cliente.apellidos === "")
      return { estado: false, mensaje: "Ingrese los apellidos del cliente" };
    if (cliente.fechaNacimiento === "")
      return { estado: false, mensaje: "Seleccione la fecha de nacimiento" };
    if (cliente.correo === "") return { estado: false, mensaje: "Ingrese un correo" };
    if (cliente.direccion === "") return { estado: false, mensaje: "Falta la dirección" };
    if (cliente.telefono1 === "") return { estado: false, mensaje: "El teléfono 1 es obligatorio" };

    if (cliente?.tipoCliente === null || cliente?.tipoCliente === undefined)
      return { estado: false, mensaje: "Seleccione el tipo de cliente" };

    return { estado: true, mensaje: "Datos correctos" };
  };

  const validarLugarSalida = () => {
    if (lugarSalida === null)
      return { estado: false, mensaje: "Seleccionar un lugar de salida es obligatorio" };
    else return { estado: true, mensaje: "Datos correctos" };
  };

  const validarFormularioPago = () => {
    if (banco === null)
      return { estado: false, mensaje: "Seleccionar un lugar de salida es obligatorio" };
    else return { estado: true, mensaje: "Datos correctos" };
  };

  const buscarCliente = async (id) => {
    try {
      var response = await API.get("/cliente/find/" + id);
      if (response.status !== 200) {
        alert("No encontrado");
        return;
      }
      setCliente(response.data);
    } catch (error) {
      alert("Ocurrió un error.", error);
      console.error(error);
      return;
    }
  };
  const guardarCliente = async () => {
    const response = null;
    try {
      response = await API.post("/cliente", cliente);
    } catch (error) {
      alert("Ocurrió un error.", error);
      return;
    }

    resetear("all");
    alert("Cliente Guardado");
  };

  const registrarInscripcion = async () => {
    setModalTourRegistroCliente(false);
    var reserva = {
      cliente: cliente,
      programacion_fecha_id: localStorage.getItem("programacion_fecha_id"),
      acompaniantes: acompañantes,
      informacionPagos: informacionPagos,
      bancoId: banco,
      habitaciones: habitciones,
      lugarSalida: lugarSalida,
    };
    console.log("DATOS DE RESERVA", reserva);
    try {
      var response = await API.post("/reserva", reserva);
      if (response.status === 200) {
        resetear("all");

        alertify.success(response.data.sussesMessage);
      } else {
        alertify.error(response.data.errorMessage);
      }
    } catch (error) {}
  };

  return (
    <RegistroTourClienteContext.Provider
      value={{
        modalTourRegistroCliente,
        setModalTourRegistroCliente,
        cliente,
        setCliente,
        guardarCliente,
        acompañantes,
        setAcompañantes,
        setHabitaciones,
        lugarSalida,
        SetLugarSalida,
        buscarCliente,
        informacionPagos,
        setInformacionPagos,
        banco,
        setBanco,
        registrarInscripcion,
        resetear,
        currentComponent,
        setCurrentComponent,
        validar,
      }}
    >
      {props.children}
    </RegistroTourClienteContext.Provider>
  );
};
export default RegistroTourClienteProvider;
