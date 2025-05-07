import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { useSideBarContext } from '../layouts/PrivateLayout';
import { getProperty } from '../services/propertiesService';
import Carrousel from '../components/Carrousel';

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
      list.push(
        <div>
          <p>mes {i}</p>
        </div>
      );
    }
    setCalendars(list);
  }, [year]);

  return (
    <div className="flex column-center">
      {property ? (
        <>
          <h1 className="text-center">{property.name}</h1>
          <img className="border-radius-1rem" src={property.imageUrl} />
          <p className="marborpad0">{property.adress}</p>
        </>
      ) : (
        ''
      )}
      <hr className="width90p" />
      <p>{year}</p>
      <div className="flex" style={{ width: '100%' }}>
        <div style={{ width: '50%' }}>
          <Carrousel cards={calendars} initialCard={new Date().getMonth()} />
        </div>
        <div style={{ width: '50%' }}>
          <p>detalhes da reserva</p>
        </div>
      </div>
    </div>
  );
}
