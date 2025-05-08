export default function MonthCalendar({ month }) {
  return (
    <div className="flex flex-col items-center">
      <p>{month.name}</p>
      <div className="grid grid-cols-7 gap-1">
        {month.days.map(day => (
          <button
            className="rounded aspect-square bg-white p-1 border border-black "
            key={day.number}
          >
            {day.number}
          </button>
        ))}
      </div>
    </div>
  );
}
