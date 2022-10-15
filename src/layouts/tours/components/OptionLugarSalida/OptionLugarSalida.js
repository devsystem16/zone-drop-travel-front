import * as React from "react";

import { useContext } from "react";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { TourContext } from "../../context/TourContext";

export default function OptionLugarSalida() {
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

      {listLugaresSalida.map((lugar) => {
        return (
          <Chip
            label={`${lugar.descripcion}  (${lugar.hora})`}
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
