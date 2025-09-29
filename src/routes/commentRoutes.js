/**
 * @file commentRoutes.js
 * @description Define as rotas da API para operações relacionadas a comentários.
 * Inclui rotas para criar, listar por post e deletar comentários. Requer autenticação por JWT.
 */

const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const commentController = require("../controllers/CommentController");

/**
 * Cria um comentário em um post.
 * POST /api/comments
 * Body: { content: string, post_id: string }
 */
router.post("/", auth, (req, res) => commentController.create(req, res));

/**
 * Lista comentários de um post específico.
 * GET /api/comments/post/:postId
 */
router.get("/post/:postId", auth, (req, res) => commentController.listByPost(req, res));

/**
 * Deleta um comentário.
 * DELETE /api/comments/:id
 */
router.delete("/:id", auth, (req, res) => commentController.delete(req, res));

module.exports = router;


