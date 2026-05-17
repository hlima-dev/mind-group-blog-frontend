# Mind Group Blog — Frontend

Frontend desenvolvido para o case de estágio da Mind Group, simulando uma plataforma de publicação de artigos com autenticação, listagem, criação, edição e exclusão de posts.

## Tecnologias

- React
- Vite
- TypeScript
- Axios
- CSS
- Vercel

## Funcionalidades

- Cadastro de usuários
- Login
- Listagem de artigos
- Visualização de artigo
- Criação de artigo
- Edição de artigo
- Exclusão de artigo
- Upload de imagem/banner
- Integração com API Node.js

## Screenshots

### Home
![Home](https://raw.githubusercontent.com/hlima-dev/mind-group-blog-frontend/main/mind-group-blog-frontend/assets/screenshots/home.png)

### Login
![Login](https://raw.githubusercontent.com/hlima-dev/mind-group-blog-frontend/main/mind-group-blog-frontend/assets/screenshots/login.png)

### Criar artigo
![Criar artigo](https://raw.githubusercontent.com/hlima-dev/mind-group-blog-frontend/main/mind-group-blog-frontend/assets/screenshots/create-article.png)

### Artigo
![Artigo](https://raw.githubusercontent.com/hlima-dev/mind-group-blog-frontend/main/mind-group-blog-frontend/assets/screenshots/article.png)

## Deploy

Frontend:  
https://mind-group-blog-frontend.vercel.app

Backend:  
https://mind-group-blog-api.onrender.com

## Variáveis de ambiente

Crie um arquivo `.env` com:

```env
VITE_API_URL=http://localhost:3000
```

Em produção, a variável deve ser configurada na Vercel:

```env
VITE_API_URL=https://mind-group-blog-api.onrender.com
```

## Executando localmente

Clone o projeto:

```bash
git clone https://github.com/hlima-dev/mind-group-blog-frontend.git
```

Entre na pasta do projeto:

```bash
cd mind-group-blog-frontend/mind-group-blog-frontend
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

## Autor

Lucas Lima Santos  
GitHub: https://github.com/hlima-dev