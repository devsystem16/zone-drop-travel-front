// import "./style.css";
import React, { useEffect, useState, useRef } from "react";
import API from "Environment/config";
import PrintIcon from "@mui/icons-material/Print";
import { useReactToPrint } from "react-to-print";
import { useLocation, Link } from "react-router-dom";
import {
  tablaInscritos,
  tablaInscritos_th,
  tablaInscritos_td_th,
  tablaInscritos_th_vertical,
} from "./Styles";
import moment from "moment";

const ReporteInscritos = () => {
  const codigo = useLocation().pathname.split("/").slice(1);
  const pageStyle = `
  @page {
     
    margin:2px 5px;
  }


    @media print {
      html,
      body {
        color-adjust: exact;
        -webkit-print-color-adjust: exact;
        margin: 0px;  

     }

     .verticalText1 {
      writing-mode: vertical-lr;
      transform: rotate(180deg);
      width: 3%;  
      }
`;
  // Print
  const componentRef = useRef();
  const fn_imprimir = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: pageStyle,
  });

  // END PRINTT

  const [reporte, setReporte] = useState([]);

  const cargarReporte = async () => {
    const jsonReporte = await API.get(
      `/reporte/mensual/pasajeros/codigo-fecha/${codigo[codigo.length - 1]}`
    );
    setReporte(jsonReporte.data);
  };

  useEffect(() => {
    cargarReporte();
  }, []);

  const obtenerDescuento = (reserva) => {
    return reserva.descuento + reserva.comisionAgencia;
  };
  const ObtenerTotalPagar = (reserva) => {
    var total = 0;
    reserva.detalles_reservas.map((detalle) => {
      total += detalle.precio;
    });

    return total - obtenerDescuento(reserva);
  };

  const SaldoPendiente = (reserva, abonos) => {
    var total = ObtenerTotalPagar(reserva);
    var SumatoriAabonos = 0;
    var saldo = 0;

    abonos.map((abono) => {
      SumatoriAabonos += abono.valor;
    });
    saldo = total - SumatoriAabonos;
    return saldo;
  };

  const ValorAbonado = (abonos) => {
    var SumatoriAabonos = 0;
    abonos.map((abono) => {
      SumatoriAabonos += abono.valor;
    });
    return SumatoriAabonos;
  };

  const isNull = (dato) => {
    if (dato === null) return "";
    if (dato === undefined) return "";
    return dato;
  };
  if (reporte.reservas === undefined)
    return (
      <>
        <Link to={`/reportes/Mensual`}> &nbsp;&nbsp;&nbsp; {`<`} Volver</Link>{" "}
        <h1>No hay registros aún.</h1>
      </>
    );
  return (
    <div style={{ width: "100%" }}>
      <center>
        <PrintIcon title="Imprimir" style={{ cursor: "pointer" }} onClick={fn_imprimir} />
      </center>

      <Link to={`/reportes/Mensual`}> &nbsp;&nbsp;&nbsp; {`<`} Volver</Link>

      <div ref={componentRef}>
        <center>
          <h3>
            {reporte.costosTour.tour.titulo}
            {`, ${moment(reporte.costosTour.fecha).format("dddd, D MMMM, yyyy")}`}
          </h3>
        </center>

        <table style={tablaInscritos}>
          <tr>
            <th style={tablaInscritos_th}>N°</th>
            <th style={tablaInscritos_th}>NOMBRES Y APELLIDOS</th>
            <th style={tablaInscritos_th}>Nº MOVIL</th>
            <th style={tablaInscritos_th}>LUGAR SALIDA</th>

            {reporte.costosTour.costo_tour.map((tipos) => {
              return (
                <th style={tablaInscritos_th_vertical}>{tipos.tipo_acompañante.descripcion}</th>
              );
            })}

            <th style={tablaInscritos_th}>Total</th>

            <th style={tablaInscritos_th}>DESCUENTO</th>
            <th style={tablaInscritos_th}>TOTALPAGAR </th>
            <th style={tablaInscritos_th}> BONO</th>
            <th style={tablaInscritos_th}>SALDO </th>

            <th style={tablaInscritos_th}> BANCO </th>
            <th style={tablaInscritos_th}> TIPO TRANSACCION</th>
            <th style={tablaInscritos_th}> N° DEPOSITO </th>
            <th style={tablaInscritos_th}>FECHA DEPOSITO </th>

            <th style={tablaInscritos_th}> OBSERVACIONES</th>
          </tr>
          {reporte?.reservas.map((datos, index) => {
            return (
              <tr key={`ReporteIncritos${index}`}>
                <td style={tablaInscritos_td_th}> {index + 1} </td>
                <td
                  style={tablaInscritos_td_th}
                >{` ${datos.cliente_titular.nombres} - ${datos.cliente_titular.apellidos} `}</td>
                <td style={tablaInscritos_td_th}>{`${isNull(
                  datos.cliente_titular.telefono1
                )} - ${isNull(datos.cliente_titular.telefono2)}`}</td>
                <td style={tablaInscritos_td_th}>
                  <LugarSalidatext
                    lugarSalidaTitular={datos.lugar_salida_tour.lugar_salida.descripcion}
                    detallesReservas={datos.detalles_reservas}
                  />

                  {/* {`${datos.lugar_salida_tour.lugar_salida.descripcion}  `} */}
                </td>

                <ContarTiposCliente
                  key={`tiposAcom ${datos.id}`}
                  detallesReserva={datos.detalles_reservas}
                  tipos={reporte.costosTour.costo_tour}
                />

                <td style={tablaInscritos_td_th}>$ {datos.descuento + datos.comisionAgencia} </td>
                <td style={tablaInscritos_td_th}>$ {ObtenerTotalPagar(datos)} </td>
                <td style={tablaInscritos_td_th}>$ {ValorAbonado(datos.abonos)}</td>
                <td style={tablaInscritos_td_th}>$ {SaldoPendiente(datos, datos.abonos)} </td>

                <InformacionPago abonos={datos.abonos} />

                <td style={tablaInscritos_td_th}> {datos.observaciones} </td>
              </tr>
            );
          })}

          <TotalesGenerales reservas={reporte.reservas} costosTours={reporte.costosTour} />
          <ValoresTour costosTours={reporte.costosTour} />
        </table>
      </div>
    </div>
  );
};

