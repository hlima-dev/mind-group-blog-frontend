# Mind Group Blog — Frontend

Interface web do sistema de blog, construída com **React + TypeScript + Vite + TailwindCSS**.

## Stack

| Tecnologia | Uso |
|---|---|
| React 18 + TypeScript | UI declarativa tipada |
| Vite | Build e dev server ultrarrápido |
| TailwindCSS | Estilização utility-first |
| React Router DOM v6 | Navegação SPA |
| Axios | HTTP client com interceptors JWT |
| React Hot Toast | Notificações contextuais |
| Lucide React | Ícones |

## Pré-requisito

- Node.js 18+
- Backend rodando em `http://localhost:3000`

## Rodar o projeto

```bash
npm install
npm run dev
```

Acesse: http://localhost:5173

## Build para produção

```bash
npm run build
npm run preview
```

## Estrutura

```
src/
├── components/        # Navbar, Footer, ArticleCard, ArticleForm, DeleteModal, Spinner
├── contexts/          # AuthContext (JWT + user state)
├── layouts/           # MainLayout (Navbar + Outlet + Footer)
├── pages/             # Home, Login, Register, Articles, ArticleDetail,
│                      # Dashboard, CreateArticle, EditArticle, Profile, NotFound
├── routes/            # PrivateRoute (guard de autenticação)
├── services/          # api.ts (Axios + interceptors), auth.service.ts, article.service.ts
└── types/             # Interfaces TypeScript compartilhadas
```

## Páginas

| Rota | Página | Acesso |
|---|---|---|
| `/` | Home | Público |
| `/login` | Login | Público |
| `/register` | Cadastro | Público |
| `/articles` | Lista de artigos | Público |
| `/articles/:id` | Detalhe do artigo | Público |
| `/dashboard` | Dashboard pessoal | 🔒 JWT |
| `/articles/new` | Criar artigo | 🔒 JWT |
| `/articles/:id/edit` | Editar artigo | 🔒 JWT |
| `/profile` | Perfil | 🔒 JWT |
