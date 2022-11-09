import React, { useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";

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
      <button type="button" onClick={fn_imprimir}>
        Imprimir
      </button>

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
