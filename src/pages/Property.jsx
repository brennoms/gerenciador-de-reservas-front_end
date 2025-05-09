import { useEffect } from 'react';

import { useSideBarContext } from '../layouts/PrivateLayout';
import { useProperty } from '../contexts/PropertyContext';
import CalendarYear from '../components/CalendarYear';

export default function Property() {
  const { setOptions } = useSideBarContext();
  const { property, year } = useProperty();

  useEffect(() => {
    setOptions([{ name: 'voltar', path: -1 }]);
  }, []);

  return (
    <div className="max-w-full h-full pr-3">
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
          <CalendarYear year={year} carrousel={window.innerWidth < 1285} />
        </div>
        <div className="bg-blue-500 w-full h-screen sm:w-1/2 2xl:w-1/3">
          <p>detalhes da reserva</p>
        </div>
      </div>
    </div>
  );
}
