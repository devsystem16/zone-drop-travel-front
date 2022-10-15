import axios from "axios";

const BASE_URL = "http://zone-drop-travel-back.test/api";
// const BASE_URL = 'https://facturacion.grupocompustar.com/';
const API = axios.create({
  baseURL: BASE_URL,
});

export default API;
