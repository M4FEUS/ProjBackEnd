const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

/**
 * Middleware para proteger rotas. Verifica a presença e validade do token JWT.
 * @param {object} req - Objeto de requisição do Express.
 * @param {object} res - Objeto de resposta do Express.
 * @param {function} next - Função para passar o controle para o próximo middleware.
 */
const protect = async (req, res, next) => {
  let token;

  // Verifica se o token está presente no cabeçalho Authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extrai o token
      token = req.headers.authorization.split(' ')[1];

      // Verifica o token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Busca o usuário pelo ID no token e anexa ao objeto de requisição
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('Usuário não encontrado.');
      }

      next();
    } catch (error) {
      logger.error(`Erro na autenticação (JWT): ${error.message}`);
      res.status(401);
      next(new Error('Não autorizado, token falhou.'));
    }
  }

  if (!token) {
    res.status(401);
    next(new Error('Não autorizado, nenhum token.'));
  }
};

module.exports = { protect };

