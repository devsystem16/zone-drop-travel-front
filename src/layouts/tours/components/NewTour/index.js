import * as React from "react";
import PasosRegistro from "../PasosRegistro/index";
import  TourProvider from  "../../context/TourContext"

export default function NewTour() {
  return  (
  <TourProvider>
    <PasosRegistro></PasosRegistro>
  </TourProvider>)
}
