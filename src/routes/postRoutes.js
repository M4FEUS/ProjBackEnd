/**
 * @file postRoutes.js
 * @description Define as rotas da API para operações relacionadas a posts.
 * Inclui rotas para criar, visualizar e deletar posts.
 */

const express = require("express");
const router = express.Router();
const postController = require("../controllers/PostController");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * Rota para criar um novo post.
 * Requer autenticação (token JWT).
 * POST /api/posts
 */
router.post("/", authMiddleware, postController.createPost);

/**
 * Rota para obter todos os posts de um usuário específico.
 * Requer autenticação (token JWT).
 * GET /api/posts/user/:userId
 */
router.get("/user/:userId", authMiddleware, postController.getPostsByUserId);

/**
 * Rota para obter todos os posts da aplicação.
 * Requer autenticação (token JWT).
 * GET /api/posts
 */
router.get("/", authMiddleware, postController.getAllPosts);

/**
 * Rota para deletar um post específico.
 * Requer autenticação (token JWT) e que o usuário seja o autor do post.
 * DELETE /api/posts/:id
 */
router.delete("/:id", authMiddleware, postController.deletePost);

module.exports = router;


