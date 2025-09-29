/**
 * @file CommentService.js
 * @description Serviço responsável pela lógica de negócios relacionada a comentários.
 * Encapsula operações de criação, listagem por post e exclusão de comentários,
 * delegando a persistência ao `commentRepository`.
 */

const commentRepository = require("../repositories/commentRepository");

class CommentService {
  /**
   * @description Cria um novo comentário.
   * @param {string} userId ID do usuário autor do comentário.
   * @param {string} postId ID do post a ser comentado.
   * @param {string} content Conteúdo textual do comentário.
   * @returns {Promise<object>} Comentário criado.
   */
  async createComment(userId, postId, content) {
    return commentRepository.create({ user_id: userId, post_id: postId, content });
  }

  /**
   * @description Retorna todos os comentários associados a um post.
   * @param {string} postId ID do post.
   * @returns {Promise<Array<object>>} Lista de comentários.
   */
  async getCommentsByPostId(postId) {
    return commentRepository.find({ post_id: postId });
  }

  /**
   * @description Remove um comentário, garantindo que o solicitante seja o autor.
   * @param {string} commentId ID do comentário a ser removido.
   * @param {string} userId ID do usuário solicitante.
   * @returns {Promise<{message: string}>} Mensagem de sucesso.
   * @throws {Error} Se o comentário não existir ou se o usuário não for o autor.
   */
  async deleteComment(commentId, userId) {
    const existing = await commentRepository.findById(commentId);
    if (!existing || existing.user_id.toString() !== userId.toString()) {
      throw new Error("Comentário não encontrado ou sem permissão para deletar.");
    }
    await commentRepository.remove(commentId);
    return { message: "Comentário deletado com sucesso." };
  }
}

module.exports = new CommentService();


