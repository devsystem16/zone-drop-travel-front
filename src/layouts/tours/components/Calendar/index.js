import {  useContext } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import {TourContext} from '../../context/TourContext'

export default function Example() {
  const today = new Date();
  const tomorrow = new Date();
  const weekDays = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

  tomorrow.setDate(tomorrow.getDate() + 1);
 
  const { tour, setTour , precios } = useContext(TourContext);

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

  

  return (
    <>
      <DatePicker
        style={{ width: 750 }}
        weekDays={weekDays}
        months={months}
        multiple
        onChange={(array) => {
          //console.log("selected dates :\n" + array.join(",\n"));
         var datos = array.join().split(',');
             datos.map(value => {

              var jsonDatos = { } ;
              jsonDatos.fecha = value ;
              jsonDatos.observacion = "";
              jsonDatos.estado = true ;

              jsonDatos.precios= {precios} ;
               
           
            


              const newValues = {
                ...tour,
                "jsonFEchas": jsonDatos,
              };
              setTour(newValues);
             })

        }}
        // onClose={() => setState({})}
        // onFocusedDateChange={(dateFocused, dateClicked) => {
        //   setState({ dateFocused, dateClicked });
        // }}
        plugins={[<DatePanel />]}
      />
    </>
  );
}
