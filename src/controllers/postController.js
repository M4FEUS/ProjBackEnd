const PostService = require('../services/PostService');
const logger = require('../utils/logger');

/**
 * @description Cria um novo post.
 * Rota: POST /api/posts
 * @access Private
 */
const createPost = async (req, res, next) => {
  const { content } = req.body;
  const user_id = req.user._id; // ID do usuário logado

  if (!content) {
    res.status(400);
    return next(new Error('O conteúdo do post é obrigatório.'));
  }

  try {
    const post = await PostService.createPost(user_id, content);
    res.status(201).json(post);
  } catch (error) {
    res.status(400);
    next(error);
  }
};

/**
 * @description Busca todos os posts.
 * Rota: GET /api/posts
 * @access Public
 */
const getAllPosts = async (req, res, next) => {
  try {
    const posts = await PostService.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Busca um post pelo ID.
 * Rota: GET /api/posts/:id
 * @access Public
 */
const getPostById = async (req, res, next) => {
  try {
    const post = await PostService.getPostById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404);
    next(error);
  }
};

/**
 * @description Atualiza um post.
 * Rota: PUT /api/posts/:id
 * @access Private (apenas o autor)
 */
const updatePost = async (req, res, next) => {
  const { content } = req.body;
  const user_id = req.user._id.toString(); // ID do usuário logado

  try {
    const post = await PostService.updatePost(req.params.id, user_id, { content });
    res.status(200).json(post);
  } catch (error) {
    // Erro de post não encontrado (404) ou não autorizado (403)
    if (error.message.includes('Post não encontrado')) {
      res.status(404);
    } else if (error.message.includes('Não autorizado')) {
      res.status(403);
    } else {
      res.status(400);
    }
    next(error);
  }
};

/**
 * @description Deleta um post.
 * Rota: DELETE /api/posts/:id
 * @access Private (apenas o autor)
 */
const deletePost = async (req, res, next) => {
  const user_id = req.user._id.toString(); // ID do usuário logado

  try {
    await PostService.deletePost(req.params.id, user_id);
    res.status(204).json({ message: 'Post removido com sucesso.' });
  } catch (error) {
    // Erro de post não encontrado (404) ou não autorizado (403)
    if (error.message.includes('Post não encontrado')) {
      res.status(404);
    } else if (error.message.includes('Não autorizado')) {
      res.status(403);
    } else {
      res.status(400);
    }
    next(error);
  }
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };

