import { useEffect, useState } from 'react';

import CalendarMonth from './CalendarMonth';
import Carrousel from './Carrousel';
import { GetRestrictCalendar } from '../services/calendarService';
import { useProperty } from '../contexts/PropertyContext';
import { useAuth } from '../contexts/AuthContext';

export default function CalendarYear({ carrousel, click }) {
  const { token } = useAuth();
  const { year, propertyId } = useProperty();
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    GetRestrictCalendar(year, propertyId, token).then(res => {
      if (res?.ok) {
        setCalendar(res.data || []);
      }
    });
  }, []);

  return (
    <div className="bg-gray-300 rounded pb-2">
      <p className="text-center pt-2">{year}</p>
      {carrousel ? (
        <>
          <Carrousel
            cards={calendar.map(month => (
              <CalendarMonth key={month.monthNumber} month={month} click={click} />
            ))}
            initialCard={new Date().getMonth()}
          />
        </>
      ) : (
        <div className="flex flex-wrap gap-3 justify-center p-2">
          {calendar.map(month => (
            <CalendarMonth key={month.monthNumber} month={month} click={click} />
          ))}
        </div>
      )}
    </div>
  );
}
