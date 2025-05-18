import { createContext, useContext, useState } from 'react';
import { SucessAlert } from '../components/SucessAlert';

const AlertContext = createContext();

export function useAlert() {
  return useContext(AlertContext);
}

export function AlertProvider({ children }) {
  const [sucessAlertMessage, setSucessAlert] = useState(null);

  return (
    <AlertContext.Provider value={{ setSucessAlert }}>
      {sucessAlertMessage ? <SucessAlert message={sucessAlertMessage} /> : <></>}
      {children}
    </AlertContext.Provider>
  );
}
