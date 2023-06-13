import React from "react";
import ReactToPrint from "react-to-print";

const PrintComponent = ({ Component }) => {
  const componentRef = React.useRef();

  const handlePrint = () => {
    if (componentRef.current) {
      componentRef.current.handlePrint();
    }
  };

  return (
    <div>
      <ReactToPrint
        trigger={() => <button onClick={handlePrint}>Imprimir</button>}
        content={() => componentRef.current}
      />
      <div ref={componentRef}>
        <Component />
      </div>
    </div>
  );
};

export default PrintComponent;
