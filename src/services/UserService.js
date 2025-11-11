const User = require('../models/User');
const logger = require('../utils/logger');

/**
 * Serviço de Usuário.
 */
class UserService {
  /**
   * Busca todos os usuários.
   * @returns {Promise<Array>} Lista de usuários.
   */
  static async getAllUsers() {
    return User.find({}).select('-password'); // Exclui a senha
  }

  /**
   * Busca um usuário pelo ID.
   * @param {string} id - ID do usuário.
   * @returns {Promise<object>} Usuário encontrado.
   */
  static async getUserById(id) {
    const user = await User.findById(id).select('-password');
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }
    return user;
  }

  /**
   * Atualiza um usuário.
   * @param {string} id - ID do usuário.
   * @param {object} updateData - Dados para atualização.
   * @returns {Promise<object>} Usuário atualizado.
   */
  static async updateUser(id, updateData) {
    // Remove a senha do objeto de atualização para evitar alteração acidental
    if (updateData.password) {
      delete updateData.password;
    }

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }
    logger.info(`Usuário atualizado: ${user.email}`);
    return user;
  }

  /**
   * Deleta um usuário.
   * @param {string} id - ID do usuário.
   */
  static async deleteUser(id) {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }
    logger.info(`Usuário deletado: ${user.email}`);
  }
}

module.exports = UserService;

