import { createContext, useContext, useState } from 'react';
import { Alert } from '../components/Alert';

const AlertContext = createContext();

export function useAlert() {
  return useContext(AlertContext);
}

export function AlertProvider({ children }) {
  const [alertMessage, setAlertMessage] = useState(null);

  return (
    <AlertContext.Provider value={{ setAlertMessage }}>
      {alertMessage ? <Alert message={alertMessage} /> : <></>}
      {children}
    </AlertContext.Provider>
  );
}
