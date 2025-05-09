import { useEffect } from 'react';

import { useSideBarContext } from '../layouts/PrivateLayout';
import { useProperty } from '../contexts/PropertyContext';
import CalendarYear from '../components/CalendarYear';

export default function Property() {
  const { setOptions } = useSideBarContext();
  const { year, selectedDates, setSelectedDates } = useProperty();

  useEffect(() => {
    setOptions([{ name: 'voltar', path: -1 }]);
    setSelectedDates([]);
  }, []);

  function selectDates(day) {
    if (selectedDates.length === 0) {
      setSelectedDates([day]);
    } else if (selectedDates.length === 1) {
      setSelectedDates([...selectedDates, day]);
    } else {
      setSelectedDates([day]);
    }
  }

  return (
    <div className="max-w-full h-full pr-3">
      <hr className="border" />
      <div className="flex flex-col sm:flex-row max-w-full max-h-fit p-2">
        <div className="w-full sm:w-1/2 2xl:w-2/3">
          <CalendarYear year={year} carrousel={window.innerWidth < 1285} click={selectDates} />
        </div>
        <div className="w-full sm:w-1/2 2xl:w-1/3">
          <p className="default-h1 text-2xl">detalhes da reserva</p>
        </div>
      </div>
    </div>
  );
}
