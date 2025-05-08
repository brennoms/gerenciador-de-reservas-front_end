import { useEffect, useState } from 'react';

import CalendarMonth from './CalendarMonth';
import Carrousel from './Carrousel';
import { GetRestrictCalendar } from '../services/calendarService';
import { useProperty } from '../contexts/PropertyContext';
import { useAuth } from '../contexts/AuthContext';

export default function CalendarYear() {
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
    <>
      <p className="text-center">{year}</p>
      <Carrousel
        cards={calendar.map(month => (
          <CalendarMonth key={month.monthNumber} month={month} />
        ))}
        initialCard={new Date().getMonth()}
      />
    </>
  );
}
