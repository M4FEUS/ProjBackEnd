/**
 * @file AuthController.js
 * @description Controlador responsável por lidar com as requisições HTTP relacionadas à autenticação de usuários.
 * Interage com o AuthService para realizar operações de registro e login.
 */

const authService = require("../services/AuthService");
const logger = require("../utils/logger");

class AuthController {
  /**
   * @description Lida com a requisição de registro de um novo usuário.
   * Extrai os dados do corpo da requisição, chama o AuthService e retorna a resposta apropriada.
   * @param {object} req Objeto de requisição do Express.
   * @param {object} res Objeto de resposta do Express.
   */
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const user = await authService.register(username, email, password);
      logger.info(`Usuário ${user.username} registrado com sucesso.`);
      res.status(201).json({ message: "Usuário registrado com sucesso!", user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
      logger.error(`Erro no registro: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * @description Lida com a requisição de login de um usuário existente.
   * Extrai as credenciais do corpo da requisição, chama o AuthService e retorna o token JWT e os dados do usuário.
   * @param {object} req Objeto de requisição do Express.
   * @param {object} res Objeto de resposta do Express.
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { token, user } = await authService.login(email, password);
      logger.info(`Usuário ${user.username} logado com sucesso.`);
      res.status(200).json({ message: "Login realizado com sucesso!", token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
      logger.error(`Erro no login: ${error.message}`);
      res.status(401).json({ error: error.message });
    }
  }
}

// Exporta uma instância única do AuthController.
module.exports = new AuthController();


