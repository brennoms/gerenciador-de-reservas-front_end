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
          days.push({ date: day.date, number: day.dia });
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
    console.log(error.response);
    return { error: error, ok: false };
  }
}
