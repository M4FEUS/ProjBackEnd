/**
 * @file CommentService.js
 * @description Lógica de negócios para comentários.
 */

const commentRepository = require("../repositories/commentRepository");

class CommentService {
  async createComment(userId, postId, content) {
    return commentRepository.create({ user_id: userId, post_id: postId, content });
  }

  async getCommentsByPostId(postId) {
    return commentRepository.find({ post_id: postId });
  }

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


