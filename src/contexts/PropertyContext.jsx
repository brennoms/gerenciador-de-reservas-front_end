import { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getProperty } from '../services/propertiesService';
import { useAuth } from './AuthContext';
import { GetRestrictCalendar } from '../services/calendarService';

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
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    getProperty(propertyId, token).then(res => {
      setProperty(res);
    });
  }, []);

  useEffect(() => {
    GetRestrictCalendar(year, propertyId, token).then(res => {
      if (res?.ok) {
        setCalendar(res.data || []);
      }
    });
  }, [year]);

  return (
    <PropertyContext.Provider
      value={{
        year,
        setYear,
        property,
        setProperty,
        propertyId,
        selectedDates,
        setSelectedDates,
        calendar,
        setCalendar,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}
