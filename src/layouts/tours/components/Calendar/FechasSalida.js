import { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { TourContext } from "../../context/TourContext";

export default function FechasSalida({ value, setValue }) {
  const today = new Date();
  const tomorrow = new Date();
  const weekDays = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

  tomorrow.setDate(tomorrow.getDate() + 1);
  // const [fechasSalida, setFechasSalida] = useState([]);

  // const { tour, setTour, precios } = useContext(TourContext);

  const months = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  useEffect(() => {
    localStorage.setItem("current_component", "component-programacion-fechas");
  }, []);
  return (
    <>
      <DatePicker
        style={{ width: "47ch" }}
        weekDays={weekDays}
        months={months}
        multiple
        onChange={(array) => {
          var arrayProgramacionFechas = [];
          var datos = array.join().split(",");
          datos.map((fecha) => {
            var jsonDatos = {};
            jsonDatos.fecha = fecha;
            arrayProgramacionFechas.push(jsonDatos);
          });
          setValue(arrayProgramacionFechas);
        }}
        plugins={[<DatePanel />]}
      />
    </>
  );
}
