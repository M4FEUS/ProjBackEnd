# Projeto Micro-blogging API (EC48B)

## Visão Geral

Este projeto consiste no desenvolvimento de uma API de micro-blogging utilizando Node.js, Express.js e MongoDB. O objetivo é demonstrar a implementação de uma biblioteca de acesso a banco de dados, classes de domínio, casos de uso, sistema de logging e rotas, seguindo os requisitos da disciplina EC48B.

## Estrutura do Projeto

A estrutura de diretórios foi organizada para promover a modularidade e a clareza do código:

```
micro-blogging-api/
├── app.js
├── package.json
├── package-lock.json
├── README.md
├── .env
├── logs/
│   ├── app.log
│   └── error.log
└── src/
    ├── config/
    │   └── config.js
    ├── controllers/
    │   ├── AuthController.js
    │   ├── PostController.js
    │   ├── UserController.js
    │   └── CommentController.js
    ├── db/
    │   ├── db.js
    │   └── repository.js
    ├── middleware/
    │   └── authMiddleware.js
    ├── models/
    │   ├── Post.js
    │   ├── User.js
    │   └── Comment.js
    ├── repositories/
    │   ├── postRepository.js
    │   ├── userRepository.js
    │   └── commentRepository.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── postRoutes.js
    │   ├── userRoutes.js
    │   └── commentRoutes.js
    └── utils/
        └── logger.js
```

## Tecnologias Utilizadas

*   **Backend:** Node.js, Express.js
*   **Banco de Dados:** MongoDB
*   **ODM (Object Data Modeling):** Mongoose
*   **Autenticação:** JSON Web Tokens (JWT)
*   **Hashing de Senhas:** `bcryptjs`
*   **Logging:** `winston`

## Como Rodar o Projeto

### Pré-requisitos

Certifique-se de ter o Node.js e o MongoDB instalados em sua máquina.

### Instalação

1.  Clone o repositório e entre na pasta do projeto:
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd micro-blogging-api
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Crie um arquivo `.env` na raiz do projeto (recomendado):
    ```env
    PORT=3000
    JWT_SECRET=sua_chave_secreta_jwt
    MONGO_URI=mongodb://localhost:27017/microblog
    LOG_LEVEL=info
    ```
    Observações:
    - Se o `.env` não for fornecido, `src/config/config.js` usa valores padrão.
    - Alternativa ao MongoDB local: use o MongoDB Atlas e ajuste `MONGO_URI` (ex: `mongodb+srv://...`).

4.  Garanta que o MongoDB esteja em execução:
    - Windows (instalado como serviço): abra Serviços e verifique o serviço "MongoDB" em execução.
    - Linux (systemd):
      ```bash
      sudo systemctl start mongod
      ```

5.  Inicie a aplicação:
    ```bash
    npm start
    ```
    A API ficará disponível em `http://localhost:3000`.

## Funcionalidades da API

### Autenticação

*   `POST /api/auth/register`
    *   **Corpo da Requisição:** `{ "username": "string", "email": "string", "password": "string" }`
    *   **Descrição:** Registra um novo usuário.
*   `POST /api/auth/login`
    *   **Corpo da Requisição:** `{ "email": "string", "password": "string" }`
    *   **Descrição:** Autentica um usuário e retorna um token JWT.

### Teste Rápido (Quickstart)

#### PowerShell (Windows) usando Invoke-RestMethod

1) Registro de usuário
```powershell
Invoke-RestMethod -Method Post -Uri "http://localhost:3000/api/auth/register" `
  -ContentType "application/json" `
  -Body '{"username":"testuser","email":"test@example.com","password":"secret123"}'
```

2) Login e obtenção do token
```powershell
$resp = Invoke-RestMethod -Method Post -Uri "http://localhost:3000/api/auth/login" `
  -ContentType "application/json" `
  -Body '{"email":"test@example.com","password":"secret123"}'
$token = $resp.token
```

3) Acessar rotas autenticadas
```powershell
Invoke-RestMethod -Method Get -Uri "http://localhost:3000/api/posts" `
  -Headers @{ Authorization = "Bearer $token" }
