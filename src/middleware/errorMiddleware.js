const logger = require('../utils/logger');

/**
 * Middleware para lidar com rotas não encontradas (404).
 * @param {object} req - Objeto de requisição do Express.
 * @param {object} res - Objeto de resposta do Express.
 * @param {function} next - Função para passar o controle para o próximo middleware.
 */
const notFound = (req, res, next) => {
  const error = new Error(`Não Encontrado - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Middleware de tratamento de erros global.
 * @param {object} err - Objeto de erro.
 * @param {object} req - Objeto de requisição do Express.
 * @param {object} res - Objeto de resposta do Express.
 * @param {function} next - Função para passar o controle para o próximo middleware.
 */
const errorHandler = (err, req, res, next) => {
  // Se o status code for 200 (OK), significa que o erro não foi tratado
  // e deve ser alterado para 500 (Internal Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  // Loga o erro
  logger.error(`Erro ${statusCode} em ${req.originalUrl}: ${err.message}`, { stack: err.stack });

  // Resposta JSON para o cliente
  res.json({
    message: err.message,
    // Em ambiente de desenvolvimento, inclui o stack trace
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

module.exports = { notFound, errorHandler };

