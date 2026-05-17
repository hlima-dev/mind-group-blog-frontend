# Mind Group Blog — Frontend

Frontend desenvolvido para o case de estágio da Mind Group, simulando uma plataforma completa de publicação de artigos com autenticação, gerenciamento de posts e upload de imagens em nuvem.

---

# Demonstração Online

## Frontend
https://mind-group-blog-frontend.vercel.app

## Backend API
https://mind-group-blog-api.onrender.com

---

# Arquitetura do Projeto

O projeto utiliza arquitetura FULLSTACK moderna com deploy em nuvem:

- Frontend hospedado na Vercel
- Backend hospedado no Render
- Banco de dados MySQL hospedado no Aiven
- Upload permanente de imagens utilizando Cloudinary

---

# Tecnologias Utilizadas

## Frontend
- React
- Vite
- TypeScript
- Axios
- CSS
- React Router DOM

## Backend
- Node.js
- Express
- TypeScript
- MySQL2
- JWT Authentication
- Multer
- Cloudinary

## Infraestrutura
- Vercel
- Render
- Aiven MySQL
- Cloudinary
- GitHub

---

# Funcionalidades

- Cadastro de usuários
- Login com autenticação JWT
- Persistência de sessão
- Listagem de artigos
- Visualização completa de artigos
- Criação de artigos
- Edição de artigos
- Exclusão de artigos
- Upload de banner/imagens
- Upload permanente em nuvem via Cloudinary
- Integração completa com API REST
- Rotas SPA configuradas para Vercel
- Backend conectado em banco MySQL cloud

---

# Screenshots

## Home
![Home](https://raw.githubusercontent.com/hlima-dev/mind-group-blog-frontend/main/mind-group-blog-frontend/assets/screenshots/home.png.jpeg)

## Login
![Login](https://raw.githubusercontent.com/hlima-dev/mind-group-blog-frontend/main/mind-group-blog-frontend/assets/screenshots/login.png.jpeg)

## Criar artigo
![Criar artigo](https://raw.githubusercontent.com/hlima-dev/mind-group-blog-frontend/main/mind-group-blog-frontend/assets/screenshots/create-article.png.jpeg)

## Artigo
![Artigo](https://raw.githubusercontent.com/hlima-dev/mind-group-blog-frontend/main/mind-group-blog-frontend/assets/screenshots/article.png.jpeg)

---

# Estrutura do Projeto

```txt
src/
 ├── components/
 ├── pages/
 ├── routes/
 ├── services/
 ├── styles/
 ├── contexts/
 └── utils/
```

---

# Variáveis de Ambiente

## Frontend `.env`

```env
VITE_API_URL=https://mind-group-blog-api.onrender.com
```

---

# Executando Localmente

## Clonar projeto

```bash
git clone https://github.com/hlima-dev/mind-group-blog-frontend.git
```

## Entrar na pasta

```bash
cd mind-group-blog-frontend
```

## Instalar dependências

```bash
npm install
```

## Rodar projeto

```bash
npm run dev
```

---

# Deploy

## Frontend — Vercel

Deploy automático integrado ao GitHub.

## Backend — Render

API Node.js hospedada no Render com integração ao banco MySQL cloud.

## Banco de Dados — Aiven

Banco MySQL hospedado em nuvem com SSL habilitado.

## Upload de Imagens — Cloudinary

As imagens dos artigos são armazenadas permanentemente na nuvem utilizando Cloudinary.

---

# Diferenciais Técnicos

- Arquitetura FULLSTACK separada
- API REST estruturada
- Autenticação JWT
- Upload em nuvem
- Deploy profissional
- Banco em cloud
- Integração frontend/backend
- Persistência de sessão
- Tratamento de erros
- Configuração SPA para Vercel
- Projeto responsivo

---

# Autor

Lucas Lima Santos

GitHub:
https://github.com/hlima-dev