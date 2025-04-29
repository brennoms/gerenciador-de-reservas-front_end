import { useState } from 'react';

import { useAuth } from '../contexts/AuthContext';
import '../styles/displays.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login } = useAuth();

  const handleSubmit = e => {
    e.preventDefault();
    login({ email, senha });
  };

  return (
    <div className="flex column-center min-height-80vh">
      <form onSubmit={handleSubmit} className="flex column-center gap-1">
        <h1>Login</h1>

        <input
          type="email"
          value={email}
          placeholder="e-mail"
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          value={senha}
          placeholder="senha"
          onChange={e => setSenha(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
