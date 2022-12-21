import TourFormulario from "./TourFormulario";
import TourProgramacionFechas from "./TourProgramacionFechas";
import TourPrecios from "./TourPrecios";
import TourLugaresSalida from "./TourLugaresSalida/TourLugaresSalida";

const Switch = ({ step, editing, tour }) => {
  if (editing) {
    if (step == 1) return <TourFormulario editing={editing} dataTour={tour} />;
    // if (step == 2) return <TourPrecios editing={editing} dataTour={tour} />;
    if (step == 2) return <TourLugaresSalida editing={editing} dataTour={tour} />;
  } else {
    if (step == 1) return <TourFormulario editing={editing} dataTour={tour} />;
    if (step == 2) return <TourPrecios editing={editing} dataTour={tour} />;
    if (step == 3) return <TourProgramacionFechas editing={editing} dataTour={tour} />;
    if (step == 4) return <TourLugaresSalida editing={editing} EditingTour={tour} />;
  }
};

export default Switch;
