import { useProperty } from '../contexts/PropertyContext';

export default function MonthCalendar({ month, click }) {
  const { selectedDates } = useProperty();

  function format(day) {
    let style = {};
    if (selectedDates.some(date => date?.date === day.date)) {
      style.backgroundColor = ' #60A5FA';
    } else if (
      day.date.split('-')[1] < month.monthNumber + 1 ||
      day.date.split('-')[1] > month.monthNumber + 1
    ) {
      style.background = 'none';
      style.fontSize = '0.9rem';
    }
    if (day.reservation) {
      if (selectedDates.some(date => date?.date === day.date)) {
        style.backgroundColor = ' #F59E0B';
      } else {
        style.backgroundColor = ' #FBBF24';
      }
    }
    if (
      day.date.split('-')[1] < month.monthNumber + 1 ||
      day.date.split('-')[1] > month.monthNumber + 1
    ) {
      style.filter = 'brightness(85%)';
      style.fontSize = '0.9rem';
    }
    if (day.holiday) {
      style.color = 'red';
    }
    if (day.currentDay) {
      style.borderColor = 'black';
      style.border = '1rem';
    }
    return style;
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
            className={`rounded aspect-square p-1 bg-white hover:bg-blue-300`}
            style={format(day)}
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
