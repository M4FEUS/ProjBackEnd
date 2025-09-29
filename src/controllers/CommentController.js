/**
 * @file CommentController.js
 * @description Controlador responsável por lidar com requisições HTTP relacionadas a comentários.
 * Interage com o CommentService para criar, listar por post e deletar comentários.
 */

const commentService = require("../services/CommentService");
const logger = require("../utils/logger");
const mongoose = require("mongoose");

class CommentController {
  /**
   * @description Cria um novo comentário em um post.
   * Extrai `content` e `post_id` do corpo da requisição e o `user.id` do token JWT.
   * @param {object} req Objeto de requisição do Express.
   * @param {object} res Objeto de resposta do Express.
   */
  async create(req, res) {
    try {
      const { content, post_id } = req.body;
      if (!mongoose.Types.ObjectId.isValid(post_id)) {
        return res.status(400).json({ error: "ID de post inválido." });
      }
      const comment = await commentService.createComment(req.user.id, post_id, content);
      logger.info(`Comentário criado pelo usuário ${req.user.id} no post ${post_id}: ${comment._id}`);
      res.status(201).json({ message: "Comentário criado com sucesso!", comment });
    } catch (error) {
      logger.error(`Erro ao criar comentário: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * @description Lista comentários de um post específico.
   * Extrai `postId` dos parâmetros da rota e valida como ObjectId.
   * @param {object} req Objeto de requisição do Express.
   * @param {object} res Objeto de resposta do Express.
   */
  async listByPost(req, res) {
    try {
      const { postId } = req.params;
      if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ error: "ID de post inválido." });
      }
      const comments = await commentService.getCommentsByPostId(postId);
      res.status(200).json({ comments });
    } catch (error) {
      logger.error(`Erro ao listar comentários do post ${req.params.postId}: ${error.message}`);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  /**
   * @description Deleta um comentário específico.
   * Verifica se o usuário autenticado é o autor do comentário antes de deletar.
   * @param {object} req Objeto de requisição do Express.
   * @param {object} res Objeto de resposta do Express.
   */
  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "ID de comentário inválido." });
      }
      const result = await commentService.deleteComment(id, req.user.id);
      res.status(200).json(result);
    } catch (error) {
      logger.error(`Erro ao deletar comentário ${req.params.id}: ${error.message}`);
      res.status(403).json({ error: error.message });
    }
  }
}

module.exports = new CommentController();


