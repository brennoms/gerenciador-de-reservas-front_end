import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useRegister } from './Register';
import { registerUser } from '../../../services/userService';
import { useAuth } from '../../../contexts/AuthContext';

export default function Auth() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState('');
  const { code, setCode, name, email, pass } = useRegister();
  const { login } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    const { result } = await registerUser(name, email, pass, code);
    if (result) {
      await login({ email, pass });
      navigate('/login', { replace: true });
    } else {
      setAlert('código inválido');
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <form className="flex flex-col items-center justify-center gap-1" onSubmit={handleSubmit}>
        <h2 className="w-80 pb-4 font-bold text-2xl text-center cursor-default">
          Digite o código que foi enviado para o seu e-mail
        </h2>

        <input
          className="login-entry"
          type="text"
          placeholder="Código"
          value={code}
          onChange={e => setCode(e.target.value)}
          required
        />

        <p className="alert">{alert}</p>
        <button type="submit" className="default-button w-full m-1">
          Continuar
        </button>
      </form>
    </div>
  );
}
