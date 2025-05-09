import api from './api';

export async function GetRestrictCalendar(year, propertyId, token) {
  try {
    const res = await api.get(`/${propertyId}/calendario/restrito?ano=${year}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 200) {
      const year = [];
      for (const month of res.data) {
        const days = [];
        for (const day of month.dias) {
          const reservation = day.reserva
            ? {
                userId: day.reserva.usuario_id,
                propertyId: day.reserva.imovel_id,
                name: day.reserva.nome,
                contact: day.reserva.contato,
                inityDate: day.reserva.data_inicio,
                endDate: day.reserva.data_fim,
              }
            : undefined;
          days.push({
            date: day.date,
            number: day.dia,
            holiday: day.feriado,
            currentDay: day.dia_atual,
            reservation,
          });
        }
        year.push({
          year: month.ano,
          monthName: month.mes_nome,
          monthNumber: month.mes_numero,
          days,
        });
      }
      return { data: year, ok: true };
    }
    return res.erro;
  } catch (error) {
    console.log(error);
    return { error: error, ok: false };
  }
}
