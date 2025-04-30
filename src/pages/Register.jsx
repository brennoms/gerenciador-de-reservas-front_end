import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { registerUser } from '../services/userService';
import { useAuth } from '../contexts/AuthContext';
import '../styles/displays.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [alert, setAlert] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (pass !== confirmPass) {
      setAlert('As senhas não conferem.');
      return;
    }
    const { result, message } = await registerUser(name, email, pass);
    if (result) {
      await login({ email, pass });
      navigate('/login', { replace: true });
    } else {
      setAlert(message || 'Erro ao cadastrar usuário.');
    }
  };

  return (
    <div className="flex column-center min-height-80vh">
      <form className="flex column-center gap-1" onSubmit={handleSubmit}>
        <h1>Cadastro</h1>

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="e-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="senha"
          value={pass}
          onChange={e => setPass(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="confirmar senha"
          value={confirmPass}
          onChange={e => setConfirmPass(e.target.value)}
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
