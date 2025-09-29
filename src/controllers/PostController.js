/**
 * @file PostController.js
 * @description Controlador responsável por lidar com as requisições HTTP relacionadas a posts.
 * Interage com o PostService para realizar operações de criação, leitura e exclusão de posts.
 */

const postService = require("../services/PostService");
const logger = require("../utils/logger");
const mongoose = require("mongoose");

class PostController {
  /**
   * @description Lida com a requisição para criar um novo post.
   * Extrai o conteúdo do post do corpo da requisição e o ID do usuário do token JWT.
   * @param {object} req Objeto de requisição do Express (contém req.user do middleware de autenticação).
   * @param {object} res Objeto de resposta do Express.
   */
  async createPost(req, res) {
    try {
      const { content } = req.body;
      const userId = req.user.id; // O ID do usuário é extraído do token JWT pelo middleware de autenticação
      const post = await postService.createPost(userId, content);
      logger.info(`Post criado pelo usuário ${userId}: ${post._id}`);
      res.status(201).json({ message: "Post criado com sucesso!", post });
    } catch (error) {
      logger.error(`Erro ao criar post: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * @description Lida com a requisição para obter todos os posts de um usuário específico.
   * Extrai o ID do usuário dos parâmetros da requisição.
   * @param {object} req Objeto de requisição do Express.
   * @param {object} res Objeto de resposta do Express.
   */
  async getPostsByUserId(req, res) {
    try {
      const userId = req.params.userId;
      // Valida se o ID do usuário é um ObjectId válido do MongoDB
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "ID de usuário inválido." });
      }
      const posts = await postService.getPostsByUserId(userId);
      logger.info(`Posts do usuário ${userId} acessados.`);
      res.status(200).json({ posts });
    } catch (error) {
      logger.error(`Erro ao buscar posts do usuário ${userId}: ${error.message}`);
      res.status(404).json({ error: error.message });
    }
  }

  /**
   * @description Lida com a requisição para obter todos os posts da aplicação.
   * @param {object} req Objeto de requisição do Express.
   * @param {object} res Objeto de resposta do Express.
   */
  async getAllPosts(req, res) {
    try {
      const posts = await postService.getAllPosts();
      logger.info("Todos os posts acessados.");
      res.status(200).json({ posts });
    } catch (error) {
      logger.error(`Erro ao buscar todos os posts: ${error.message}`);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  /**
   * @description Lida com a requisição para deletar um post específico.
   * Verifica se o usuário autenticado é o autor do post antes de deletar.
   * @param {object} req Objeto de requisição do Express.
   * @param {object} res Objeto de resposta do Express.
   */
  async deletePost(req, res) {
    try {
      const postId = req.params.id;
      // Valida se o ID do post é um ObjectId válido do MongoDB
      if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ error: "ID de post inválido." });
      }
      const userId = req.user.id; // O ID do usuário é extraído do token JWT pelo middleware de autenticação
      const result = await postService.deletePost(postId, userId);
      logger.info(`Post ${postId} deletado pelo usuário ${userId}.`);
      res.status(200).json(result);
    } catch (error) {
      logger.error(`Erro ao deletar post ${req.params.id}: ${error.message}`);
      res.status(403).json({ error: error.message });
    }
  }
}

// Exporta uma instância única do PostController.
module.exports = new PostController();


