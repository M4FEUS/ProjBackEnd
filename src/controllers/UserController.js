/**
 * @file UserController.js
 * @description Controlador responsável por lidar com as requisições HTTP relacionadas a usuários.
 * Interage com o UserService para buscar informações de perfil de usuário.
 */

const userService = require("../services/UserService");
const logger = require("../utils/logger");

class UserController {
  /**
   * @description Lida com a requisição para obter o perfil de um usuário específico.
   * Extrai o ID do usuário dos parâmetros da requisição, chama o UserService e retorna os dados do perfil.
   * @param {object} req Objeto de requisição do Express.
   * @param {object} res Objeto de resposta do Express.
   */
  async getUserProfile(req, res) {
    try {
      const userId = req.params.id;
      const user = await userService.findUserById(userId);
      logger.info(`Perfil do usuário ${user.username} (${userId}) acessado.`);
      res.status(200).json({ user: { id: user._id, username: user.username, email: user.email, createdAt: user.created_at } });
    } catch (error) {
      logger.error(`Erro ao buscar perfil do usuário: ${error.message}`);
      res.status(404).json({ error: error.message });
    }
  }
}

// Exporta uma instância única do UserController.
module.exports = new UserController();


