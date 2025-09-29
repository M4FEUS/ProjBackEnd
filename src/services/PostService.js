/**
 * @file PostService.js
 * @description Serviço responsável pela lógica de negócio relacionada a posts.
 * Interage com o PostRepository para buscar e manipular dados de posts.
 */

const postRepository = require("../repositories/postRepository");

class PostService {
  /**
   * @description Cria um novo post para um usuário específico.
   * @param {string} userId O ID do usuário que está criando o post.
   * @param {string} content O conteúdo do post.
   * @returns {Promise<object>} O objeto do post recém-criado.
   */
  async createPost(userId, content) {
    const newPost = await postRepository.create({
      user_id: userId,
      content,
    });
    return newPost;
  }

  /**
   * @description Busca todos os posts de um usuário específico.
   * @param {string} userId O ID do usuário cujos posts serão buscados.
   * @returns {Promise<Array<object>>} Um array de objetos de posts.
   */
  async getPostsByUserId(userId) {
    const posts = await postRepository.find({ user_id: userId });
    return posts;
  }

  /**
   * @description Busca todos os posts de todos os usuários.
   * @returns {Promise<Array<object>>} Um array de objetos de posts.
   */
  async getAllPosts() {
    const posts = await postRepository.find({});
    return posts;
  }

  /**
   * @description Deleta um post específico, verificando se o usuário é o autor.
   * @param {string} postId O ID do post a ser deletado.
   * @param {string} userId O ID do usuário que está tentando deletar o post.
   * @returns {Promise<{message: string}>} Uma mensagem de sucesso.
   * @throws {Error} Se o post não for encontrado ou o usuário não tiver permissão.
   */
  async deletePost(postId, userId) {
    const post = await postRepository.findById(postId);
    // Verifica se o post existe e se o usuário logado é o autor do post.
    if (!post || post.user_id.toString() !== userId.toString()) {
      throw new Error("Post não encontrado ou você não tem permissão para deletá-lo.");
    }
    await postRepository.remove(postId);
    return { message: "Post deletado com sucesso." };
  }
}

// Exporta uma instância única do PostService.
module.exports = new PostService();


