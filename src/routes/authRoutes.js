/**
 * @file authRoutes.js
 * @description Define as rotas da API para autenticação de usuários.
 * Inclui rotas para registro e login de usuários.
 */

const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");

/**
 * Rota para registrar um novo usuário.
 * POST /api/auth/register
 */
router.post("/register", authController.register);

/**
 * Rota para autenticar um usuário existente (login).
 * POST /api/auth/login
 */
router.post("/login", authController.login);

module.exports = router;


