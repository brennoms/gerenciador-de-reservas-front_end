import { X, Check } from 'lucide-react';

import { useAlert } from '../contexts/AlertContext';

export function SucessAlert({ message }) {
  const { setSucessAlert } = useAlert();

  return (
    <div className="z-20 bg-green-500 py-2 px-4 rounded-md text-white text-center fixed bottom-4 right-4 flex gap-4">
      <p>{message}</p>
      <button type="button" onClick={() => setSucessAlert(null)}>
        <X />
      </button>
    </div>
  );
}

export function FailureAlert({ message }) {
  const { setFailureAlert } = useAlert();

  return (
    <div className="z-20 bg-red-500 py-2 px-4 rounded-md text-white text-center fixed bottom-4 right-4 flex gap-4">
      <p>{message}</p>
      <button type="button" onClick={() => setFailureAlert(null)}>
        <X />
      </button>
    </div>
  );
}

export function YesOrNoAlert({ message, yesMessage, noMessage, callBack }) {
  const { setYesOrNoAlert, setSucessAlert, setFailureAlert } = useAlert();
  return (
    <div className="fixed z-20 inset-0 w-screen h-screen flex justify-center items-center bg-black/50">
      <div className="bg-white  flex flex-col items-center p-5 m-5 rounded border border-black">
        <p className="">{message}</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setYesOrNoAlert(null);
              setFailureAlert(noMessage || null);
            }}
          >
            <X className="text-red-500" size={'2rem'} />
          </button>
          <button
            onClick={() => {
              setYesOrNoAlert(null);
              callBack?.();
              setSucessAlert(yesMessage || null);
            }}
          >
            <Check className="text-green-500" size={'2rem'} />
          </button>
        </div>
      </div>
    </div>
  );
}
