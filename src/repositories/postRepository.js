/**
 * @file postRepository.js
 * @description Repositório específico para operações relacionadas a posts.
 * Estende a classe Repository genérica para interagir com o modelo Post do Mongoose.
 */

const Repository = require("../db/repository");
const Post = require("../models/Post");

class PostRepository extends Repository {
  /**
   * @description Construtor do PostRepository.
   * Inicializa o repositório com o modelo Post.
   */
  constructor() {
    super(Post);
  }
}

// Exporta uma instância única do PostRepository.
module.exports = new PostRepository();


