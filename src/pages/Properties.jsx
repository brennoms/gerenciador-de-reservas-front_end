import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PropertyCard from '../components/PropertyCard';
import { useSideBarContext } from '../layouts/PrivateLayout';
import { useAuth } from '../contexts/AuthContext';
import { listProperties } from '../services/propertiesService';

export default function Properties() {
  const { userId } = useParams();
  const { setOptions } = useSideBarContext();
  const { token } = useAuth();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    setOptions([
      { name: 'Adicionar Imovel', path: `/${userId}/properties/add` },
      { name: 'Remover Imovel', path: `/${userId}/properties/remove` },
    ]);
    listProperties(token).then(res => {
      if (res !== false) {
        setProperties(res);
      }
    });
  }, []);

  return (
    <div>
      <h1 className="text-center">Imóveis Disponíveis</h1>
      <div className="display-grid gap-2rem pad-1rem">
        {properties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
