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
  const [banco, setBanco] = useState([]);
  const [habitciones, setHabitaciones] = useState([]);
  const [lugarSalida, SetLugarSalida] = useState([]);
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
    });
    alert("Cliente Guardado");
  };

  const registrarInscripcion = () => {
    setModalTourRegistroCliente(false);
    var datos = {
      cliente: cliente,
      programacion_fecha_id: localStorage.getItem("programacion_fecha_id"),
      acompaniantes: acompañantes,
      informacionPagos: informacionPagos,
      bancoId: banco,
      habitaciones: habitciones,
      lugarSalida: lugarSalida,
    };
    alert(JSON.stringify(datos));
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
      }}
    >
      {props.children}
    </RegistroTourClienteContext.Provider>
  );
};
export default RegistroTourClienteProvider;
