import "./Style.css";
import PrintComponent from "../../../../components/PrintComponent/PrintComponent";

const Container = () => {
  return (
    <>
      <Comprobante></Comprobante>
      <PrintComponent ComponentToPrint={Comprobante} />
    </>
  );
};

export default Container;

const Comprobante = () => {
  return (
    <>
      <table id="tabla" /*border="1"*/>
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
          <td colspan="2">1000</td>
        </tr>
        <tr>
          <td colspan="12" className="center bg-color-green">
            Datos de la reserva
          </td>
        </tr>
        <tr>
          <td colspan="4" className="left">
            Reserva a Nombre de:
          </td>
          <td colspan="8" className="left">
            Mychael Castro
          </td>
        </tr>
        <tr>
          <td colspan="3" className="left">
            Número de Cédula:
          </td>
          <td colspan="3" className="center">
            1206395863
          </td>

          <td colspan="3" className="center">
            Número Celular
          </td>
          <td colspan="3" className="left">
            0986013199
          </td>
        </tr>
        <tr>
          <td colspan="3" className="left">
            Correo Electronico
          </td>
          <td colspan="3" className="center">
            desarrollos16@hotmai.com
          </td>

          <td colspan="3" className="center">
            Número Convencional
          </td>
          <td colspan="3" className="left">
            -
          </td>
        </tr>
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
            ipiales Compraas
          </td>
        </tr>
        <tr>
          <td colspan="3" className="left">
            Días
          </td>
          <td colspan="1" className="center">
            1
          </td>
          <td colspan="2" className="center">
            Lugar de Salida
          </td>
          <td colspan="6"></td>
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
          <td colspan="3">Viernes, 9 de septiembre de 2022</td>
          <td colspan="1">Hora</td>
          <td colspan="2">11:10pm</td>
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

        {/* Cantidad de tipos de Acompañantes */}
        <RowTipoAcompañante />

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
          <td colspan="4" className="left">
            Efectivo
          </td>
          <td colspan="2" className="center">
            50
          </td>

          <td colspan="6" rowspan="2">
            condiciones de la vaina
          </td>
        </tr>

        <tr>
          <td colspan="4" className="left">
            TArjeta o Transferencia
          </td>
          <td colspan="2" className="center">
            500
          </td>
        </tr>

        <tr>
          <td colspan="12" className="center bg-color-green">
            ACOMODACIÓN EN EL HOTEL
          </td>
        </tr>

        <tr>
          <td colspan="12">No aplica</td>
        </tr>

        <tr>
          <td colspan="12" className="center bg-color-green">
            POLITICAS DE RESERVACIÓN
          </td>
        </tr>

        <tr>
          <td colspan="12">
            <p style={{ textAlign: "justify" }} className="size-8">
              La Agencia de viajes Drop Zone Travel, se compromete a prestar los servicios
              turísticos indicados en la publicidad y los miembros que el cliente ha solicitado, así
              mismo el contratante será el responsable de acoger las indicaciones, itinerario y las
              sugerencias del guía responsable del viaje, la agencia de viajes no se responsabiliza
              de pérdida de equipaje, objetos materiales o dinero olvidados en el hotel, transporte
              o lugares a visitar, así también si el turista es responsable de daños o perjuicios
              que pueda ocasionar.
            </p>
            <br />

            <p style={{ textAlign: "justify" }} className="size-8">
              La agencia de viajes Zone Drop Travel, pone a disposición de sus clientes transporte
              de turismo con Duff, seguro de viaje interandino para los países de Ecuador, Colombia
              y Perú que cubre accidentes dentro del transporte. La Agencia de viajes Zone Drop
              Travel, no se responsabiliza por cuestiones atmosféricas o de la naturaleza que puedan
              modificar el itinerario y hora de llegada al punto indicado.
            </p>
            <br />
            <p style={{ textAlign: "justify" }} className="size-8">
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

const RowTipoAcompañante = () => {
  return (
    <tr>
      <td colspan="4" className="centlefter">
        Adulto
      </td>
      <td colspan="2" className="center">
        4
      </td>
      <td colspan="3" className="rigth">
        $25.00
      </td>
      <td colspan="3" className="rigth">
        $100
      </td>
    </tr>
  );
};

const RowMetodoPago = () => {
  return (
    <tr rowSpan="2">
      <td colspan="4" className="left">
        Efectivo
      </td>
      <td colspan="2" className="center">
        50
      </td>
    </tr>
  );
};
