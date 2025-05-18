import { createContext, useContext, useState } from 'react';
import { SucessAlert, FailureAlert, YesOrNoAlert } from '../components/Alerts';

const AlertContext = createContext();

export function useAlert() {
  return useContext(AlertContext);
}

export function AlertProvider({ children }) {
  const [sucessAlertMessage, setSucessAlert] = useState(null);
  const [failureAlertMessage, setFailureAlert] = useState(null);
  const [yesOrNoAlertMessage, setYesOrNoAlert] = useState({
    message: null,
    yesMessage: null,
    noMessage: null,
    callBack: null,
  });

  return (
    <AlertContext.Provider value={{ setSucessAlert, setFailureAlert, setYesOrNoAlert }}>
      {sucessAlertMessage ? <SucessAlert message={sucessAlertMessage} /> : <></>}
      {failureAlertMessage ? <FailureAlert message={failureAlertMessage} /> : <></>}
      {yesOrNoAlertMessage?.message ? (
        <YesOrNoAlert
          message={yesOrNoAlertMessage.message}
          callBack={yesOrNoAlertMessage.callBack}
          yesMessage={yesOrNoAlertMessage.yesMessage}
          noMessage={yesOrNoAlertMessage.noMessage}
        />
      ) : (
        <></>
      )}
      {children}
    </AlertContext.Provider>
  );
}
