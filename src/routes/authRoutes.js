const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

/**
 * @route POST /api/auth/register
 * @description Registra um novo usuário
 * @access Public
 */
router.post('/register', register);

/**
 * @route POST /api/auth/login
 * @description Autentica um usuário e retorna um token JWT
 * @access Public
 */
router.post('/login', login);

module.exports = router;

