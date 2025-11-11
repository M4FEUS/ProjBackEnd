const AuthService = require('../services/AuthService');
const logger = require('../utils/logger');

/**
 * @description Registra um novo usuário.
 * Rota: POST /api/auth/register
 */
const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    return next(new Error('Por favor, preencha todos os campos: nome de usuário, email e senha.'));
  }

  try {
    const user = await AuthService.register(username, email, password);
    res.status(201).json(user);
  } catch (error) {
    // Erro de validação ou usuário já existe
    res.status(400);
    next(error);
  }
};

/**
 * @description Autentica um usuário (login).
 * Rota: POST /api/auth/login
 */
const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    return next(new Error('Por favor, preencha o email e a senha.'));
  }

  try {
    const user = await AuthService.login(email, password);
    res.status(200).json(user);
  } catch (error) {
    // Erro de autenticação (email ou senha inválidos)
    res.status(401);
    next(error);
  }
};

module.exports = { register, login };

