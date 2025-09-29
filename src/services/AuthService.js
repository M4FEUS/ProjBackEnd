/**
 * @file AuthService.js
 * @description Serviço responsável pela lógica de autenticação de usuários, incluindo registro e login.
 * Interage com o UserRepository para persistência de dados e utiliza bcryptjs para hashing de senhas
 * e jsonwebtoken para geração de tokens de autenticação.
 */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const userRepository = require("../repositories/userRepository");

class AuthService {
  /**
   * @description Registra um novo usuário na aplicação.
   * Hashea a senha fornecida antes de salvar o usuário no banco de dados.
   * @param {string} username O nome de usuário.
   * @param {string} email O email do usuário.
   * @param {string} password A senha do usuário (em texto claro).
   * @returns {Promise<object>} O objeto do usuário recém-criado (sem a senha).
   * @throws {Error} Se o usuário ou email já existirem ou houver outro erro de persistência.
   */
  async register(username, email, password) {
    // Hashea a senha para segurança antes de armazenar.
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userRepository.create({
      username,
      email,
      password: hashedPassword,
    });
    // Retorna o usuário sem a senha para a camada de apresentação.
    return newUser;
  }

  /**
   * @description Autentica um usuário com base no email e senha.
   * Compara a senha fornecida com a senha hasheada no banco de dados e gera um JWT.
   * @param {string} email O email do usuário.
   * @param {string} password A senha do usuário (em texto claro).
   * @returns {Promise<{token: string, user: object}>} Um objeto contendo o token JWT e os dados do usuário.
   * @throws {Error} Se o usuário não for encontrado ou a senha estiver incorreta.
   */
  async login(email, password) {
    // Busca o usuário pelo email.
    const users = await userRepository.find({ email });

    // Verifica se o usuário existe.
    if (!users || users.length === 0) {
      throw new Error("Usuário não encontrado.");
    }
    const foundUser = users[0];

    // Compara a senha fornecida com a senha hasheada.
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      throw new Error("Senha incorreta.");
    }

    // Gera um JSON Web Token para o usuário autenticado.
    const token = jwt.sign({ id: foundUser._id, username: foundUser.username }, config.jwtSecret, { expiresIn: "1h" });
    // Retorna o token e os dados do usuário (sem a senha).
    return { token, user: foundUser };
  }
}

// Exporta uma instância única do AuthService.
module.exports = new AuthService();