const LugarSalidatext = ({ lugarSalidaTitular, detallesReservas = null }) => {
  var arrayLugaresSalida = [];
  arrayLugaresSalida.push(lugarSalidaTitular);

  detallesReservas.map((detalle) => {
    if (detalle?.lugar_salida_tour !== null) {
      if (arrayLugaresSalida.indexOf(detalle?.lugar_salida_tour?.lugar_salida?.descripcion) == -1) {
        arrayLugaresSalida.push(detalle?.lugar_salida_tour?.lugar_salida?.descripcion);
      }
    }
  });

  return (
    <>
      {arrayLugaresSalida.map((lugar, index) => {
        return (
          <div>
            {" "}
            {index + 1} .- {lugar}
          </div>
        );
      })}
    </>
  );
};

const InformacionPago = ({ abonos }) => {
  var banco = "";
  var tipoTransaccion = "";
  var N_deposito = "";
  var fechaDeposito = "";

  abonos.map((abono) => {
    if (abono.banco.descripcion !== "- SELECCIONE -") banco = abono.banco.descripcion;

    tipoTransaccion = abono.tipo_transaccion.descripcion;
    N_deposito = abono.numerodeposito;
    fechaDeposito = abono.fecha;
  });

  return (
    <>
      <td style={tablaInscritos_td_th}> {banco} </td>
      <td style={tablaInscritos_td_th}> {tipoTransaccion}</td>
      <td style={tablaInscritos_td_th}> {N_deposito}</td>
      <td style={tablaInscritos_td_th}> {fechaDeposito} </td>
    </>
  );
};

