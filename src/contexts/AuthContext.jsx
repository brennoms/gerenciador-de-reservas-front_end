import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  // Função de login (você pode chamar sua API aqui dentro)
  function login(userData) {
    setToken(userData);
    // Aqui você pode salvar no localStorage se quiser persistir
  }

  // Função de logout
  function logout() {
    setToken(null);
    // Também pode limpar o localStorage aqui
  }

  return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>;
}
