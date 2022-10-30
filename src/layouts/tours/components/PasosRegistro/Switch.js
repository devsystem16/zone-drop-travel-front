import TourFormulario from "./TourFormulario";
import TourProgramacionFechas from "./TourProgramacionFechas";
import TourPrecios from "./TourPrecios";
import TourLugaresSalida from "./TourLugaresSalida/TourLugaresSalida";

const Switch = ({ step, editing, tour }) => {
  if (step == 1) return <TourFormulario editing={editing} dataTour={tour} />;
  if (step == 2) return <TourPrecios editing={editing} dataTour={tour} />;
  if (step == 3) return <TourProgramacionFechas editing={editing} EditingTour={tour} />;
  if (step == 4) return <TourLugaresSalida editing={editing} EditingTour={tour} />;
};

export default Switch;
