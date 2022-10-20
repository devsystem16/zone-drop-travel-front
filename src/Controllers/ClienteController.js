import API from "../Environment/config";

export const buscarCliente = async (id) => {
  try {
    var response = await API.get("/cliente/find/" + id);
    if (response.status !== 200) {
      return { encontro: false, cliente: null };
    }
    var data = response.data;
    data.existente = true;
    return { encontro: true, cliente: data };
  } catch (error) {
    return { encontro: false, cliente: null };
  }
};
