/**
 * @file User.js
 * @description Define o modelo de usuário para o MongoDB usando Mongoose.
 * Representa a estrutura de um usuário no banco de dados, incluindo validações e tipos de dados.
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @typedef {object} UserSchema
 * @property {string} username Nome de usuário único.
 * @property {string} email Endereço de e-mail único do usuário.
 * @property {string} password Senha do usuário (hash).
 * @property {Date} created_at Data de criação do usuário.
 */
const UserSchema = new Schema({
  username: {
    type: String,
    required: true, // Campo obrigatório
    unique: true,   // Deve ser único no banco de dados
    trim: true,     // Remove espaços em branco do início e fim
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true, // Converte o e-mail para minúsculas antes de salvar
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now, // Define a data atual como padrão se não for fornecida
  },
});

// Exporta o modelo 'User' baseado no UserSchema.
// O Mongoose criará uma coleção chamada 'users' no MongoDB.
module.exports = mongoose.model("User", UserSchema);


