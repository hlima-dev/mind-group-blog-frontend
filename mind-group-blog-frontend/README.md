# Mind Group Blog — Frontend

Frontend desenvolvido para o case de estágio da Mind Group, simulando uma plataforma completa de publicação de artigos com autenticação, gerenciamento de posts, curtidas, comentários e upload de imagens em nuvem.

---

# Demonstração Online

## Frontend
https://mind-group-blog-frontend.vercel.app

## Backend API
https://mind-group-blog-api.onrender.com

## Documentação da API (Swagger)
https://mind-group-blog-api.onrender.com/docs

---

# Arquitetura do Projeto

O projeto utiliza arquitetura FULLSTACK moderna com deploy em nuvem:

- Frontend hospedado na Vercel
- Backend hospedado no Render
- Banco de dados MySQL hospedado no Aiven
- Upload permanente de imagens utilizando Cloudinary
- E-mails transacionais via Resend
- Integração contínua via GitHub Actions

---

# Tecnologias Utilizadas

## Frontend
- React
- Vite
- TypeScript
- Tailwind CSS
- Axios
- React Router DOM
- React Markdown

## Testes
- Vitest
- Testing Library

## Backend
- Node.js
- Express
- TypeScript
- MySQL2
- JWT (access + refresh token)
- Zod
- Multer
- Cloudinary
- Resend

## Infraestrutura
- Vercel
- Render
- Aiven MySQL
- Cloudinary
- GitHub Actions

---

# Funcionalidades

## Conta
- Cadastro e login com JWT, com renovação automática de sessão
- Verificação de e-mail e recuperação de senha
- Alteração de senha e edição de nome do perfil

## Artigos
- Listagem paginada, com busca e filtro por categoria
- Criação e edição com rascunho/publicação
- Conteúdo em markdown
- Upload de banner via Cloudinary
- Curtidas e contagem de visualizações

## Comentários
- Comentários com respostas aninhadas em cada artigo

## Geral
- Rotas SPA configuradas para Vercel
- Renovação de sessão transparente (refresh token)

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
 ├── components/     # ArticleCard, ArticleForm, CommentSection, etc.
 ├── pages/
 ├── routes/
 ├── services/       # api.ts, auth, artigos, comentários
 ├── contexts/       # AuthContext
 ├── types/
 └── tests/          # setup dos testes
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
cd mind-group-blog-frontend/mind-group-blog-frontend
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

# Testes

```bash
npm test        # roda a suíte uma vez
npm run test:watch
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

## CI — GitHub Actions

A cada push/PR, o workflow roda os testes e o build (`.github/workflows/ci.yml`).

---

# Diferenciais Técnicos

- Arquitetura FULLSTACK separada
- API REST documentada (OpenAPI/Swagger)
- Autenticação JWT com refresh token
- Testes automatizados (frontend e backend) e CI
- Upload em nuvem
- Deploy profissional
- Banco em cloud
- Tratamento de erros
- Configuração SPA para Vercel
- Projeto responsivo

---

# Autor

Lucas Lima Santos

GitHub:
https://github.com/hlima-dev
