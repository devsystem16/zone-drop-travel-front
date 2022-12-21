import moment from "moment";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";

import zone_drop_travel_icon from "assets/images/zone-drop-travel/zone-drop-travel-icon.jpg";

import img_firma_voucher from "assets/images/zone-drop-travel/firma_voucher.png";

const tabla_tr_td = {
  width: "8.33%",
  border: "1px solid rgb(70, 66, 70)",
  fontSize: "11px",
};

const tamañoColumna = "8.33%";

const Voucher = ({ datos }) => {
  const pageStyle = `
  @page {
    margin:0;
  }


    @media print {
      html,
      body {
        color-adjust: exact;
        -webkit-print-color-adjust: exact;
        margin: 0px;  

     }
 
`;

  const componentRef = useRef();
  const fn_imprimir = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: pageStyle,
  });

  const isNull = (dato) => {
    if (dato === null) return "";
    if (dato === undefined) return "";
    return dato;
  };

  return (
    <>
      <PrintIcon title="Imprimir" style={{ cursor: "pointer" }} onClick={fn_imprimir} />

      <table
        style={{ width: "98%", margin: "auto", color: "black" }}
        ref={componentRef}
        id="tabla"
        border="1 "
      >
        <tr style={tabla_tr_td}>
          <td
            rowspan="2"
            colspan="2"
            className="center sinBorde sinBordeRigth"
            style={{
              width: tamañoColumna,
              textAlign: "center",
              borderLeft: "1px solid rgb(170, 51, 170)",
              borderBottom: "0px solid rgb(170, 51, 170)",
              borderRight: "0px solid rgb(170, 51, 170)",
              borderTop: "0px solid rgb(170, 51, 170)",
              width: tamañoColumna,
            }}
          >
            <img src={zone_drop_travel_icon} />
          </td>
          <td
            colspan="8"
            style={{
              textAlign: "center",
              borderLeft: "0px solid rgb(170, 51, 170)",
              borderBottom: "0px solid rgb(170, 51, 170)",
              borderRight: "0px solid rgb(170, 51, 170)",
              borderTop: "0px solid rgb(170, 51, 170)",
              width: tamañoColumna,
            }}
          >
            <h1>VOUCHER DE RESERVA</h1>
          </td>
          <td
            rowspan="2"
            colspan="2"
            style={{
              textAlign: "center",
              borderLeft: "0px solid rgb(170, 51, 170)",
              borderBottom: "0px solid rgb(170, 51, 170)",
              borderTop: "0px solid rgb(170, 51, 170)",
              width: tamañoColumna,
            }}
          >
            <img src={zone_drop_travel_icon} />
          </td>
        </tr>
        <tr style={tabla_tr_td}>
          <td
            colspan="8"
            // className="center sinBorde sinBordeLeft sinBordeRigth sinBordeTop"
            style={{
              width: tamañoColumna,
              textAlign: "center",
              borderLeft: "0px solid rgb(170, 51, 170)",
              borderRight: "0px solid rgb(170, 51, 170)",
              borderBottom: "0px solid rgb(170, 51, 170)",
              borderTop: "0px solid rgb(170, 51, 170)",
              color: "#00B050",
            }}
          >
            "El placer de viajar en nuestras manos"
          </td>
        </tr>

        <tr style={tabla_tr_td}>
          <td colspan="8" style={{ width: tamañoColumna }}>
            <div style={{ color: "#2E75B5", fontWeight: "bold" }}>
              Registro Turistico PUIO00I - 00001491
            </div>
            <div style={{ color: "#2E75B5", fontWeight: "bold" }}>RUC: 0502771199</div>
          </td>
          <td colspan="2" style={{ width: tamañoColumna }}>
            <center style={{ fontWeight: "bold", fontSize: "15px" }}>N°</center>
          </td>
          <td colspan="2" style={{ width: tamañoColumna, textAlign: "center" }}>
            <center style={{ fontWeight: "bold", fontSize: "15px", color: "red" }}>
              {datos.id}
            </center>
          </td>
        </tr>

        <tr style={tabla_tr_td}>
          <td
            style={{
              width: tamañoColumna,
              textAlign: "center",
              backgroundColor: "rgb(178, 222, 130)",
              color: "black",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
            colspan="12"
            className="center"
          >
            Datos de la reserva
          </td>
        </tr>

        <RowTitularReserva detalles={datos.detalles_reservas}></RowTitularReserva>

        <tr style={tabla_tr_td}>
          <td
            style={{
              width: tamañoColumna,
              textAlign: "center",
              backgroundColor: "rgb(178, 222, 130)",
              color: "black",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
            colspan="12"
            className="center"
          >
            Datos del Viaje
          </td>
        </tr>
        <tr style={tabla_tr_td}>
          <td style={{ width: tamañoColumna, textAlign: "center" }} colspan="2">
            Destino Tour
          </td>
          <td colspan="10" style={{ width: tamañoColumna, textAlign: "left" }}>
            {datos.tour.titulo}
          </td>
        </tr>
        <tr style={tabla_tr_td}>
          <td colspan="3" rowspan="2" style={{ width: tamañoColumna, textAlign: "left" }}>
            Duración
          </td>
          <td colspan="1" rowspan="2" style={{ width: tamañoColumna, textAlign: "center" }}>
            {datos.tour.duracion}
          </td>
          <td colspan="2" style={{ width: tamañoColumna, textAlign: "center" }}>
            Lugar de Salida
          </td>
          <td colspan="6" style={{ width: tamañoColumna }}>
            {datos.lugar_salida_tour.lugar_salida.descripcion}
          </td>
        </tr>
        <tr style={tabla_tr_td}>
          <td colspan="2" style={{ width: tamañoColumna, textAlign: "center" }}>
            Fecha Salida
          </td>
          <td colspan="3" style={{ width: tamañoColumna }}>
            {`📆 ${moment(datos.programacion_fecha.fecha).format("dddd, D MMMM, yyyy")}`}
          </td>
          <td colspan="1" style={{ width: tamañoColumna }}>
            Hora
          </td>
          <td colspan="2" style={{ width: tamañoColumna }}>
            {" "}
            {datos.lugar_salida_tour.hora}
          </td>
        </tr>
        <tr style={tabla_tr_td}>
          <td
            colspan="12"
            style={{ width: tamañoColumna, color: "red", fontSize: "10px", textAlign: "center" }}
          >
            El pasajero se compromete a estar en el lugar ya la hora indicada para salir, el
            transporte abrirá sus puertas cinco minutos antes de la hora indicada para recibir el
            equipaje y esperará 5 minutos después de la hora de salida, si algún pasajero no llega
            su reserva NO SERÁ REEMBOLSABLE NI TRANSFERIBLE para otra fecha o destino.s
          </td>
        </tr>

        <tr style={tabla_tr_td}>
          <td
            colspan="12"
            style={{
              width: tamañoColumna,
              textAlign: "center",
              backgroundColor: "rgb(178, 222, 130)",
              color: "black",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Servicios contratados
          </td>
        </tr>

        <tr style={tabla_tr_td}>
          <td colspan="2" style={{ width: tamañoColumna, textAlign: "center" }}>
            Solo Actividades
          </td>
          <td colspan="1" style={{ width: tamañoColumna }}></td>
          <td colspan="3" style={{ width: tamañoColumna, textAlign: "center" }}>
            Transporte + Actividades
          </td>
          <td colspan="1" style={{ width: tamañoColumna }}></td>
          <td colspan="2" style={{ width: tamañoColumna, textAlign: "center" }}>
            Todo Incluido
          </td>
          <td colspan="3" style={{ width: tamañoColumna }}></td>
        </tr>

        <tr style={tabla_tr_td}>
          <td
            colspan="12"
            className="center"
            style={{
              width: tamañoColumna,
              textAlign: "center",
              backgroundColor: "rgb(178, 222, 130)",
              color: "black",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Reserva por persona
          </td>
        </tr>

        {/* //amarillo */}
        <tr
          style={{
            width: tamañoColumna,
            textAlign: "center",
            backgroundColor: "#FFE598",
            color: "black",
            // fontWeight: "bold",
            textTransform: "uppercase",
            fontSize: "11px",
          }}
        >
          <td colspan="4" style={{ width: tamañoColumna, textAlign: "center" }}>
            Detalle
          </td>
          <td colspan="2" style={{ width: tamañoColumna, textAlign: "center" }}>
            N°
          </td>
          <td colspan="3" style={{ width: tamañoColumna, textAlign: "center" }}>
            Valor
          </td>
          <td colspan="3" style={{ width: tamañoColumna, textAlign: "center" }}>
            Total
          </td>
        </tr>

        <RowTipoAcompañante
          detalles_reservas={datos.detalles_reservas}
          DESCUENTO={datos.descuento + datos.comisionAgencia}
          costoAdicional={datos.costoAdicional}
        />

        <tr style={tabla_tr_td}>
          <td
            colspan="12"
            className="center"
            style={{
              width: tamañoColumna,
              textAlign: "center",
              backgroundColor: "rgb(178, 222, 130)",
              color: "black",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Método de Pago
          </td>
        </tr>

        <tr
          style={{
            width: tamañoColumna,
            textAlign: "center",
            backgroundColor: "#FFE598",
            color: "black",
            // fontWeight: "bold",
            textTransform: "uppercase",
            fontSize: "11px",
          }}
        >
          <td
            colspan="4"
            style={{
              width: tamañoColumna,
              textAlign: "center",
              backgroundColor: "#FFE598",
            }}
          >
            FORMA DE RESERVA
          </td>
          <td colspan="2" style={{ width: tamañoColumna, textAlign: "center" }}>
            DETALLE
          </td>
          <td colspan="6" style={{ width: tamañoColumna, textAlign: "center" }}>
            CONDICIONES
          </td>
        </tr>

        <tr style={tabla_tr_td}>
          <td colspan="4" style={{ width: tamañoColumna, textAlign: "left" }}></td>
          <td colspan="2" style={{ width: tamañoColumna, textAlign: "center" }}></td>

          <td colspan="6" rowspan={datos.abonos.length + 1} style={{ width: tamañoColumna }}>
            El Contratante se compromete a cancelar el saldo total del tour que solicitó, el cual
            cubrirá los servicios contratados en el tipo dde reservación que solicitó
          </td>
        </tr>
        <RowMetodoPago
          abonos={datos.abonos}
          detalles_reservas={datos.detalles_reservas}
          DESCUENTO={datos.descuento + datos.comisionAgencia}
          costoAdicional={datos.costoAdicional}
        ></RowMetodoPago>

        <tr style={tabla_tr_td}>
          <td
            colspan="12"
            className="center"
            style={{
              width: tamañoColumna,
              textAlign: "center",
              backgroundColor: "rgb(178, 222, 130)",
              color: "black",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            ACOMODACIÓN EN EL HOTEL
          </td>
        </tr>

        {datos?.habitaciones_reservas.map((hab) => {
          return (
            <tr style={tabla_tr_td}>
              <td colspan="12"> {`(${isNull(hab.cantidad)}) ${hab.habitacion.descripcion}`}</td>
            </tr>
          );
        })}

        <tr style={tabla_tr_td}>
          <td
            colspan="12"
            className="center"
            style={{
              width: tamañoColumna,
              textAlign: "center",
              backgroundColor: "rgb(178, 222, 130)",
              color: "black",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            POLITICAS DE RESERVACIÓN
          </td>
        </tr>

        <tr style={tabla_tr_td}>
          <td colspan="12" style={{ width: tamañoColumna }}>
            <p style={{ textAlign: "justify" }}>
              {/* La Agencia de viajes Drop Zone Travel, se compromete a prestar los servicios
              turísticos indicados en la publicidad y los miembros que el cliente ha solicitado, así
              mismo el contratante será el responsable de acoger las indicaciones, itinerario y las
              sugerencias del guía responsable del viaje, la agencia de viajes no se responsabiliza
              de pérdida de equipaje, objetos materiales o dinero olvidados en el hotel, transporte
              o lugares a visitar, así también si el turista es responsable de daños o perjuicios
              que pueda ocasionar. */}
              La Agencia de viajes Drop Zone Travel, se compromete aprestar los servicios turísticos
              indicados en la publicidad y los mismos que el cliente a solicitado, así mismo el
              contratante será responsable de acoger las indicaciones y el itinerarios del viaje y
              las sugerencias del guía responsable del viaje, la agencia de viajes no se
              responsabiliza de perdida de equipaje u objetos materiales o dinero olvidados en el
              hotel, transporte o lugares a visitar, así también si el turista es responsable de
              daños o perjuicios que pueda ocasionar.
            </p>
            <br />

            <p style={{ textAlign: "justify" }}>
              {/* La agencia de viajes Zone Drop Travel, pone a disposición de sus clientes transporte
              de turismo con Duff, seguro de viaje interandino para los países de Ecuador, Colombia
              y Perú que cubre accidentes dentro del transporte. La Agencia de viajes Zone Drop
              Travel, no se responsabiliza por cuestiones atmosféricas o de la naturaleza que puedan
              modificar el itinerario y hora de llegada al punto indicado. */}
              La Agencia de viajes Drop Zone Travel, pone a disposición de sus clientes transportes
              de turismo con Duff, seguro de viaje interandino para los países de Ecuador, Colombia
              y Perú que cubre accidentes dentro del transporte. La Agencia de viajes Drop Zone
              Travel, no se responsabiliza por cuestiones atmosféricas o de la naturaleza que puedan
              modificar el itinerario y hora de llegada al punto indicado.
            </p>
            <br />
            <p style={{ textAlign: "justify" }}>
              {/* El turista conoce y acepta todos los términos y condiciones legales que establece la
              agencia de viajes para realizar sus tours, que se encuentran estipulados en el
              itinerario del tour contratado. */}
              El turista conoce y acepta todas los términos y condiciones legales que estable la
              agencia de viajes para realizar sus tours, que se encuentran estipulados en el
              itinerario del tour contratado.
            </p>
            <br />
            <center>
              <img src={img_firma_voucher} style={{ textAlign: "center", width: "80%" }} />
            </center>
          </td>
        </tr>

        {/* <RowMetodoPago /> */}
      </table>
    </>
  );
};

const existe = (array, value) => {
  var exists = false;
  array.map((dat) => {
    if (dat === value) exists = true;
  });
  return exists;
};

const RowTipoAcompañante = ({ detalles_reservas, DESCUENTO, costoAdicional }) => {
  var arrayTipos = [];
  var arrayReservasPersonas = [];
  detalles_reservas.map((detalle) => {
    if (!existe(arrayTipos, detalle.costo_tour.tipo_acompañante.descripcion))
      arrayTipos.push(detalle.costo_tour.tipo_acompañante.descripcion);
  });

  var conteo = 0;
  var conteoTotal = 0;
  var costo = 0;
  var total = 0;
  var totalGeneral = 0;
  arrayTipos.map((tipo) => {
    conteo = 0;
    costo = 0;
    total = 0;
    detalles_reservas.map((detalle) => {
      if (detalle.costo_tour.tipo_acompañante.descripcion === tipo) {
        conteo++;
        conteoTotal++;
        costo = detalle.costo_tour.precio;
        total += detalle.costo_tour.precio;
        totalGeneral += detalle.costo_tour.precio;
      }
    });
    arrayReservasPersonas.push({ tipo: tipo, cantidad: conteo, costo: costo, total, total });
  });

  return (
    <>
      {arrayReservasPersonas.map((dato) => {
        return (
          <tr style={tabla_tr_td}>
            <td colspan="4" style={{ width: tamañoColumna, textAlign: "center" }}>
              {dato.tipo}
            </td>
            <td colspan="2" style={{ width: tamañoColumna, textAlign: "center" }}>
              {dato.cantidad}
            </td>
            <td colspan="3" style={{ width: tamañoColumna, textAlign: "right" }}>
              $ {dato.costo}
            </td>
            <td colspan="3" style={{ width: tamañoColumna, textAlign: "right" }}>
              $ {dato.total}
            </td>
          </tr>
        );
      })}

      <tr style={tabla_tr_td}>
        <td colspan="4" style={{ width: tamañoColumna, textAlign: "right" }}>
          TOTAL, PERSONAS A VIAJAR
        </td>
        <td colspan="2" style={{ width: tamañoColumna, textAlign: "center" }}>
          {conteoTotal}
        </td>
        <td colspan="3" style={{ width: tamañoColumna, textAlign: "right" }}>
          DESCUENTO
        </td>
        <td colspan="3" style={{ width: tamañoColumna, textAlign: "right" }}>
          $ {DESCUENTO}
        </td>
      </tr>

      <tr style={tabla_tr_td}>
        <td colspan="6" style={{ width: tamañoColumna, textAlign: "right" }}></td>

        <td colspan="3" style={{ width: tamañoColumna, textAlign: "right" }}>
          COSTOS ADICIONALES
        </td>
        <td colspan="3" style={{ width: tamañoColumna, textAlign: "right" }}>
          $ {costoAdicional}{" "}
        </td>
      </tr>

      <tr style={tabla_tr_td}>
        <td colspan="9" style={{ width: tamañoColumna, textAlign: "right" }}>
          TOTAL A PAGAR
        </td>

        <td colspan="3" style={{ width: tamañoColumna, textAlign: "right" }}>
          <strong> $ {totalGeneral - DESCUENTO + costoAdicional}</strong>
        </td>
      </tr>
    </>
  );
};

const RowMetodoPago = ({ abonos, detalles_reservas, DESCUENTO, costoAdicional }) => {
  var totalDeuda = 0;

  detalles_reservas.map((detalles) => {
    totalDeuda += detalles.costo_tour.precio;
  });

  var suma = 0;
  abonos.map((abo) => {
    suma += abo.valor;
  });

  totalDeuda = totalDeuda - DESCUENTO - suma;

  return (
    <>
      {abonos.map((abon) => {
        return (
          <tr style={tabla_tr_td}>
            <td colspan="2" style={{ width: tamañoColumna, textAlign: "right" }}>
              {abon.tipo_transaccion.descripcion}
            </td>

            <td colspan="2" style={{ width: tamañoColumna, textAlign: "right" }}>
              {abon.fecha !== null && abon.fecha !== "" ? <>Feha: {abon.fecha} </> : null}

              {abon.numerodeposito !== null && abon.numerodeposito !== "" ? <br></br> : null}
              {abon.numerodeposito !== null && abon.numerodeposito !== ""
                ? `N° Dep: ${abon.numerodeposito}`
                : null}
              {abon.banco.descripcion == "- SELECCIONE -" ? null : <br></br>}
              {abon.banco.descripcion == "- SELECCIONE -"
                ? null
                : `Banco: ${abon.banco.descripcion}`}
            </td>
            <td colspan="2" style={{ width: tamañoColumna, textAlign: "center" }}>
              $ {abon.valor}
            </td>
          </tr>
        );
      })}

      <tr style={tabla_tr_td}>
        <td colspan="4" style={{ width: tamañoColumna, textAlign: "right" }}>
          <strong>ABONO &nbsp;</strong>
        </td>
        <td colspan="2" style={{ width: tamañoColumna, textAlign: "center" }}>
          $ {suma}
        </td>

        <td colspan="3" style={{ width: tamañoColumna, textAlign: "right" }}>
          SALDO &nbsp;
        </td>

        <td colspan="3" style={{ width: tamañoColumna, textAlign: "center" }}>
          $ {totalDeuda + costoAdicional}
        </td>
      </tr>
    </>
  );
};

const RowTitularReserva = ({ detalles }) => {
  var cliente;
  detalles.map((det) => {
    if (det.tipo_cliente === "Titular") {
      cliente = det.cliente;
    }
  });

  return (
    <>
      <tr style={tabla_tr_td}>
        <td colspan="3" style={{ width: tamañoColumna, textAlign: "left" }}>
          Reserva a Nombre de:
        </td>
        <td colspan="9" style={{ width: tamañoColumna, textAlign: "left" }}>
          {`${cliente.nombres} ${cliente.apellidos}`}
        </td>
      </tr>
      <tr style={tabla_tr_td}>
        <td colspan="3" style={{ width: tamañoColumna, textAlign: "left" }}>
          Número de Cédula:
        </td>
        <td colspan="3" style={{ width: tamañoColumna, textAlign: "center" }}>
          {cliente.documento}
        </td>

        <td colspan="3" style={{ width: tamañoColumna, textAlign: "center" }}>
          Número Celular
        </td>
        <td colspan="3" style={{ width: tamañoColumna, textAlign: "left" }}>
          {`${cliente.telefono1} - ${cliente.telefono2}`}
        </td>
      </tr>
      <tr style={tabla_tr_td}>
        <td colspan="3" style={{ width: tamañoColumna, textAlign: "left" }}>
          Correo Electronico
        </td>
        <td colspan="3" style={{ width: tamañoColumna, textAlign: "center" }}>
          {cliente.correo}
        </td>

        <td colspan="3" style={{ width: tamañoColumna, textAlign: "center" }}>
          Número Convencional
        </td>
        <td colspan="3" style={{ width: tamañoColumna, textAlign: "left" }}>
          {cliente.telefono3}
        </td>
      </tr>
    </>
  );
};

export default Voucher;
