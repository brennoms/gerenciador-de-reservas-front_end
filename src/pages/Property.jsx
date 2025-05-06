import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { useSideBarContext } from '../layouts/PrivateLayout';
import { getProperty } from '../services/propertiesService';

export default function Property() {
  const { propertyId } = useParams();
  const { setOptions } = useSideBarContext();
  const { token } = useAuth();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    setOptions([{ name: 'voltar', path: -1 }]);
    getProperty(propertyId, token).then(res => {
      setProperty(res);
    });
  }, []);

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
    </div>
  );
}
