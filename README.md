# ProjBackEnd (Recuperação EC48B)

## Visão Geral

Este projeto consiste no desenvolvimento de uma API de micro-blogging utilizando Node.js e MongoDB. O objetivo é demonstrar a implementação de uma biblioteca de acesso a banco de dados, classes de domínio, casos de uso, sistema de logging e rotas, seguindo os requisitos da disciplina EC48B.

## Estrutura do Projeto

A estrutura de diretórios foi organizada para promover a modularidade e a clareza do código:

```
ProjBackEnd/
├── index.js
├── package.json
├── package-lock.json
├── README.md
├── logs/
│   ├── app.log
│   └── error.log
└── src/
    ├── config/
    │   └── config.js
    ├── db/
    │   └── db.js
    ├── models/
    │   ├── Comment.js
    │   ├── Post.js
    │   └── User.js
    └── utils/
        └── logger.js
```

## Tecnologias Utilizadas

*   **Backend:** Node.js
*   **Banco de Dados:** MongoDB
*   **ODM (Object Data Modeling):** Mongoose
*   **Hashing de Senhas:** `bcryptjs`
*   **Logging:** `winston` (configurado para TXT)

## Como Rodar o Projeto

### Pré-requisitos

Certifique-se de ter o Node.js e o MongoDB instalados e rodando em sua máquina.

### Instalação

1.  Clone ou descompacte o repositório:
    ```bash
    # Se for um repositório git
    git clone <URL_DO_REPOSITORIO>
    cd ProjBackEnd
    # Se for um arquivo zip, descompacte e navegue até a pasta
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o serviço do MongoDB (se não estiver rodando):
    ```bash
    sudo systemctl start mongod
    ```

4.  Execute o arquivo principal para rodar os testes CRUD:
    ```bash
    node index.js
    ```
    Os resultados dos testes serão exibidos no console e registrados nos arquivos de log (`logs/app.log` e `logs/error.log`).

## Funcionalidades Demonstradas (CRUD)

O arquivo `index.js` demonstra as operações CRUD completas para as três classes principais:

1.  **User (Usuário):**
    *   Criação de usuários (com senha hasheada).
    *   Leitura de usuários (por ID e todos).
    *   Atualização de informações de usuário.
    *   Exclusão de usuário.
    *   **Validações:** Exemplo de falha ao criar usuário com email duplicado.

2.  **Post (Publicação):**
    *   Criação de posts (associados a um usuário).
    *   Leitura de posts (todos e por usuário).
    *   Atualização de conteúdo de post.
    *   Exclusão de post.
    *   **Validações:** Exemplo de falha ao criar post sem `user_id`.

3.  **Comment (Comentário):**
    *   Criação de comentários (associados a um post e um usuário).
    *   Leitura de comentários (todos e por post).
    *   Atualização de conteúdo de comentário.
    *   Exclusão de comentário.
    *   **Validações:** Exemplo de falha ao criar comentário sem `post_id`.




