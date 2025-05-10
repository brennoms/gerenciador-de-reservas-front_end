import api from './api.js';

export async function makeReservation(reservation, propertyId, token) {
  if (!reservation) {
    return { message: 'dados faltando', ok: false };
  }
  const data = {
    nome: reservation.tenantName,
    contato: reservation.contact,
    sinal: reservation.deposit,
    valor: reservation.value,
    data_inicio: reservation.initDate,
    data_fim: reservation.endDate,
  };
  try {
    const res = await api.post(`/imoveis/${propertyId}/reservas`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.ok = true;
    return res;
  } catch (error) {
    console.log(error);
    return { message: Object.values(error.response.data)[0] || 'erro ao fazer reserva', ok: false };
  }
}
