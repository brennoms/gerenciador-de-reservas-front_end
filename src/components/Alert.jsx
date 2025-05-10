import { X } from 'lucide-react'; // ou qualquer ícone

import { useAlert } from '../contexts/AlertContext';

export function Alert({ message }) {
  const { setAlertMessage } = useAlert();

  return (
    <div className="bg-green-500 py-2 px-4 rounded-md text-white text-center fixed bottom-4 right-4 flex gap-4">
      <p>{message}</p>
      <button type="button" onClick={() => setAlertMessage(null)}>
        <X />
      </button>
    </div>
  );
}
