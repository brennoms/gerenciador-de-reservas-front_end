import { useProperty } from '../contexts/PropertyContext';

export default function MonthCalendar({ month }) {
  const { selectedDates } = useProperty();

  function format(day) {
    let css = '';
    if (day.holiday) {
      css += ' bg-blue-500';
    }
    if (day.currentDay) {
      css += ' bg-blue-300';
    }
    if (
      day.date.split('-')[1] < month.monthNumber + 1 ||
      day.date.split('-')[1] > month.monthNumber + 1
    ) {
      css += ' bg-gray-300 border-0';
    }
    if (selectedDates.includes(day.date)) {
      css += ' ';
    }
    return css;
  }

  return (
    <div className="flex flex-col items-center">
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
            className={`rounded aspect-square border border-black p-1 ${format(day)} bg-white`}
            key={day.date}
            type="button"
          >
            {day.number}
          </button>
        ))}
      </div>
    </div>
  );
}
