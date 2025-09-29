/**
 * @file authMiddleware.js
 * @description Middleware para autenticação de requisições usando JSON Web Tokens (JWT).
 * Verifica a presença e validade de um token JWT no cabeçalho 'Authorization' da requisição.
 */

const jwt = require("jsonwebtoken");
const config = require("../config/config");
const logger = require("../utils/logger");

/**
 * @function authMiddleware
 * @description Middleware que verifica se a requisição possui um token JWT válido.
 * Se válido, decodifica o token e anexa as informações do usuário (id, username) ao objeto `req.user`.
 * Caso contrário, retorna um erro de autenticação.
 * @param {object} req Objeto de requisição do Express.
 * @param {object} res Objeto de resposta do Express.
 * @param {function} next Função para passar o controle para o próximo middleware.
 */
module.exports = (req, res, next) => {
  // Extrai o token do cabeçalho 'Authorization'. Espera o formato 'Bearer TOKEN_JWT'.
  const authHeader = req.header("Authorization");

  // Verifica se o cabeçalho de autorização está presente.
  if (!authHeader) {
    logger.warn("Tentativa de acesso sem token de autenticação.");
    return res.status(401).json({ message: "Nenhum token fornecido, autorização negada." });
  }

  // Verifica se o token está no formato 'Bearer '.
  const token = authHeader.split(' ')[1];
  if (!token) {
    logger.warn("Token mal formatado ou ausente após 'Bearer '.");
    return res.status(401).json({ message: "Token mal formatado, autorização negada." });
  }

  try {
    // Verifica e decodifica o token usando a chave secreta.
    const decoded = jwt.verify(token, config.jwtSecret);
    // Anexa as informações do usuário decodificadas ao objeto de requisição.
    req.user = decoded;
    // Passa o controle para o próximo middleware ou rota.
    next();
  } catch (error) {
    logger.error(`Erro na autenticação do token: ${error.message}`);
    res.status(401).json({ message: "Token inválido ou expirado." });
  }
};

