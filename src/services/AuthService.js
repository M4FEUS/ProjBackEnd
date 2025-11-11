const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

/**
 * Gera um token JWT para o usuário.
 * @param {string} id - ID do usuário.
 * @returns {string} Token JWT.
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Expira em 30 dias
  });
};

/**
 * Serviço de Autenticação.
 */
class AuthService {
  /**
   * Registra um novo usuário.
   * @param {string} username - Nome de usuário.
   * @param {string} email - Email do usuário.
   * @param {string} password - Senha do usuário.
   * @returns {object} Usuário criado e token JWT.
   */
  static async register(username, email, password) {
    // 1. Verifica se o usuário já existe
    const userExists = await User.findOne({ email });

    if (userExists) {
      logger.warn(`Tentativa de registro com email duplicado: ${email}`);
      throw new Error('Usuário já existe');
    }

    // 2. Cria o usuário
    const user = await User.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });

    if (user) {
      logger.info(`Novo usuário registrado: ${user.email}`);
      return {
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      };
    } else {
      logger.error('Dados de usuário inválidos durante o registro.');
      throw new Error('Dados de usuário inválidos');
    }
  }

  /**
   * Autentica um usuário (login).
   * @param {string} email - Email do usuário.
   * @param {string} password - Senha do usuário.
   * @returns {object} Usuário e token JWT.
   */
  static async login(email, password) {
    // 1. Busca o usuário pelo email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      logger.info(`Login bem-sucedido para o usuário: ${user.email}`);
      return {
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      };
    } else {
      logger.warn(`Tentativa de login falhou para o email: ${email}`);
      throw new Error('Email ou senha inválidos');
    }
  }
}

module.exports = AuthService;

