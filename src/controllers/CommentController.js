/**
 * @file CommentController.js
 */

const commentService = require("../services/CommentService");
const logger = require("../utils/logger");
const mongoose = require("mongoose");

class CommentController {
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


