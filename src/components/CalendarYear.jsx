import { useEffect, useState } from 'react';
import { StepBack, StepForward } from 'lucide-react';

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
      <div className="flex items-center justify-around sm:justify-center pb-2 pt-2">
        <button>
          <StepBack />
        </button>
        <p className="text-center text-xl sm:default-h1">{year}</p>
        <button>
          <StepForward />
        </button>
      </div>
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
