import * as React from "react";
import PasosRegistro from "../PasosRegistro/index";
import TourProvider from "../../context/TourContext";

export default function NewTour({ editing = false, tour = null }) {
  return (
    <TourProvider>
      <PasosRegistro editing={editing} tour={tour}></PasosRegistro>
    </TourProvider>
  );
}
