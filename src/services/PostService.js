const Post = require('../models/Post');
const logger = require('../utils/logger');

/**
 * Serviço de Post.
 */
class PostService {
  /**
   * Cria um novo post.
   * @param {string} user_id - ID do usuário que está criando o post.
   * @param {string} content - Conteúdo do post.
   * @returns {Promise<object>} Post criado.
   */
  static async createPost(user_id, content) {
    const post = await Post.create({ user_id, content });
    logger.info(`Novo post criado por ${user_id}: ${post._id}`);
    return post;
  }

  /**
   * Busca todos os posts.
   * @returns {Promise<Array>} Lista de posts.
   */
  static async getAllPosts() {
    return Post.find({}).populate('user_id', 'username email'); // Popula com dados básicos do usuário
  }

  /**
   * Busca um post pelo ID.
   * @param {string} id - ID do post.
   * @returns {Promise<object>} Post encontrado.
   */
  static async getPostById(id) {
    const post = await Post.findById(id).populate('user_id', 'username email');
    if (!post) {
      throw new Error('Post não encontrado.');
    }
    return post;
  }

  /**
   * Atualiza um post.
   * @param {string} id - ID do post.
   * @param {string} user_id - ID do usuário que está atualizando (para verificação de autoria).
   * @param {object} updateData - Dados para atualização.
   * @returns {Promise<object>} Post atualizado.
   */
  static async updatePost(id, user_id, updateData) {
    const post = await Post.findById(id);

    if (!post) {
      throw new Error('Post não encontrado.');
    }

    // Verifica se o usuário é o autor do post
    if (post.user_id.toString() !== user_id) {
      res.status(403);
      throw new Error('Não autorizado a atualizar este post.');
    }

    const updatedPost = await Post.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    logger.info(`Post atualizado por ${user_id}: ${updatedPost._id}`);
    return updatedPost;
  }

  /**
   * Deleta um post.
   * @param {string} id - ID do post.
   * @param {string} user_id - ID do usuário que está deletando (para verificação de autoria).
   */
  static async deletePost(id, user_id) {
    const post = await Post.findById(id);

    if (!post) {
      throw new Error('Post não encontrado.');
    }

    // Verifica se o usuário é o autor do post
    if (post.user_id.toString() !== user_id) {
      res.status(403);
      throw new Error('Não autorizado a deletar este post.');
    }

    await Post.findByIdAndDelete(id);
    // Deletar comentários associados ao post
    const Comment = require('../models/Comment');
    await Comment.deleteMany({ post_id: id });

    logger.info(`Post deletado por ${user_id}: ${id}`);
  }
}

module.exports = PostService;

