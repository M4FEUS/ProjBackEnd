const Comment = require('../models/Comment');
const logger = require('../utils/logger');

/**
 * Serviço de Comentário.
 */
class CommentService {
  /**
   * Cria um novo comentário.
   * @param {string} post_id - ID do post.
   * @param {string} user_id - ID do usuário que está comentando.
   * @param {string} content - Conteúdo do comentário.
   * @returns {Promise<object>} Comentário criado.
   */
  static async createComment(post_id, user_id, content) {
    const comment = await Comment.create({ post_id, user_id, content });
    logger.info(`Novo comentário criado por ${user_id} no post ${post_id}: ${comment._id}`);
    return comment;
  }

  /**
   * Busca todos os comentários de um post.
   * @param {string} post_id - ID do post.
   * @returns {Promise<Array>} Lista de comentários.
   */
  static async getCommentsByPostId(post_id) {
    return Comment.find({ post_id }).populate('user_id', 'username email');
  }

  /**
   * Busca um comentário pelo ID.
   * @param {string} id - ID do comentário.
   * @returns {Promise<object>} Comentário encontrado.
   */
  static async getCommentById(id) {
    const comment = await Comment.findById(id).populate('user_id', 'username email');
    if (!comment) {
      throw new Error('Comentário não encontrado.');
    }
    return comment;
  }

  /**
   * Atualiza um comentário.
   * @param {string} id - ID do comentário.
   * @param {string} user_id - ID do usuário que está atualizando (para verificação de autoria).
   * @param {object} updateData - Dados para atualização.
   * @returns {Promise<object>} Comentário atualizado.
   */
  static async updateComment(id, user_id, updateData) {
    const comment = await Comment.findById(id);

    if (!comment) {
      throw new Error('Comentário não encontrado.');
    }

    // Verifica se o usuário é o autor do comentário
    if (comment.user_id.toString() !== user_id) {
      res.status(403);
      throw new Error('Não autorizado a atualizar este comentário.');
    }

    const updatedComment = await Comment.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    logger.info(`Comentário atualizado por ${user_id}: ${updatedComment._id}`);
    return updatedComment;
  }

  /**
   * Deleta um comentário.
   * @param {string} id - ID do comentário.
   * @param {string} user_id - ID do usuário que está deletando (para verificação de autoria).
   */
  static async deleteComment(id, user_id) {
    const comment = await Comment.findById(id);

    if (!comment) {
      throw new Error('Comentário não encontrado.');
    }

    // Verifica se o usuário é o autor do comentário
    if (comment.user_id.toString() !== user_id) {
      res.status(403);
      throw new Error('Não autorizado a deletar este comentário.');
    }

    await Comment.findByIdAndDelete(id);
    logger.info(`Comentário deletado por ${user_id}: ${id}`);
  }
}

module.exports = CommentService;

