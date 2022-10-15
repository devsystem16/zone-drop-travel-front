import TourFormulario from "./TourFormulario";
import TourProgramacionFechas from "./TourProgramacionFechas";
import TourPrecios from "./TourPrecios";
import TourLugaresSalida from "./TourLugaresSalida/TourLugaresSalida";

const Switch = ({ step }) => {
  if (step == 1) return <TourFormulario />;
  if (step == 2) return <TourPrecios />;
  if (step == 3) return <TourProgramacionFechas />;
  if (step == 4) return <TourLugaresSalida />;
};

export default Switch;
