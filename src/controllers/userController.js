const UserService = require('../services/UserService');
const logger = require('../utils/logger');

/**
 * @description Busca todos os usuários.
 * Rota: GET /api/users
 */
const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Busca um usuário pelo ID.
 * Rota: GET /api/users/:id
 */
const getUserById = async (req, res, next) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    // Erro de usuário não encontrado
    res.status(404);
    next(error);
  }
};

/**
 * @description Atualiza um usuário.
 * Rota: PUT /api/users/:id
 */
const updateUser = async (req, res, next) => {
  try {
    // Apenas o próprio usuário pode atualizar seu perfil
    if (req.user._id.toString() !== req.params.id) {
      res.status(403);
      throw new Error('Não autorizado a atualizar este usuário.');
    }

    const user = await UserService.updateUser(req.params.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    // Erro de validação ou usuário não encontrado
    res.status(400);
    next(error);
  }
};

/**
 * @description Deleta um usuário.
 * Rota: DELETE /api/users/:id
 */
const deleteUser = async (req, res, next) => {
  try {
    // Apenas o próprio usuário pode deletar seu perfil
    if (req.user._id.toString() !== req.params.id) {
      res.status(403);
      throw new Error('Não autorizado a deletar este usuário.');
    }

    await UserService.deleteUser(req.params.id);
    res.status(204).json({ message: 'Usuário removido com sucesso.' });
  } catch (error) {
    // Erro de usuário não encontrado
    res.status(404);
    next(error);
  }
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };

