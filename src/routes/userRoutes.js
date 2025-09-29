/**
 * @file userRoutes.js
 * @description Define as rotas da API para operações relacionadas a usuários.
 * Inclui rotas para visualizar o perfil de um usuário.
 */

const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * Rota para obter o perfil de um usuário específico.
 * Requer autenticação (token JWT).
 * GET /api/users/:id
 */
router.get("/:id", authMiddleware, userController.getUserProfile);

module.exports = router;


