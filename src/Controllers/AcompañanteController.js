import API from "../Environment/config";

export const buscarAcompañante = async (documento) => {
  try {
    var response = await API.get("/acompaniante/find/" + documento);
    if (response.status !== 200) {
      return { encontro: false, acompañante: null };
    }
    var data = response.data;
    data.existente = true;
    return { encontro: true, acompañante: data };
  } catch (error) {
    return { encontro: false, acompañante: null };
  }
};
