import api from './api';

export async function registerUser(name, email, pass, code) {
  try {
    const res = await api.post('/usuarios/cadastro', {
      nome: name,
      email: email,
      senha: pass,
      codigo: code,
    });
    if (res.status === 201) {
      return { result: true, message: res.data.mensagem || 'Usuário cadastrado com sucesso.' };
    }
  } catch (error) {
    console.log(error);
    return { result: false, message: error?.response?.data?.erro };
  }
}

export async function enviarCodigo(email) {
  try {
    const res = await api.post('/usuarios/cadastro/codigo', { email: email }, { timeout: 100000 });
    if (res.status === 201) {
      return { result: true, message: res.data.mensagem || 'Código enviado com sucesso.' };
    }
  } catch (error) {
    console.log(error);
    return { result: false, message: error?.response?.data?.error || null };
  }
}

export async function getUser(token) {
  try {
    const res = await api.get('/usuarios/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}
