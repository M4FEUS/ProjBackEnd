const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');

/**
 * @route GET /api/users
 * @description Busca todos os usuários
 * @access Private (apenas para demonstração, em um sistema real seria admin)
 */
router.get('/', protect, getAllUsers);

/**
 * @route GET /api/users/:id
 * @description Busca um usuário pelo ID
 * @access Private (apenas o próprio usuário ou admin)
 */
router.get('/:id', protect, getUserById);

/**
 * @route PUT /api/users/:id
 * @description Atualiza um usuário
 * @access Private (apenas o próprio usuário)
 */
router.put('/:id', protect, updateUser);

/**
 * @route DELETE /api/users/:id
 * @description Deleta um usuário
 * @access Private (apenas o próprio usuário)
 */
router.delete('/:id', protect, deleteUser);

module.exports = router;

