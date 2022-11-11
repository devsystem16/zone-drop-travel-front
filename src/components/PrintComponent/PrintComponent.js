import React, { useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";

const PrintComponent = ({ ComponentToPrint }) => {
  const componentRef = useRef();
  const fn_imprimir = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    // fn_imprimir();
    // return () => {
    //   console.log("Se desmonto el componente");
    // };
  }, []);

  return (
    <div>
      <PrintIcon title="Imprimir" style={{ cursor: "pointer" }} onClick={fn_imprimir} />

      <div style={{ display: "none" }}>
        <ContenedorComponent ref={componentRef} component={ComponentToPrint} />
      </div>
    </div>
  );
};
export default PrintComponent;

const ContenedorComponent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <props.component></props.component>
    </div>
  );
});
