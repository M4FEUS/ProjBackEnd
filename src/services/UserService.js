/**
 * @file UserService.js
 * @description Serviço responsável pela lógica de negócio relacionada a usuários.
 * Interage com o UserRepository para buscar e manipular dados de usuários.
 */

const userRepository = require("../repositories/userRepository");

class UserService {
  /**
   * @description Busca um usuário pelo seu ID.
   * @param {string} id O ID do usuário a ser buscado.
   * @returns {Promise<object>} O objeto do usuário encontrado.
   * @throws {Error} Se o usuário não for encontrado.
   */
  async findUserById(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error("Usuário não encontrado.");
    }
    return user;
  }

  /**
   * @description Busca um usuário pelo seu endereço de e-mail.
   * @param {string} email O endereço de e-mail do usuário a ser buscado.
   * @returns {Promise<object>} O objeto do usuário encontrado.
   * @throws {Error} Se o usuário não for encontrado.
   */
  async findUserByEmail(email) {
    const users = await userRepository.find({ email });
    const user = users[0];
    if (!user) {
      throw new Error("Usuário não encontrado.");
    }
    return user;
  }

  /**
   * @description Busca um usuário pelo seu nome de usuário.
   * @param {string} username O nome de usuário a ser buscado.
   * @returns {Promise<object>} O objeto do usuário encontrado.
   * @throws {Error} Se o usuário não for encontrado.
   */
  async findUserByUsername(username) {
    const users = await userRepository.find({ username });
    const user = users[0];
    if (!user) {
      throw new Error("Usuário não encontrado.");
    }
    return user;
  }
}

// Exporta uma instância única do UserService.
module.exports = new UserService();


