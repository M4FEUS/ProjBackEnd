/**
 * @file commentRoutes.js
 */

const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const commentController = require("../controllers/CommentController");

// Criar comentário
router.post("/", auth, (req, res) => commentController.create(req, res));

// Listar comentários de um post
router.get("/post/:postId", auth, (req, res) => commentController.listByPost(req, res));

// Deletar comentário
router.delete("/:id", auth, (req, res) => commentController.delete(req, res));

module.exports = router;


