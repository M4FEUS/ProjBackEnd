# Projeto 2: Micro-Blogging (EC48B)

Esta é a evolução do Projeto 1, transformado em uma API RESTful completa utilizando **Node.js** e o framework **Express.js**. O projeto implementa a arquitetura MVC (Model-View-Controller) e autenticação baseada em JSON Web Token (JWT), atendendo aos requisitos do Projeto 2.

## Estrutura do Projeto

O projeto segue uma estrutura MVC para organização e escalabilidade:

```
/micro-blogging-api
├── app.js                # Ponto de entrada da aplicação Express
├── .env                  # Variáveis de ambiente (MONGO_URI, JWT_SECRET)
├── package.json          # Dependências do projeto
├── src/
│   ├── controllers/      # Lógica de requisição/resposta HTTP
│   ├── models/           # Schemas do Mongoose para o MongoDB
│   ├── routes/           # Definição das rotas da API
│   ├── services/         # Lógica de negócio (CRUD)
│   ├── middleware/       # Middlewares (autenticação, erros)
│   ├── db/               # Configuração da conexão com o banco de dados
│   └── utils/            # Utilitários (logger)
└── logs/                 # Arquivos de log (app.log, error.log)
```

## Tecnologias Utilizadas

*   **Backend:** Node.js, Express.js
*   **Banco de Dados:** MongoDB (Mongoose ODM)
*   **Autenticação:** `jsonwebtoken` (JWT) e `bcryptjs` (Hashing de Senhas)
*   **Logging:** `winston`

## Como Iniciar

Pré-requisitos

Certifique-se de ter o Node.js e o MongoDB instalados em sua máquina.

1.  **Instalar Dependências:**
    ```bash
    npm install
    ```

2.  **Configurar Variáveis de Ambiente:**
    Crie ou edite o arquivo `.env` na raiz do projeto com suas configurações:

    ```
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/microblogging_db
    JWT_SECRET=sua_chave_secreta_aqui
    ```

3.  **Iniciar o Servidor:**
    ```bash
    node app.js
    ```
    O servidor estará rodando em `http://localhost:3000`.

## Rotas da API

**Prefixo de todas as rotas:** `/api`

### Autenticação (`/auth`)

| Método | Rota | Descrição | Acesso |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Registra um novo usuário. | Público |
| `POST` | `/auth/login` | Autentica e retorna um token JWT. | Público |

### Usuários (`/users`)

| Método | Rota | Descrição | Acesso |
| :--- | :--- | :--- | :--- |
| `GET` | `/users` | Lista todos os usuários. | Privado |
| `GET` | `/users/:id` | Busca um usuário pelo ID. | Privado |
| `PUT` | `/users/:id` | Atualiza um usuário. | Privado (apenas o próprio usuário) |
| `DELETE` | `/users/:id` | Deleta um usuário. | Privado (apenas o próprio usuário) |

### Posts (`/posts`)

| Método | Rota | Descrição | Acesso |
| :--- | :--- | :--- | :--- |
| `POST` | `/posts` | Cria um novo post. | Privado |
| `GET` | `/posts` | Lista todos os posts. | Público |
| `GET` | `/posts/:id` | Busca um post pelo ID. | Público |
| `PUT` | `/posts/:id` | Atualiza um post. | Privado (apenas o autor) |
| `DELETE` | `/posts/:id` | Deleta um post. | Privado (apenas o autor) |

### Comentários (`/comments`)

| Método | Rota | Descrição | Acesso |
| :--- | :--- | :--- | :--- |
| `POST` | `/comments/:postId` | Cria um novo comentário em um post. | Privado |
| `GET` | `/comments/:postId` | Lista todos os comentários de um post. | Público |
| `GET` | `/comments/single/:id` | Busca um comentário pelo ID. | Público |
| `PUT` | `/comments/:id` | Atualiza um comentário. | Privado (apenas o autor) |
| `DELETE` | `/comments/:id` | Deleta um comentário. | Privado (apenas o autor) |

**Acesso a Rotas Privadas:**

Para acessar rotas privadas, inclua o token JWT obtido no login no cabeçalho `Authorization`:

`Authorization: Bearer <seu_token_jwt>`

### 🧩 1. Registrar um novo usuário

Cria um novo usuário no sistema.

```bash
curl -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d "{\"username\":\"alice\",\"email\":\"alice@test.com\",\"password\":\"senha123\"}"
```

✅ **Resposta esperada:**

```json
{
  "message": "Usuário registrado com sucesso!",
  "user": {
    "_id": "...",
    "username": "alice",
    "email": "alice@test.com"
  }
}
```

---

### 🔐 2. Fazer login e obter o token JWT

Autentica o usuário e retorna um token de acesso.

```bash
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"alice@test.com\",\"password\":\"senha123\"}"
```

✅ **Resposta esperada:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

> 🔸 **Guarde esse token** — ele será necessário nas rotas privadas, enviando-o no header `Authorization: Bearer <token>`.

---

### 📝 3. Criar um novo post (Privado)

Requer o token JWT obtido no login.

```bash
curl -X POST http://localhost:3000/api/posts -H "Content-Type: application/json" -H "Authorization: Bearer SEU_TOKEN_AQUI" -d "{\"content\":\"Meu primeiro post!\"}"
```

✅ **Resposta esperada:**

```json
{
  "message": "Post criado com sucesso!",
  "post": {
    "_id": "...",
    "content": "Meu primeiro post!",
    "author": "alice"
  }
}
```

---

### 📜 4. Listar todos os posts (Público)

Não requer autenticação.

```bash
curl http://localhost:3000/api/posts
```

✅ **Resposta esperada:**

```json
[
  {
    "_id": "...",
    "content": "Meu primeiro post!",
    "author": "alice"
  }
]
```

---

### 💬 5. Criar um comentário em um post (Privado)

Use o ID de um post existente no lugar de `:postId`.

```bash
curl -X POST http://localhost:3000/api/comments/ID_DO_POST -H "Content-Type: application/json" -H "Authorization: Bearer SEU_TOKEN_AQUI" -d "{\"text\":\"Comentário de teste!\"}"
```

✅ **Resposta esperada:**

```json
{
  "message": "Comentário adicionado com sucesso!",
  "comment": {
    "_id": "...",
    "text": "Comentário de teste!",
    "author": "alice"
  }
}
```

---

### 👥 6. Listar todos os usuários (Privado)

Requer autenticação (token JWT).

```bash
curl http://localhost:3000/api/users -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

✅ **Resposta esperada:**

```json
[
  {
    "_id": "...",
    "username": "alice",
    "email": "alice@test.com"
  }
]
```

---


