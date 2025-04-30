import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [alert, setAlert] = useState('');
  const { login, verifyStorageToken } = useAuth();

  useEffect(() => {
    async function checkToken() {
      if (await verifyStorageToken()) {
        navigate('/properties', { replace: true });
      }
    }
    checkToken();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    login({ email, pass }).then(res => {
      if (res !== true) {
        setAlert(res);
      } else {
        navigate('/properties', { replace: true });
      }
    });
  };

  return (
    <div className="flex column-center min-height-80vh">
      <form onSubmit={handleSubmit} className="flex column-center gap-1">
        <h1>Entrar</h1>

        <input
          type="email"
          value={email}
          placeholder="e-mail"
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          value={pass}
          placeholder="senha"
          onChange={e => setPass(e.target.value)}
          required
        />

        <p className="alert">{alert}</p>
        <button type="submit" className="button1">
          Continuar
        </button>
      </form>
    </div>
  );
}
