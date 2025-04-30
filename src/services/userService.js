import api from './api';

export async function registerUser(name, email, pass) {
  try {
    const res = await api.post('/usuarios/cadastro', { nome: name, email: email, senha: pass });
    if (res.status === 201) {
      return { result: true, message: res.data.mensagem || 'Usuário cadastrado com sucesso.' };
    }
  } catch (error) {
    console.log(error);
    return { result: false, message: error?.response?.data?.erro };
  }
}