```

4) Criar um post
```powershell
Invoke-RestMethod -Method Post -Uri "http://localhost:3000/api/posts" `
  -Headers @{ Authorization = "Bearer $token"; "Content-Type" = "application/json" } `
  -Body '{"content":"hello world"}'
```

5) Criar um comentário
```powershell
Invoke-RestMethod -Method Post -Uri "http://localhost:3000/api/comments" `
  -Headers @{ Authorization = "Bearer $token"; "Content-Type" = "application/json" } `
  -Body '{"post_id":"<POST_ID>","content":"meu comentário"}'
```

6) Listar comentários de um post
```powershell
Invoke-RestMethod -Method Get -Uri "http://localhost:3000/api/comments/post/<POST_ID>" `
  -Headers @{ Authorization = "Bearer $token" }
```

<!-- Removida a seção alternativa com curl.exe para simplificar o uso no Windows com Invoke-RestMethod -->

### Usuários

*   `GET /api/users/:id`
    *   **Headers:** `Authorization: Bearer <token_jwt>`
    *   **Descrição:** Retorna o perfil de um usuário específico.

### Posts

*   `POST /api/posts`
    *   **Headers:** `Authorization: Bearer <token_jwt>`
    *   **Corpo da Requisição:** `{ "content": "string" }`
    *   **Descrição:** Cria um novo post.
*   `GET /api/posts/user/:userId`
    *   **Headers:** `Authorization: Bearer <token_jwt>`
    *   **Descrição:** Retorna todos os posts de um usuário específico.
*   `GET /api/posts`
    *   **Headers:** `Authorization: Bearer <token_jwt>`
    *   **Descrição:** Retorna todos os posts da aplicação.
*   `DELETE /api/posts/:id`
    *   **Headers:** `Authorization: Bearer <token_jwt>`
    *   **Descrição:** Deleta um post. Somente o autor pode deletar seu próprio post.

### Comentários

*   `POST /api/comments`
    *   **Headers:** `Authorization: Bearer <token_jwt>`
    *   **Corpo da Requisição:** `{ "post_id": "string", "content": "string" }`
    *   **Descrição:** Cria um comentário em um post.
*   `GET /api/comments/post/:postId`
    *   **Headers:** `Authorization: Bearer <token_jwt>`
    *   **Descrição:** Lista comentários de um post.
*   `DELETE /api/comments/:id`
    *   **Headers:** `Authorization: Bearer <token_jwt>`
    *   **Descrição:** Deleta um comentário (apenas o autor pode deletar).

## Critérios de Avaliação (EC48B)

Este projeto foi desenvolvido com foco nos seguintes critérios:

1.  **Organização do Código:** Estrutura de diretórios clara e modular, separação de responsabilidades (controllers, services, repositories, models).
2.  **Biblioteca de Acesso a Banco de Dados:** Implementação de uma camada de repositório genérica (`src/db/repository.js`) que interage com o Mongoose para abstrair as operações de CRUD com o MongoDB.
3.  **Classes de Domínio e Casos de Uso:** Definição de modelos (`src/models/User.js`, `src/models/Post.js`) e serviços (`src/services/AuthService.js`, `src/services/UserService.js`, `src/services/PostService.js`) que encapsulam a lógica de negócio.
4.  **Sistema de Logging:** Utilização da biblioteca `winston` (`src/utils/logger.js`) para registrar eventos da aplicação (informações, erros, avisos) em arquivos de log e no console.
5.  **Tratamento de Erros:** Implementação de tratamento de erros em todas as camadas da aplicação (controllers, services) e um middleware de erro global para capturar exceções não tratadas.
6.  **Comentários e Documentação:** Código amplamente comentado com JSDoc-style para facilitar o entendimento, além deste `README.md` detalhado.

## Testes Realizados

Durante o desenvolvimento, os seguintes cenários foram testados:

*   Conexão bem-sucedida com o MongoDB.
*   Registro de novos usuários.
*   Login de usuários e obtenção de token JWT.
*   Criação de posts por usuários autenticados.
*   Visualização de posts de usuários específicos.
*   Visualização de todos os posts.
*   Exclusão de posts (verificando permissão do autor).
*   Verificação do registro de logs de informação e erro.
*   Casos de erro como usuário não encontrado, senha incorreta e token JWT inválido.


