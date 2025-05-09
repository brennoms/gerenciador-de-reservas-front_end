import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useSideBarContext } from '../layouts/PrivateLayout';
import { useProperty } from '../contexts/PropertyContext';
import CalendarYear from '../components/CalendarYear';

export default function Property() {
  const location = useLocation();
  const isChildRoute = location.pathname.endsWith('/reservations');
  const { setOptions } = useSideBarContext();
  const { property, year, selectedDates, setSelectedDates } = useProperty();

  useEffect(() => {
    if (!isChildRoute) {
      setOptions([
        { name: 'Fazer Reserva', path: `${location.pathname}/reservations` },
        { name: 'voltar', path: -1 },
      ]);
    } else {
      setOptions([{ name: 'voltar', path: -1 }]);
    }
  }, [location]);

  function selectDate(day) {
    setSelectedDates([day]);
  }

  return (
    <div className="max-w-full h-full pr-3">
      {isChildRoute ? (
        <Outlet />
      ) : (
        <>
          <div className="flex flex-col items-center mb-2">
            {property ? (
              <>
                <h1 className="default-h1 mb-0">{property.name}</h1>
                <p className="text-gray-500">{property.adress}</p>
                <img className="rounded w-11/12 sm:w-min" src={property.imageUrl} />
              </>
            ) : (
              <></>
            )}
          </div>
          <hr className="border" />
          <div className="flex flex-col sm:flex-row max-w-full max-h-fit p-2">
            <div className="w-full sm:w-1/2 2xl:w-2/3">
              <CalendarYear year={year} carrousel={window.innerWidth < 1285} click={selectDate} />
            </div>
            <div className="w-full sm:w-1/2 2xl:w-1/3">
              <p className="default-h1 text-2xl">detalhes da reserva</p>
              <pre className=" p-5">
                <code>{JSON.stringify(selectedDates[0]).replace(/[{},]/g, '\n')}</code>
              </pre>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
