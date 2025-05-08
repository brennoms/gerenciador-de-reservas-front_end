import { useRef } from 'react';

export default function MonthCalendar({ month }) {
  const CalendarRef = useRef(null);

  return (
    <div className="flex flex-col items-center">
      <p>{month.name}</p>
      <div className="grid grid-cols-7 gap-1" ref={CalendarRef}>
        {month.days.map(day => (
          <button
            className={`rounded aspect-square bg-white p-1 border border-black`}
            key={day.number}
            type="button"
          >
            {day.number}
          </button>
        ))}
      </div>
    </div>
  );
}
