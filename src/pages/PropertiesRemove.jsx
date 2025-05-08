import { useEffect, useState } from 'react';

import PropertyDeleteCard from '../components/PropertyDeleteCard';
import { useSideBarContext } from '../layouts/PrivateLayout';
import { useAuth } from '../contexts/AuthContext';
import { listProperties } from '../services/propertiesService';

export default function Properties() {
  const { setOptions } = useSideBarContext();
  const { token } = useAuth();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    setOptions([{ name: 'Voltar', path: -1 }]);
    listProperties(token).then(res => {
      if (res !== false) {
        setProperties(res);
      }
    });
  }, []);

  function reload() {
    listProperties(token).then(res => {
      if (res !== false) {
        setProperties(res);
      }
    });
  }

  return (
    <div className="w-full h-full">
      <h1 className="text-center text-3xl m-4">Remover</h1>
      <div className="flex flex-wrap justify-center sm:justify-start min-w-full h-full">
        {properties.map(property => (
          <PropertyDeleteCard
            className={'w-11/12 sm:w-1/2 lg:w-1/3 p-1 sm:p-2'}
            key={property.id}
            property={property}
            onDelete={reload}
          />
        ))}
      </div>
    </div>
  );
}
