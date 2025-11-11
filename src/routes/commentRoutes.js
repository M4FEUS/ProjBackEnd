const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createComment, getCommentsByPostId, getCommentById, updateComment, deleteComment } = require('../controllers/commentController');

/**
 * @route POST /api/comments/:postId
 * @description Cria um novo comentário em um post específico
 * @access Private
 */
router.post('/:postId', protect, createComment);

/**
 * @route GET /api/comments/:postId
 * @description Busca todos os comentários de um post específico
 * @access Public
 */
router.get('/:postId', getCommentsByPostId);

/**
 * @route GET /api/comments/single/:id
 * @description Busca um comentário pelo ID
 * @access Public
 */
router.get('/single/:id', getCommentById);

/**
 * @route PUT /api/comments/:id
 * @description Atualiza um comentário
 * @access Private (apenas o autor)
 */
router.put('/:id', protect, updateComment);

/**
 * @route DELETE /api/comments/:id
 * @description Deleta um comentário
 * @access Private (apenas o autor)
 */
router.delete('/:id', protect, deleteComment);

module.exports = router;

