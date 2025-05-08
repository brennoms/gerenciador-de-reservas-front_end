import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { useSideBarContext } from '../layouts/PrivateLayout';
import { getProperty } from '../services/propertiesService';
import Carrousel from '../components/Carrousel';
import MonthCalendar from '../components/MonthCalendar';

export default function Property() {
  const { propertyId } = useParams();
  const { setOptions } = useSideBarContext();
  const { token } = useAuth();
  const [property, setProperty] = useState(null);
  const [year] = useState(new Date().getFullYear());
  const [calendars, setCalendars] = useState([]);

  useEffect(() => {
    setOptions([{ name: 'voltar', path: -1 }]);
    getProperty(propertyId, token).then(res => {
      setProperty(res);
    });
  }, []);

  useEffect(() => {
    const list = [];
    for (let i = 1; i < 13; i++) {
      list.push(<MonthCalendar month={i} />);
    }
    setCalendars(list);
  }, [year]);

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
        <div className="bg-red-500 w-full sm:w-1/2">
          <p className="text-center">{year}</p>
          <Carrousel cards={calendars} initialCard={new Date().getMonth()} />
        </div>
        <div className="bg-blue-500 w-full sm:w-1/2">
          <p>detalhes da reserva</p>
        </div>
      </div>
    </div>
  );
}
