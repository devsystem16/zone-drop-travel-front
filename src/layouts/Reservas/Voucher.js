import moment from "moment";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";

const Voucher = ({ datos }) => {
  const componentRef = useRef();
  const fn_imprimir = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <PrintIcon title="Imprimir" style={{ cursor: "pointer" }} onClick={fn_imprimir} />

      <table ref={componentRef} id="tabla" /*border="1"*/>
        <tr>
          <td rowspan="2" colspan="2" className="center">
            IMAGEN
          </td>
          <td colspan="8" className="center">
            <h2>VOUCHER DE RESERVA</h2>
          </td>
          <td rowspan="2" colspan="2" className="center">
            IMAGEN
          </td>
        </tr>
        <tr>
          <td colspan="8" className="center">
            El placer de viajar en nuestras manos
          </td>
        </tr>

        <tr>
          <td colspan="8">
            <div>Registro Turistico PUIO00I - 00001491</div>
            <div>RUC: 0502771199</div>
          </td>
          <td colspan="2">N°</td>
          <td colspan="2" className="center">
            {datos.id}
          </td>
        </tr>

        <tr>
          <td colspan="12" className="center bg-color-green">
            Datos de la reserva
          </td>
        </tr>

        <RowTitularReserva detalles={datos.detalles_reservas}></RowTitularReserva>

        <tr>
          <td colspan="12" className="center bg-color-green">
            Datos del Viaje
          </td>
        </tr>
        <tr>
          <td colspan="2" className="center">
            Destino Tour
          </td>
          <td colspan="10" className="left">
            {datos.tour.titulo}
          </td>
        </tr>
        <tr>
          <td colspan="3" className="left">
            Días
          </td>
          <td colspan="1" className="center">
            {datos.tour.duracion}
          </td>
          <td colspan="2" className="center">
            Lugar de Salida
          </td>
          <td colspan="6">{datos.lugar_salida_tour.lugar_salida.descripcion}</td>
        </tr>
        <tr>
          <td colspan="3" className="left">
            Noches
          </td>
          <td colspan="1" className="center">
            0
          </td>
          <td colspan="2" className="center">
            Fecha Salida
          </td>
          <td colspan="3">
            {`📆 ${moment(datos.programacion_fecha.fecha).format("dddd, D MMMM, yyyy")}`}
          </td>
          <td colspan="1">Hora</td>
          <td colspan="2"> {datos.lugar_salida_tour.hora}</td>
        </tr>
        <tr>
          <td colspan="12" className="center color-red size-8">
            El pasajero se compromete a estar en el lugar ya la hora indicada para salir, el
            transporte abrirá sus puertas cinco minutos antes de la hora indicada para recibir el
            equipaje y esperará 5 minutos después de la hora de salida, si algún pasajero no llega
            su reserva NO SERÁ REEMBOLSABLE NI TRANSFERIBLE para otra fecha o destino.s
          </td>
        </tr>

        <tr>
          <td colspan="12" className="center bg-color-green">
            Servicios contratados
          </td>
        </tr>

        <tr>
          <td colspan="2" className="center">
            Solo Actividades
          </td>
          <td colspan="1"></td>
          <td colspan="3" className="center">
            Transporte + Actividades
          </td>
          <td colspan="1"></td>
          <td colspan="2" className="center">
            Todo Incluido
          </td>
          <td colspan="3"></td>
        </tr>

        <tr>
          <td colspan="12" className="center bg-color-green">
            Reserva por persona
          </td>
        </tr>

        <tr className="color-yellow">
          <td colspan="4" className="center">
            Detalle
          </td>
          <td colspan="2" className="center">
            N°
          </td>
          <td colspan="3" className="center">
            Valor
          </td>
          <td colspan="3" className="center">
            Total
          </td>
        </tr>

        <RowTipoAcompañante
          detalles_reservas={datos.detalles_reservas}
          DESCUENTO={datos.descuento}
        />

        <tr>
          <td colspan="12" className="center bg-color-green">
            Método de Pago
          </td>
        </tr>

        <tr className="color-yellow">
          <td colspan="4" className="center">
            FORMA DE RESERVA
          </td>
          <td colspan="2" className="center">
            DETALLE
          </td>
          <td colspan="6" className="center">
            CONDICIONES
          </td>
        </tr>

        <tr>
          <td colspan="4" className="left"></td>
          <td colspan="2" className="center"></td>

          <td colspan="6" rowspan={datos.abonos.length + 1}>
            El Contratante se compromete a cancelar el saldo total del tour que solicitó, el cual
            cubrirá los servicios contratados en el tipo dde reservación que solicitó
          </td>
        </tr>

        <RowMetodoPago
          abonos={datos.abonos}
          detalles_reservas={datos.detalles_reservas}
          DESCUENTO={datos.descuento}
        >
          {" "}
        </RowMetodoPago>

        <tr>
          <td colspan="12" className="center bg-color-green">
            ACOMODACIÓN EN EL HOTEL
          </td>
        </tr>

        {datos?.habitaciones_reservas.map((hab) => {
          return (
            <tr>
              <td colspan="12"> {hab.habitacion.descripcion}</td>
            </tr>
          );
        })}

        <tr>
          <td colspan="12" className="center bg-color-green">
            POLITICAS DE RESERVACIÓN
          </td>
        </tr>

        <tr>
          <td colspan="12">
            <p style={{ textAlign: "justify" }}>
              La Agencia de viajes Drop Zone Travel, se compromete a prestar los servicios
              turísticos indicados en la publicidad y los miembros que el cliente ha solicitado, así
              mismo el contratante será el responsable de acoger las indicaciones, itinerario y las
              sugerencias del guía responsable del viaje, la agencia de viajes no se responsabiliza
              de pérdida de equipaje, objetos materiales o dinero olvidados en el hotel, transporte
              o lugares a visitar, así también si el turista es responsable de daños o perjuicios
              que pueda ocasionar.
            </p>
            <br />

            <p style={{ textAlign: "justify" }}>
              La agencia de viajes Zone Drop Travel, pone a disposición de sus clientes transporte
              de turismo con Duff, seguro de viaje interandino para los países de Ecuador, Colombia
              y Perú que cubre accidentes dentro del transporte. La Agencia de viajes Zone Drop
              Travel, no se responsabiliza por cuestiones atmosféricas o de la naturaleza que puedan
              modificar el itinerario y hora de llegada al punto indicado.
            </p>
            <br />
            <p style={{ textAlign: "justify" }}>
              El turista conoce y acepta todos los términos y condiciones legales que establece la
              agencia de viajes para realizar sus tours, que se encuentran estipulados en el
              itinerario del tour contratado.
            </p>
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

const RowTipoAcompañante = ({ detalles_reservas, DESCUENTO }) => {
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
          <tr>
            <td colspan="4" className="centlefter">
              {dato.tipo}
            </td>
            <td colspan="2" className="center">
              {dato.cantidad}
            </td>
            <td colspan="3" className="rigth">
              $ {dato.costo}
            </td>
            <td colspan="3" className="rigth">
              $ {dato.total}
            </td>
          </tr>
        );
      })}

      <tr>
        <td colspan="4" className="rigth">
          TOTAL, PERSONAS A VIAJAR
        </td>
        <td colspan="2" className="center">
          {conteoTotal}
        </td>
        <td colspan="3" className="rigth">
          DESCUENTO
        </td>
        <td colspan="3" className="rigth">
          $ {DESCUENTO}
        </td>
      </tr>

      <tr>
        <td colspan="9" className="rigth">
          TOTAL A PAGAR
        </td>

        <td colspan="3" className="rigth">
          <strong> $ {totalGeneral - DESCUENTO}</strong>
        </td>
      </tr>
    </>
  );
};