const ValoresTour = ({ costosTours }) => {
  return (
    <>
      <tr>
        <td colspan="100" style={{ borderStyle: "none" }}>
          &nbsp;
        </td>
      </tr>
      <tr style={{ fontWeight: "bold", fontSize: "11px" }}>
        <td style={{ borderStyle: "none" }}></td>
        <td style={{ borderStyle: "none" }}></td>
        <td style={{ borderStyle: "none" }}></td>
        <td style={{ borderStyle: "none" }}></td>

        {costosTours.costo_tour.map((tipos) => {
          return <td style={{ borderStyle: "none" }}></td>;
        })}

        <td style={{ borderStyle: "none" }}> </td>
        <td style={{ borderStyle: "none" }}> </td>

        <td
          colspan="2"
          style={{
            backgroundColor: "green",
            color: "red",
            borderStyle: "none",
            border: "1px solid #ddd",
          }}
        >
          DETALLE
        </td>
        <td style={{ backgroundColor: "green", color: "red", border: "1px solid #ddd" }}> COSTO</td>

        <td style={{ borderStyle: "none" }}> </td>
        <td style={{ borderStyle: "none" }}> </td>
        <td style={{ borderStyle: "none" }}> </td>
        <td style={{ borderStyle: "none" }}> </td>

        <td style={{ borderStyle: "none" }}></td>
      </tr>
      {/* style={{ borderStyle: "none" }} */}
      {costosTours.costo_tour.map((costo) => {
        return (
          <tr style={{ fontWeight: "bold", fontSize: "11px" }}>
            <td style={{ borderStyle: "none" }}></td>
            <td style={{ borderStyle: "none" }}></td>
            <td style={{ borderStyle: "none" }}></td>
            <td style={{ borderStyle: "none" }}></td>

            {costosTours.costo_tour.map((tipos) => {
              return <td style={{ borderStyle: "none" }}></td>;
            })}

            <td style={{ borderStyle: "none" }}> </td>
            <td style={{ borderStyle: "none" }}> </td>

            <td style={{ border: "1px solid #ddd" }} colspan="2">
              {costo.tipo_acompañante.descripcion}
            </td>
            <td style={{ border: "1px solid #ddd" }}>$ {costo.precio}</td>

            <td style={{ borderStyle: "none" }}> </td>
            <td style={{ borderStyle: "none" }}> </td>
            <td style={{ borderStyle: "none" }}> </td>
            <td style={{ borderStyle: "none" }}> </td>

            <td style={{ borderStyle: "none" }}></td>
          </tr>
        );
      })}
    </>
  );
};
const TotalesGenerales = ({ reservas, costosTours }) => {
  var cantidadPersonas = 0;
  var totalDescuento = 0;
  var totalporCobrar = 0;
  var totalCobrado = 0;
  var totalSaldo = 0;
  // alert(JSON.stringify(reservas));
  // alert(JSON.stringify(costosTours));

  reservas.map((reserva) => {
    cantidadPersonas += reserva.detalles_reservas.length;
  });

  reservas.map((reserva) => {
    totalDescuento += reserva.descuento + reserva.comisionAgencia;
  });

  costosTours.costo_tour.map((tipos) => {
    return <th> </th>;
  });

  reservas.map((reserva) => {
    reserva.detalles_reservas.map((detalles) => {
      totalporCobrar += detalles.precio;
    });
  });

  totalporCobrar = totalporCobrar - totalDescuento;

  reservas.map((reserva) => {
    reserva.abonos.map((abono) => {
      totalCobrado += abono.valor;
    });
  });

  totalSaldo = totalporCobrar - totalCobrado;

  return (
    <>
      <tr style={{ fontWeight: "bold", fontSize: "11px" }}>
        <td style={tablaInscritos_td_th}></td>
        <td style={tablaInscritos_td_th}></td>
        <td style={tablaInscritos_td_th}></td>
        <td style={tablaInscritos_td_th}></td>

        {costosTours.costo_tour.map((tipos) => {
          return <td style={tablaInscritos_td_th}></td>;
        })}

        <td style={{ backgroundColor: "yellow", border: "1px solid #ddd" }}>{cantidadPersonas}</td>
        <td style={{ backgroundColor: "yellow", border: "1px solid #ddd" }}>$ {totalDescuento}</td>
        <td style={{ backgroundColor: "yellow", border: "1px solid #ddd" }}>$ {totalporCobrar}</td>
        <td style={{ backgroundColor: "yellow", border: "1px solid #ddd" }}>$ {totalCobrado}</td>
        <td style={{ backgroundColor: "yellow", border: "1px solid #ddd" }}>$ {totalSaldo}</td>

        <td style={tablaInscritos_td_th}> </td>
        <td style={tablaInscritos_td_th}> </td>
        <td style={tablaInscritos_td_th}> </td>
        <td style={tablaInscritos_td_th}> </td>

        <td style={tablaInscritos_td_th}></td>
      </tr>
    </>
  );
};

const ContarTiposCliente = ({ detallesReserva, tipos }) => {
  var Arraytipos = [];
  var valoresFin = [];
  var conteoTotal = 0;
  tipos.map((costo) => {
    Arraytipos.push(costo.tipo_acompañante.descripcion);
  });

  Arraytipos.map((tipo) => {
    var conteo = 0;
    detallesReserva.map((detalle) => {
      if (tipo === detalle.costo_tour.tipo_acompañante.descripcion) {
        conteo++;
        conteoTotal++;
      }
    });

    valoresFin.push({ clave: tipo, conteo: conteo });
  });

  return (
    <>
      {valoresFin.map((datos) => {
        return (
          <>
            <td style={tablaInscritos_td_th}> {datos.conteo} </td>
          </>
        );
      })}
      <td style={tablaInscritos_td_th}> {conteoTotal} </td>
    </>
  );
};

export default ReporteInscritos;
