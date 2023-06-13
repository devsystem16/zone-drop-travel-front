import React, { useState } from "react";

import { useContext } from "react";

import Chip from "@mui/material/Chip";

import { TourContext } from "../../context/TourContext";

import { RegistroTourClienteContext } from "../../context/RegistroTourClienteContext";

import Modal from "../../../../components/Modal";
import Loading from "../../../../components/Loading/Loading";
import { Button } from "@mui/material";

export default function OptionLugarSalida({ editing, data }) {
  const {
    listLugaresSalida,
    setListLugaresSalida,
    eliminarLugarSalidaTour,
    eliminarLugarSalidaTourForzado,
  } = useContext(TourContext);
  const [isLoading, setIsLoading] = useState(false);

  const EliminarLugar = (lugar) => {
    // Funcion que elimina un lugar de salida, recien añadido que aun no esta en Base de datos.
    const results = listLugaresSalida.filter((itemLugar) => {
      return !(itemLugar.descripcion === lugar.descripcion);
    });
    setListLugaresSalida(results);
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <Loading open={isLoading} text="Quitando..."></Loading>

      {/* Lugares de salida cargados desde la base de datos. */}
      <LugaresSalidaActual
        editing={editing}
        data={data}
        eliminarLugarSalidaTour={eliminarLugarSalidaTour}
        eliminarLugarSalidaTourForzado={eliminarLugarSalidaTourForzado}
        setIsLoading={setIsLoading}
      />

      {/* Lugares de salida que se añaden nuevos al editar. */}
      {listLugaresSalida.map((lugar) => {
        return (
          <Chip
            label={<TextOptionTour luggarSalida={lugar} />} //{`${lugar.descripcion}  (${lugar.hora})`}
            variant="outlined"
            // onClick={handleClick}
            onDelete={() => EliminarLugar(lugar)}
          />
        );
      })}
    </div>
  );
}

const LugaresSalidaActual = ({
  editing,
  data,
  eliminarLugarSalidaTour,
  setIsLoading,
  eliminarLugarSalidaTourForzado,
}) => {
  const { setReloadListaTours } = useContext(RegistroTourClienteContext);
  const [lugaresSalidasBD, setLugaresSalidasBD] = useState(data);

  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState(null);

  const eliminarLugarSalidaDB = async (lugarSalida) => {
    setIsLoading(true);
    const response = await eliminarLugarSalidaTour(lugarSalida.id);
    setIsLoading(false);

    if (!response.permiteEliminar) {
      alertify.error("No se permite Eliminar.");
      setContent(
        ListadoClientes(
          response,
          lugarSalida.id,
          setIsLoading,
          setOpen,
          setReloadListaTours,
          lugaresSalidasBD,
          setLugaresSalidasBD
        )
      );
      setOpen(true);
      return;
    }

    const nuevoArray = lugaresSalidasBD.filter((item) => item.id !== lugarSalida.id);
    setLugaresSalidasBD(nuevoArray);
    setReloadListaTours(true);
  };

  const ListadoClientes = (
    response,
    idLugarSalida,
    setCargando,
    setOpenModal,
    setReloadListaTours = null,
    lugaresSalidasBD,
    setLugaresSalidasBD
  ) => {
    // const [isLoadingBtn, setIsLoadingBtn] = useState(false);

    const forzarEliminacion = async (idLugarSalida) => {
      // setIsLoadingBtn(true);
      setCargando(true);
      const response = await eliminarLugarSalidaTourForzado(idLugarSalida);

      const nuevoArray = lugaresSalidasBD.filter((item) => item.id !== idLugarSalida);
      setLugaresSalidasBD(nuevoArray);
      // setIsLoadingBtn(false);

      setCargando(false);
      setOpenModal(false);
      setReloadListaTours(true);
    };
    return (
      <div>
        <h3>Titulares</h3>
        <ul>
          {response?.Titulares.map((cliente) => {
            return <li> {`${cliente.nombres} ${cliente.apellidos}`}</li>;
          })}
        </ul>

        <h3>Acompañantes</h3>
        <ul>
          {response?.Acompañantes.map((cliente) => {
            return <li> {`${cliente.nombres} ${cliente.apellidos}`}</li>;
          })}
        </ul>
        <center>
          <br></br>
          <hr></hr>
          <br></br>
          <Button
            // disabled={isLoadingBtn}
            style={{ color: "red" }}
            variant="outlined"
            color="error"
            onClick={() => forzarEliminacion(idLugarSalida)}
          >
            Eliminar de todas formas
          </Button>
        </center>
      </div>
    );
  };

  if (!editing) return <></>;
  else
    return (
      <>
        <Modal
          open={open}
          setOpen={setOpen}
          content={content}
          title="Personas registradas para este lugar de salida."
        ></Modal>
        {lugaresSalidasBD.map((lugar) => {
          return (
            <Chip
              key={"lug" + lugar.id}
              style={{ backgroundColor: "rgb(209, 230, 240)" }}
              label={<TextOptionTour luggarSalida={lugar} />} //   {`${lugar.descripcion}  (${lugar.hora})`}
              variant="outlined"
              onDelete={() => eliminarLugarSalidaDB(lugar)}
              // onClick={handleClick}
            />
          );
        })}
      </>
    );
};

const TextOptionTour = ({ luggarSalida }) => {
  var html = (
    <div style={{ margin: 5, fontSize: "11px" }}>
      <div>{`${luggarSalida.descripcion}  (${luggarSalida.hora})`}</div>
      <b style={{ fontSize: "10px", color: "rgb(26, 115, 232)" }}>
        {luggarSalida.siguienteDia == true ? "(Sig. día)" : ""}
      </b>
    </div>
  );

  return html;
};

// var html = (
//   <div style={{ margin: 5, fontSize: "11px" }}>
//     <div>
//       <strong>CI: </strong>
//       {`${acompañante.documento} - ${acompañante.nombres} ${acompañante.apellidos}   (${acompañante.tipoAcompañante.descripcion})  $ ${acompañante.tipoAcompañante.precio}  `}
//     </div>
//     <div style={{ fontSize: "9px", color: "rgb(26, 115, 232)" }}>
//       <strong>
//         {` ${isNull(acompañante?.lugarSalida?.descripcion)} ${isNull(
//           acompañante?.lugarSalida?.hora
//         )}`}
//       </strong>
//       {acompañante?.lugarSalida?.siguienteDia ? " (sig. día)" : ""}
//     </div>
//   </div>
// );
