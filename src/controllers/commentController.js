const CommentService = require('../services/CommentService');
const logger = require('../utils/logger');

/**
 * @description Cria um novo comentário em um post.
 * Rota: POST /api/comments/:postId
 * @access Private
 */
const createComment = async (req, res, next) => {
  const { content } = req.body;
  const { postId } = req.params;
  const user_id = req.user._id; // ID do usuário logado

  if (!content) {
    res.status(400);
    return next(new Error('O conteúdo do comentário é obrigatório.'));
  }

  try {
    const comment = await CommentService.createComment(postId, user_id, content);
    res.status(201).json(comment);
  } catch (error) {
    res.status(400);
    next(error);
  }
};

/**
 * @description Busca todos os comentários de um post.
 * Rota: GET /api/comments/:postId
 * @access Public
 */
const getCommentsByPostId = async (req, res, next) => {
  try {
    const comments = await CommentService.getCommentsByPostId(req.params.postId);
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Busca um comentário pelo ID.
 * Rota: GET /api/comments/single/:id
 * @access Public
 */
const getCommentById = async (req, res, next) => {
  try {
    const comment = await CommentService.getCommentById(req.params.id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(404);
    next(error);
  }
};

/**
 * @description Atualiza um comentário.
 * Rota: PUT /api/comments/:id
 * @access Private (apenas o autor)
 */
const updateComment = async (req, res, next) => {
  const { content } = req.body;
  const user_id = req.user._id.toString(); // ID do usuário logado

  try {
    const comment = await CommentService.updateComment(req.params.id, user_id, { content });
    res.status(200).json(comment);
  } catch (error) {
    // Erro de comentário não encontrado (404) ou não autorizado (403)
    if (error.message.includes('Comentário não encontrado')) {
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
 * @description Deleta um comentário.
 * Rota: DELETE /api/comments/:id
 * @access Private (apenas o autor)
 */
const deleteComment = async (req, res, next) => {
  const user_id = req.user._id.toString(); // ID do usuário logado

  try {
    await CommentService.deleteComment(req.params.id, user_id);
    res.status(204).json({ message: 'Comentário removido com sucesso.' });
  } catch (error) {
    // Erro de comentário não encontrado (404) ou não autorizado (403)
    if (error.message.includes('Comentário não encontrado')) {
      res.status(404);
    } else if (error.message.includes('Não autorizado')) {
      res.status(403);
    } else {
      res.status(400);
    }
    next(error);
  }
};

module.exports = { createComment, getCommentsByPostId, getCommentById, updateComment, deleteComment };

