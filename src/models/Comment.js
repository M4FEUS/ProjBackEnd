/**
 * @file Comment.js
 * @description Modelo de comentário usando Mongoose.
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @typedef {object} CommentSchema
 * @property {mongoose.Schema.Types.ObjectId} post_id Referência ao post.
 * @property {mongoose.Schema.Types.ObjectId} user_id Referência ao autor do comentário.
 * @property {string} content Conteúdo do comentário.
 * @property {Date} created_at Data de criação.
 */
const CommentSchema = new Schema({
  post_id: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
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

module.exports = mongoose.model("Comment", CommentSchema);


