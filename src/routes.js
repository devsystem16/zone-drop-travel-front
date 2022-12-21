// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Tour from "layouts/tours";
import Billing from "layouts/billing";

import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

import Reservas from "layouts/Reservas";

import ReporteMensual from "layouts/reportes/ReporteMensual/";
import ReporteAnual from "layouts/reportes/ReporteAnual/";

import ReporteIncritos from "layouts/reportes/ReporteIncritos/";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  // {
  //   type: "collapse",
  //   name: "Dashboard",
  //   key: "dashboard",
  //   icon: <Icon fontSize="small">dashboard</Icon>,
  //   route: "/dashboard",
  //   component: <Dashboard />,
  // },
  {
    type: "collapse",
    name: "Tours",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tour />,
  },
  {
    type: "titles",
    name: "Tours",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables/:contactId",
    // route: "/tables/tour/:idTour/fecha/:idFecha",
    component: <Reservas />,
  },

  {
    type: "collapse",
    name: "Reportes",
    key: "reportes",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/reportes",
    component: <Billing />,
  },

  {
    type: "titles",
    name: "Reportes",
    key: "reportes",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/reportes/Mensual",

    component: <ReporteMensual />,
  },

  {
    type: "titles",
    name: "Tours",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/reportes/Mensual/Detalle/:idFecha",
    component: <ReporteIncritos />,
  },

  {
    type: "titles",
    name: "Reportes",
    key: "reportes",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/reportes/Anual",

    component: <ReporteAnual />,
  },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Pagos",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  // {
  //   type: "collapse",
  //   name: "Clientes",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/sign-in",
  //   component: <SignIn />,
  // },
  {
    type: "collapse",
    name: "Salir",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    // route: "/authentication/sign-up",
    route: "/login",
    component: <SignUp />,
  },
];

export default routes;
