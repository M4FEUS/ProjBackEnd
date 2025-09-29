/**
 * @file Post.js
 * @description Define o modelo de post para o MongoDB usando Mongoose.
 * Representa a estrutura de um post no banco de dados, incluindo a referência ao usuário que o criou.
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @typedef {object} PostSchema
 * @property {mongoose.Schema.Types.ObjectId} user_id ID do usuário que criou o post.
 * @property {string} content Conteúdo textual do post.
 * @property {Date} created_at Data de criação do post.
 */
const PostSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId, // Tipo de dado para referenciar outro documento (User)
    ref: "User",                // Refere-se ao modelo User
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Exporta o modelo 'Post' baseado no PostSchema.
// O Mongoose criará uma coleção chamada 'posts' no MongoDB.
module.exports = mongoose.model("Post", PostSchema);


