# 🏡 Gerenciador de reservas - Front-end

Este projeto é o **front-end** de uma aplicação para gerenciamento de **imóveis** e suas **reservas**.  
Foi desenvolvido com **Vite + React (JavaScript)** e se conecta a uma **API** já existente.

---

## 📋 Funcionalidades

- Cadastro e login de usuário
- Visualização dos imóveis cadastrados
- Criação, edição e exclusão de imóveis
- Visualização e gerenciamento de reservas associadas aos imóveis
- Interface intuitiva e responsiva

---

## 🚀 Tecnologias

- [Vite](https://vitejs.dev/) — Build tool ultra rápida
- [React](https://react.dev/) — Biblioteca para construção de interfaces
- [React Router DOM](https://reactrouter.com/en/main) — Gerenciamento de rotas
- [Axios](https://axios-http.com/) — Cliente HTTP para comunicação com a API
- [Context API](https://react.dev/learn/scaling-up-with-reducer-and-context) — Gerenciamento de autenticação e estado global

---

## ⚙️ Instalação

Clone o projeto:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto e adicione:

```bash
# Substitua pela URL da sua API
VITE_API_URL=http://localhost:3000
```


Rode o projeto:

```bash
npm run dev
```

O app estará disponível em: [http://localhost:5173](http://localhost:5173)

---

## 🛠 Estrutura de pastas

```
src/
├── assets/          # Imagens e arquivos estáticos
├── components/      # Componentes reutilizáveis
├── pages/           # Páginas da aplicação
├── layouts/         # Layouts (público e privado)
├── services/        # Integração com API (axios)
├── hooks/           # Custom hooks (ex: autenticação)
├── contexts/        # Contextos globais (ex: AuthContext)
├── routes/          # Configuração de rotas
├── utils/           # Funções utilitárias
├── App.jsx
└── main.jsx
```

---

## ✅ To-do Futuro

- Upload de imagens dos imóveis
- Filtros e busca por imóveis
- Melhorias de UX/UI
- Notificações para reservas

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).
