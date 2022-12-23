import React, { useEffect, useState } from "react";

import ListaLugaresSalida from "../../ListaLugaresSalida/ListaLugaresSalida";
import OptionLugarSalida from "../../OptionLugarSalida/OptionLugarSalida";
import API from "../../../../../Environment/config";

export default function TourLugaresSalida({ editing, dataTour }) {
  const [lugaresSalida, setLugaresSalida] = useState([]);

  const cargarLugaresSalida = async () => {
    const jsonLugaresSalida = await API.get("/lugaressalidas");
    console.log(jsonLugaresSalida.data);
    setLugaresSalida(jsonLugaresSalida.data);
  };

  useEffect(() => {
    localStorage.setItem("current_component", "component-lugares-salida");
    cargarLugaresSalida();
  }, []);

  return (
    <div>
      <ListaLugaresSalida lugaresSalida={lugaresSalida}></ListaLugaresSalida>
      <br></br>
      {editing ? (
        <>
          <OptionLugarSalida editing={editing} data={dataTour.lugaresSalidas} />
        </>
      ) : (
        <>
          <OptionLugarSalida editing={editing} data={null}></OptionLugarSalida>
        </>
      )}
    </div>
  );
}
