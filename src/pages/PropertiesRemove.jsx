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
    <div>
      <h1 className="text-center">Remover</h1>
      <div className="display-grid gap-2rem pad-1rem">
        {properties.map(property => (
          <PropertyDeleteCard key={property.id} property={property} onDelete={reload} />
        ))}
      </div>
    </div>
  );
}
