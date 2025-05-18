import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [alert, setAlert] = useState('');
  const { login, verifyStorageToken } = useAuth();

  useEffect(() => {
    async function checkToken() {
      const userId = await verifyStorageToken();
      if (userId) {
        navigate(`/${userId}/properties`, { replace: true });
      }
    }
    checkToken();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    login({ email, pass }).then(res => {
      if (res.erro) {
        setAlert(res.erro);
      } else {
        navigate(`/${res}/properties`, { replace: true });
      }
    });
  };

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-1">
        <h1 className="pb-4 font-bold text-5xl text-center cursor-default">Entrar</h1>

        <input
          className="login-entry"
          type="email"
          value={email}
          placeholder="e-mail"
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          className="login-entry"
          type="password"
          value={pass}
          placeholder="senha"
          onChange={e => setPass(e.target.value)}
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
