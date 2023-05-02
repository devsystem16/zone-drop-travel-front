import axios from "axios";

export const transformText = (text) => {
  var array = [];
  // Encuentra todos los números en el texto usando una expresión regular
  const numbers = text.match(/\d+/g);

  // Si no se encontraron números, devuelve el texto original
  if (!numbers) {
    return [];
  }

  // Si se encontró un solo número, devuelve ese número y asume que se trata de días
  if (numbers.length === 1) {
    array.push(parseInt(numbers[0]));
    return array;
  }

  // Si se encontraron dos números, devuelve ambos números con etiquetas de días y noches
  if (numbers.length === 2) {
    array.push(parseInt(numbers[0]));
    array.push(parseInt(numbers[1]));
    return array;
  }

  array.push(parseInt(numbers[0]));
  array.push(parseInt(numbers[1]));
  // Si se encontraron más de dos números, devuelve solo los primeros dos con etiquetas de días y noches
  return array;
};
export const transformText2 = (text) => {
  // Encuentra todos los números en el texto usando una expresión regular
  const numbers = text.match(/\d+/g);

  // Si no se encontraron números, devuelve el texto original
  if (!numbers) {
    return text;
  }

  // Si se encontró un solo número, devuelve ese número y asume que se trata de días
  if (numbers.length === 1) {
    return `${numbers[0]} días`;
  }

  // Si se encontraron dos números, devuelve ambos números con etiquetas de días y noches
  if (numbers.length === 2) {
    return `${numbers[0]} días ${numbers[1]} noches`;
  }

  // Si se encontraron más de dos números, devuelve solo los primeros dos con etiquetas de días y noches
  return `${numbers[0]} días ${numbers[1]} noches`;
};

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
export const DEFAULT_NACIONALIDAD = 9;
// export default API;
