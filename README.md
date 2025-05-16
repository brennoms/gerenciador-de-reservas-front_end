# 🏡 Gerenciador de Reservas - Documentação

## 📋 Visão Geral

Este projeto é uma aplicação front-end para gerenciamento de imóveis e suas reservas, desenvolvida com React e Vite. A aplicação permite que usuários autenticados cadastrem imóveis, gerenciem reservas e visualizem um calendário de disponibilidade de forma intuitiva.

---

## 🚀 Tecnologias Utilizadas

- **[Vite](https://vitejs.dev/)**: Build tool ultra rápida para desenvolvimento moderno
- **[React](https://react.dev/)**: Biblioteca JavaScript para construção de interfaces
- **[React Router DOM](https://reactrouter.com/)**: Gerenciamento de rotas e navegação
- **[Axios](https://axios-http.com/)**: Cliente HTTP para comunicação com a API
- **[Context API](https://react.dev/learn/scaling-up-with-reducer-and-context)**: Gerenciamento de estado global
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework CSS para estilização rápida e responsiva
- **[ESLint](https://eslint.org/)**: Ferramenta de linting para manter padrões de código

---

## 🏗️ Arquitetura do Projeto

### Estrutura de Pastas

```
src/
├── assets/          # Imagens e arquivos estáticos
├── components/      # Componentes reutilizáveis
├── contexts/        # Contextos globais (ex: AuthContext)
├── hooks/           # Custom hooks (ex: useAuth)
├── layouts/         # Layouts (público e privado)
├── pages/           # Páginas da aplicação
├── routes/          # Configuração de rotas
├── services/        # Integração com API (axios)
├── utils/           # Funções utilitárias
├── App.jsx          # Componente principal
└── main.jsx         # Ponto de entrada da aplicação
```

### Camadas da Aplicação

1. **Apresentação**: Componentes e páginas que formam a interface do usuário
2. **Lógica de Negócio**: Hooks e contextos que gerenciam o estado e comportamento
3. **Serviços**: Módulos que encapsulam a comunicação com a API
4. **Utilitários**: Funções auxiliares para manipulação de dados

---

## 🔄 Fluxo de Dados

1. **Autenticação**:

   - Login/Registro via `authService.js`
   - Armazenamento de token JWT
   - Verificação de autenticação em rotas protegidas

2. **Gerenciamento de Imóveis**:

   - Listagem, adição e remoção via `propertiesService.js`
   - Upload de imagens com suporte a multipart/form-data

3. **Gerenciamento de Reservas**:
   - Criação e remoção de reservas via `reservationService.js`
   - Visualização de calendário de disponibilidade via `calendarService.js`

---

## 🔐 Autenticação e Autorização

O sistema utiliza autenticação baseada em tokens JWT:

- Login e registro de usuários via endpoints dedicados
- Armazenamento seguro de tokens
- Verificação de autenticação para acesso a rotas protegidas
- Interceptores Axios para inclusão automática de tokens em requisições

---

## 📡 Integração com API

A comunicação com o backend é realizada através de serviços dedicados:

- **api.js**: Configuração base do Axios
- **authService.js**: Autenticação de usuários
- **propertiesService.js**: Gerenciamento de imóveis
- **reservationService.js**: Gerenciamento de reservas
- **calendarService.js**: Obtenção de dados de calendário
- **userService.js**: Operações relacionadas a usuários

---

## ⚙️ Instalação e Configuração

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Passos para Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/gerenciador-de-reservas-front-end.git
cd gerenciador-de-reservas-front-end
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione a URL da API:
   - ⚠️ **Atenção:** O arquivo `.env` **não deve ser versionado**. Ele contém dados sensíveis.

```
VITE_API_URL=http://localhost:3000
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

5. Acesse a aplicação em [http://localhost:5173](http://localhost:5173)

---

## 🧪 Desenvolvimento e Testes

### Comandos Disponíveis

- **Desenvolvimento**: `npm run dev`
- **Build de produção**: `npm run build`
- **Preview da build**: `npm run preview`
- **Lint**: `npm run lint`

---

## 🔍 Funcionalidades Principais

### Usuários

- Cadastro de novos usuários
- Login e autenticação
- Visualização e edição de perfil

### Imóveis

- Listagem de imóveis cadastrados
- Adição de novos imóveis com upload de imagens
- Edição e remoção de imóveis existentes
- Visualização detalhada de imóveis

### Reservas

- Criação de novas reservas
- Visualização de reservas existentes
- Cancelamento de reservas
- Calendário interativo de disponibilidade

---

## 📈 Roadmap de Desenvolvimento

### Funcionalidades Planejadas

- **Upload de imagens múltiplas**: Permitir upload de várias imagens por imóvel
- **Filtros avançados**: Implementar busca e filtros para imóveis
- **Melhorias de UX/UI**: Aprimorar a experiência do usuário
- **Sistema de notificações**: Alertas para novas reservas e atualizações
- **Dashboard analítico**: Estatísticas de ocupação e receita
- **Integração com pagamentos**: Processamento de pagamentos online

---

## 📄 Licença

Este projeto ainda não possui uma licença definida.

---

## 👥 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request
