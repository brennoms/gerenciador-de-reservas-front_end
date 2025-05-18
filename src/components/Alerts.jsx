import { X } from 'lucide-react'; // ou qualquer ícone

import { useAlert } from '../contexts/AlertContext';

export function SucessAlert({ message }) {
  const { setSucessAlert } = useAlert();

  return (
    <div className="bg-green-500 py-2 px-4 rounded-md text-white text-center fixed bottom-4 right-4 flex gap-4">
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
    <div className="bg-red-500 py-2 px-4 rounded-md text-white text-center fixed bottom-4 right-4 flex gap-4">
      <p>{message}</p>
      <button type="button" onClick={() => setFailureAlert(null)}>
        <X />
      </button>
    </div>
  );
}
