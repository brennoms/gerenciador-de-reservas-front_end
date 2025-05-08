import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import PropertyCard from '../components/PropertyCard';
import { useSideBarContext } from '../layouts/PrivateLayout';
import { useAuth } from '../contexts/AuthContext';
import { listProperties } from '../services/propertiesService';

export default function Properties() {
  const location = useLocation();
  const { setOptions } = useSideBarContext();
  const { token } = useAuth();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    setOptions([
      { name: 'Adicionar Imovel', path: `${location.pathname}/add` },
      { name: 'Remover Imovel', path: `${location.pathname}/remove` },
    ]);
    listProperties(token).then(res => {
      if (res !== false) {
        setProperties(res);
      }
    });
  }, []);

  return (
    <div className="w-full h-full">
      <h1 className="default-h1">Imóveis Disponíveis</h1>
      <div className="flex flex-wrap justify-center sm:justify-start min-w-full h-full">
        {properties.map(property => (
          <PropertyCard
            className="w-11/12 sm:w-1/2 lg:w-1/3 p-1 sm:p-2"
            key={property.id}
            property={property}
          />
        ))}
      </div>
    </div>
  );
}
