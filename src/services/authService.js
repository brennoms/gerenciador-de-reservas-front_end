import api from './api';

export async function loginService(email, senha) {
  try {
    const res = await api.post('/usuarios/login', { email, senha });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function verifyService(token) {
  try {
    const res = await api.get('/usuarios/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
