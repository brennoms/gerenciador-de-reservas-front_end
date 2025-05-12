import { useState } from 'react';
import { StepBack, StepForward } from 'lucide-react';

import CalendarMonth from './CalendarMonth';
import Carrousel from './Carrousel';
import { useProperty } from '../contexts/PropertyContext';

export default function CalendarYear({ carrousel, click }) {
  const { year, setYear, calendar } = useProperty();
  const [prevCarrouselIndex, setPrevCarrouselIndex] = useState(new Date().getMonth());

  function decreaseYear() {
    if (!(year - 1 < 2000)) {
      setYear(year - 1);
    }
  }
  function increaseYear() {
    setYear(year + 1);
  }
  function changeYear(index) {
    if (index === 0 && prevCarrouselIndex === calendar.length - 1) {
      increaseYear();
    } else if (index === calendar.length - 1 && prevCarrouselIndex === 0) {
      decreaseYear();
    }
    setPrevCarrouselIndex(index);
  }

  return (
    <div className="bg-gray-300 rounded pb-2">
      <div className="flex items-center justify-around sm:justify-center pb-2 pt-2">
        <button type="button" onClick={decreaseYear}>
          <StepBack />
        </button>
        <p className="text-center text-xl sm:default-h1">{year}</p>
        <button type="button" onClick={increaseYear}>
          <StepForward />
        </button>
      </div>
      {carrousel ? (
        <>
          <Carrousel
            afterChange={changeYear}
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
