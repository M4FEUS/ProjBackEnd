/**
 * @file commentRepository.js
 * @description Repositório para comentários, estende a classe genérica Repository.
 */

const Repository = require("../db/repository");
const Comment = require("../models/Comment");

class CommentRepository extends Repository {
  constructor() {
    super(Comment);
  }
}

module.exports = new CommentRepository();


