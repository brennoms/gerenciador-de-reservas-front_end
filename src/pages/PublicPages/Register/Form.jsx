import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useRegister } from './Register';
import { enviarCodigo } from '../../../services/userService';

export default function Register() {
  const { name, setName, email, setEmail, pass, setPass, confirmPass, setConfirmPass } =
    useRegister();
  const [alert, setAlert] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    if (pass !== confirmPass) {
      setAlert('As senhas não conferem.');
      return;
    }
    enviarCodigo(email).then(res => {
      if (res.result) {
        setAlert(res.message);
        navigate('/register/auth');
      } else {
        setAlert(res.message || 'Erro ao enviar código.');
      }
    });
  };

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <form className="flex flex-col items-center justify-center gap-1" onSubmit={handleSubmit}>
        <h1 className="pb-4 font-bold text-5xl text-center cursor-default">Cadastro</h1>

        <input
          className="login-entry"
          type="text"
          placeholder="Nome"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          className="login-entry"
          type="email"
          placeholder="e-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          className="login-entry"
          type="password"
          placeholder="nova senha"
          value={pass}
          onChange={e => setPass(e.target.value)}
          required
        />

        <input
          className="login-entry"
          type="password"
          placeholder="confirmar senha"
          value={confirmPass}
          onChange={e => setConfirmPass(e.target.value)}
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
