const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');

/**
 * @route POST /api/posts
 * @description Cria um novo post
 * @access Private
 */
router.post('/', protect, createPost);

/**
 * @route GET /api/posts
 * @description Busca todos os posts
 * @access Public
 */
router.get('/', getAllPosts);

/**
 * @route GET /api/posts/:id
 * @description Busca um post pelo ID
 * @access Public
 */
router.get('/:id', getPostById);

/**
 * @route PUT /api/posts/:id
 * @description Atualiza um post
 * @access Private (apenas o autor)
 */
router.put('/:id', protect, updatePost);

/**
 * @route DELETE /api/posts/:id
 * @description Deleta um post
 * @access Private (apenas o autor)
 */
router.delete('/:id', protect, deletePost);

module.exports = router;

