import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useLocation, Link } from "react-router-dom";

const Reservas = () => {
  const codigo = useLocation().pathname.split("/").slice(1);

  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini={false} />
      <h1>Reservas</h1>
      {codigo[codigo.length - 1]}
    </DashboardLayout>
  );
};

export default Reservas;