const RowMetodoPago = ({ abonos, detalles_reservas, DESCUENTO }) => {
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
          <tr>
            <td colspan="2" className="left">
              {abon.tipo_transaccion.descripcion}
            </td>

            <td colspan="2" className="left">
              Feha {abon.fecha}
              {abon.numerodeposito !== null && abon.numerodeposito !== "" ? <br></br> : null}
              {abon.numerodeposito !== null && abon.numerodeposito !== ""
                ? `N° Dep: ${abon.numerodeposito}`
                : null}
              {abon.banco.descripcion == "- SELECCIONE -" ? null : <br></br>}
              {abon.banco.descripcion == "- SELECCIONE -"
                ? null
                : `Banco: ${abon.banco.descripcion}`}
            </td>
            <td colspan="2" className="center">
              $ {abon.valor}
            </td>
          </tr>
        );
      })}

      <tr>
        <td colspan="4" className="rigth">
          <strong>ABONO &nbsp;</strong>
        </td>
        <td colspan="2" className="center">
          $ {suma}
        </td>

        <td colspan="3" className="rigth">
          SALDO &nbsp;
        </td>

        <td colspan="3" className="center">
          $ {totalDeuda}
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
      <tr>
        <td colspan="3" className="left">
          Reserva a Nombre de:
        </td>
        <td colspan="9" className="left">
          {`${cliente.nombres} ${cliente.apellidos}`}
        </td>
      </tr>
      <tr>
        <td colspan="3" className="left">
          Número de Cédula:
        </td>
        <td colspan="3" className="center">
          {cliente.documento}
        </td>

        <td colspan="3" className="center">
          Número Celular
        </td>
        <td colspan="3" className="left">
          {`${cliente.telefono1} - ${cliente.telefono2}`}
        </td>
      </tr>
      <tr>
        <td colspan="3" className="left">
          Correo Electronico
        </td>
        <td colspan="3" className="center">
          {cliente.correo}
        </td>

        <td colspan="3" className="center">
          Número Convencional
        </td>
        <td colspan="3" className="left">
          {cliente.telefono3}
        </td>
      </tr>
    </>
  );
};

export default Voucher;
