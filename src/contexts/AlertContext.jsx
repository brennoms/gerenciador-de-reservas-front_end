import { createContext, useContext, useState } from 'react';
import { SucessAlert, FailureAlert } from '../components/Alerts';

const AlertContext = createContext();

export function useAlert() {
  return useContext(AlertContext);
}

export function AlertProvider({ children }) {
  const [sucessAlertMessage, setSucessAlert] = useState(null);
  const [failureAlertMessage, setFailureAlert] = useState(null);

  return (
    <AlertContext.Provider value={{ setSucessAlert, setFailureAlert }}>
      {sucessAlertMessage ? <SucessAlert message={sucessAlertMessage} /> : <></>}
      {failureAlertMessage ? <FailureAlert message={failureAlertMessage} /> : <></>}
      {children}
    </AlertContext.Provider>
  );
}
