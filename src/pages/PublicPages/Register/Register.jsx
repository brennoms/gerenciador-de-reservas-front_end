import { Outlet } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';

import Form from './Form';
import Auth from './Auth';
export { Form, Auth };

const RegisterContext = createContext();

export function useRegister() {
  return useContext(RegisterContext);
}

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [code, setCode] = useState('');

  return (
    <RegisterContext.Provider
      value={{
        name,
        setName,
        email,
        setEmail,
        pass,
        setPass,
        confirmPass,
        setConfirmPass,
        code,
        setCode,
      }}
    >
      <Outlet />
    </RegisterContext.Provider>
  );
}
