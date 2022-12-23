import * as React from "react";

import { useContext } from "react";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { TourContext } from "../../context/TourContext";

export default function OptionLugarSalida({ editing, data }) {
  const { listLugaresSalida, setListLugaresSalida } = useContext(TourContext);

  const EliminarLugar = (lugar) => {
    const results = listLugaresSalida.filter((itemLugar) => {
      return !(itemLugar.descripcion === lugar.descripcion);
    });
    setListLugaresSalida(results);
  };
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  // const lugaresOp = listLugaresSalida.map((lugar) => {
  //   <>
  //     <Chip
  //       label={lugar.descripcion + "(" + lugar.hora + ")"}
  //       onClick={handleClick}
  //       onDelete={handleDelete}
  //     />
  //     ;
  //   </>;
  // });
  return (
    <div style={{ backgroundColor: "white" }}>
      {/* {lugaresOp} */}
      <LugaresSalidaActual editing={editing} data={data} />
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

      {/* <Chip label="Quicentro Sur (07:00 am)" onClick={handleClick} onDelete={handleDelete} />
      <Chip
        label="Carapungo (06:40 am)"
        variant="outlined"
        onClick={handleClick}
        onDelete={handleDelete}
      />
      <Chip
        label="Tribuna Shirys (06:00 am)"
        variant="outlined"
        onClick={handleClick}
        onDelete={handleDelete}
      /> */}
    </div>
  );
}

const LugaresSalidaActual = ({ editing, data, EliminarLugar }) => {
  if (!editing) return <></>;
  else
    return (
      <>
        {data.map((lugar) => {
          return (
            <Chip
              // key={}
              style={{ backgroundColor: "rgb(209, 230, 240)" }}
              label={<TextOptionTour luggarSalida={lugar} />} //   {`${lugar.descripcion}  (${lugar.hora})`}
              variant="outlined"
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
