import CalendarMonth from './CalendarMonth';
import Carrousel from './Carrousel';

export default function CalendarYear({ year }) {
  const days = [];
  for (let i = 1; i < 31; i++) {
    days.push({ number: i });
  }

  const months = {
    [year]: [
      {
        name: 'janeiro',
        number: 1,
        days: days,
      },
      {
        name: 'fevereiro',
        number: 2,
        days: days,
      },
      {
        name: 'março',
        number: 3,
        days: days,
      },
      {
        name: 'abril',
        number: 4,
        days: days,
      },
    ],
  };

  const calendar = [];
  for (const month of months.year) {
    calendar.push(<CalendarMonth month={month} />);
  }

  return calendar;
}
