import { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getProperty } from '../services/propertiesService';
import { useAuth } from './AuthContext';

const PropertyContext = createContext();

export function useProperty() {
  return useContext(PropertyContext);
}

export function PropertyProvider({ children }) {
  const { propertyId } = useParams();
  const { token } = useAuth();
  const [property, setProperty] = useState({});
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedDates, setSelectedDates] = useState([new Date().toISOString().split('T')[0]]);
  const [yearCalendar] = useState({});

  useEffect(() => {
    getProperty(propertyId, token).then(res => {
      setProperty(res);
    });
  }, []);

  return (
    <PropertyContext.Provider
      value={{
        year,
        setYear,
        property,
        setProperty,
        selectedDates,
        setSelectedDates,
        yearCalendar,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}
