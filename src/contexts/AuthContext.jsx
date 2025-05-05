import { createContext, useContext, useState, useEffect } from 'react';

import { loginService, verifyService } from '../services/authService';
import { getUser } from '../services/userService';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    verifyStorageToken();
  }, []);

  async function verifyStorageToken() {
    const storedToken = JSON.parse(localStorage.getItem('token'));
    const storedUserId = localStorage.getItem('userId');
    if (storedToken) {
      const res = await verifyService(storedToken);
      if (!res) {
        localStorage.removeItem('token');
        setToken(null);
        setUserId(null);
        return false;
      } else {
        setToken(storedToken);
        setUserId(storedUserId);
        return storedUserId;
      }
    }
  }

  async function login(userData) {
    const res = await loginService(userData.email, userData.pass);
    if (!res.token) {
      return res;
    }
    const { _id: userId } = await getUser(res.token);
    localStorage.setItem('token', JSON.stringify(res.token));
    localStorage.setItem('userId', userId);
    setToken(res.token);
    setUserId(userId);
    return userId;
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setToken(null);
    setUserId(null);
  }

  return (
    <AuthContext.Provider value={{ token, userId, login, logout, verifyStorageToken }}>
      {children}
    </AuthContext.Provider>
  );
}
