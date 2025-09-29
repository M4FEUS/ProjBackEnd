/**
 * @file app.js
 * @description Ponto de entrada principal da aplicação Micro-blogging API.
 * Configura o servidor Express, middlewares e rotas.
 */

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Importa as rotas da API
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const postRoutes = require("./src/routes/postRoutes");
const commentRoutes = require("./src/routes/commentRoutes");

// Importa o logger para registrar eventos e erros
const logger = require("./src/utils/logger");

// Importa e conecta ao banco de dados MongoDB
const connectDB = require("./src/db/db");
connectDB();

// Middleware para parsear requisições JSON
app.use(express.json());

// Define as rotas base para cada módulo da API
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// Middleware de tratamento de erros global
// Captura erros que ocorrem nas rotas e middlewares e os registra.
app.use((err, req, res, next) => {
  logger.error(`Erro inesperado: ${err.message}`, { stack: err.stack });
  res.status(500).json({ error: "Ocorreu um erro interno no servidor." });
});

// Inicia o servidor Express
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});


