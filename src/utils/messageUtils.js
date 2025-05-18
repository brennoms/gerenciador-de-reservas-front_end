import { isoToLocaleString } from './dataUtils';

export function getReservationMessage(reservation, property) {
  const formatedValue = Number(reservation.value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  const formatedDeposit = Number(reservation.deposit).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  console.log(formatedValue);
  return `Sua reserva foi feita em ${property.name}
  Nome do locatário: ${reservation.name}
  Telefone do locatário: ${reservation.contact}
  período: de ${isoToLocaleString(reservation.inityDate)} até ${isoToLocaleString(reservation.endDate)}.
  Valor total: ${formatedValue || 'não informado'}
  Valor do depósito: ${formatedDeposit || 'não informado'}
  Observações: ${reservation.observations || 'nenhuma'}`.trim();
}
