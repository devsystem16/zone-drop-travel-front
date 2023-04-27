import axios from "axios";

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
// export default API;
