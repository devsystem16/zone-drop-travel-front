import axios from "axios";

// const BASE_URL = "http://zone-drop-travel-back.test/api";
// const BASE_URL = "https://dropxonetravel.herokuapp.com/api";
//PRODUCCION
const BASE_URL = "https://reserva.dropzonetravel.com.ec/api";
const API = axios.create({
  baseURL: BASE_URL,
});

export const validarImagen = (event, file) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  const maxFileSize = MAX_LEN_IMAGE * 1024 * 1024; // 2MB

  const hasFormatoPermitido = file && allowedTypes.includes(file.type);
  const hastamañoPermitido = file.size <= maxFileSize;
  if (!hasFormatoPermitido) {
    event.target.value = null;
    alertify.error("No es un formato de imagen Valido.");
    return false;
  }
  if (!hastamañoPermitido) {
    event.target.value = null;
    alertify.error("La imagen Sobrepasa los 2MB");
    return false;
  }
  return true;
};

export const MAX_LEN_IMAGE = 2;
export default API;
