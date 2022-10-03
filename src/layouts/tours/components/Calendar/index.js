import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

export default function Example() {
  const today = new Date();
  const tomorrow = new Date();
  const weekDays = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

  tomorrow.setDate(tomorrow.getDate() + 1);

  const [state, setState] = useState({});
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
          console.log("selected dates :\n" + array.join(",\n"));
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
