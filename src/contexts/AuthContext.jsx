import { createContext, useContext, useState, useEffect } from 'react';

import { loginService, verifyService } from '../services/authService';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    verifyStorageToken();
  }, []);

  async function verifyStorageToken() {
    const storedToken = JSON.parse(localStorage.getItem('token'));
    if (storedToken) {
      const res = await verifyService(storedToken);
      if (!res) {
        localStorage.removeItem('token');
        setToken(null);
        return false;
      } else {
        setToken(storedToken);
        return true;
      }
    }
  }

  async function login(userData) {
    const res = await loginService(userData.email, userData.pass);
    if (!res.token) {
      return res.erro;
    }
    localStorage.setItem('token', JSON.stringify(res.token));
    setToken(res.token);
    return true;
  }

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, verifyStorageToken }}>
      {children}
    </AuthContext.Provider>
  );
}
