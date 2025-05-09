import { useProperty } from '../contexts/PropertyContext';

export default function MonthCalendar({ month, click }) {
  const { selectedDates } = useProperty();

  function format(day) {
    let css = '';
    if (day.reservation) {
      if (selectedDates.some(date => date.date === day.date)) {
        css += ' bg-yellow-500';
      } else {
        css += ' bg-yellow-400';
      }
    }
    if (day.holiday) {
      css += ' text-red-500';
    }
    if (day.currentDay) {
      css += ' border border-black';
    }
    if (
      day.date.split('-')[1] < month.monthNumber + 1 ||
      day.date.split('-')[1] > month.monthNumber + 1
    ) {
      css += ' bg-transparent border-0';
    }
    return css;
  }

  return (
    <div
      className={`flex flex-col items-center pb-2 ${month.days[15].date.slice(0, -3) === new Date().toISOString().split('T')[0].slice(0, -3) ? 'bg-black/10 rounded' : ''}`}
    >
      <p>{month.monthName}</p>
      <div className={`grid grid-cols-7 gap-1 w-11/12`}>
        <p className="text-center">dom</p>
        <p className="text-center">seg</p>
        <p className="text-center">ter</p>
        <p className="text-center">qua</p>
        <p className="text-center">qui</p>
        <p className="text-center">sex</p>
        <p className="text-center">sab</p>
        {month.days.map(day => (
          <button
            className={`rounded aspect-square p-1 bg-white ${format(day)} ${selectedDates.some(date => date.date === day.date) ? 'bg-blue-400' : ''}`}
            key={day.date}
            type="button"
            onClick={() => click(day)}
          >
            {day.number}
          </button>
        ))}
      </div>
    </div>
  );
}
