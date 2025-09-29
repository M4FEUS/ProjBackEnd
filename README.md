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
├── logs/
│   ├── app.log
│   └── error.log
└── src/
    ├── config/
    │   └── config.js
    ├── controllers/
    │   ├── AuthController.js
    │   ├── PostController.js
    │   └── UserController.js
    ├── db/
    │   ├── db.js
    │   └── repository.js
    ├── middleware/
    │   └── authMiddleware.js
    ├── models/
    │   ├── Post.js
    │   └── User.js
    ├── repositories/
    │   ├── postRepository.js
    │   └── userRepository.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── postRoutes.js
    │   └── userRoutes.js
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

1.  Clone o repositório:
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd micro-blogging-api
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Crie um arquivo `.env` na raiz do projeto (opcional, para variáveis de ambiente):
    ```
    PORT=3000
    JWT_SECRET=sua_chave_secreta_jwt
    MONGO_URI=mongodb://localhost:27017/microblog
    LOG_LEVEL=info
    ```
    *Se não for fornecido, o `config.js` usará valores padrão.*

4.  Inicie o serviço do MongoDB (se não estiver rodando):
    ```bash
    sudo systemctl start mongod
    ```

5.  Inicie a aplicação:
    ```bash
    node app.js
    ```
    A API estará disponível em `http://localhost:3000`.

## Funcionalidades da API

### Autenticação

*   `POST /api/auth/register`
    *   **Corpo da Requisição:** `{ "username": "string", "email": "string", "password": "string" }`
    *   **Descrição:** Registra um novo usuário.
*   `POST /api/auth/login`
    *   **Corpo da Requisição:** `{ "email": "string", "password": "string" }`
    *   **Descrição:** Autentica um usuário e retorna um token JWT.

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


