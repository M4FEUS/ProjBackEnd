/**
 * @file userRepository.js
 * @description Repositório específico para operações relacionadas a usuários.
 * Estende a classe Repository genérica para interagir com o modelo User do Mongoose.
 */

const Repository = require("../db/repository");
const User = require("../models/User");

class UserRepository extends Repository {
  /**
   * @description Construtor do UserRepository.
   * Inicializa o repositório com o modelo User.
   */
  constructor() {
    super(User);
  }
}

// Exporta uma instância única do UserRepository.
module.exports = new UserRepository();


