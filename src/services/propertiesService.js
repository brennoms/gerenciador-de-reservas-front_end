import api from './api';

export async function listProperties(token) {
  try {
    const res = await api.get(`/imoveis`, { headers: { Authorization: `Bearer ${token}` } });
    if (res.status === 200) {
      const imoveis = [];
      for (const imovel of res.data.imoveis) {
        imoveis.push({
          id: imovel._id,
          name: imovel.nome,
          adress: imovel.endereco,
          image: imovel.imagem,
        });
      }
      return imoveis;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function addProperty(data, token) {
  const property = {
    nome: data.name,
    endereco: data.adress,
    imagem: data.image,
  };
  try {
    console.log(property);
    const res = await api.post('/imoveis', property, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
    return error.response.data.erro;
  }
}

export async function removeProperty(propertyId, token) {
  try {
    const res = await api.delete(`/imoveis/${propertyId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status == 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
