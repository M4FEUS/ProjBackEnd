/**
 * @file repository.js
 * @description Classe base genérica para repositórios que interagem com modelos Mongoose.
 * Fornece métodos CRUD (Create, Read, Update, Delete) básicos para qualquer modelo.
 */

class Repository {
  /**
   * @param {mongoose.Model} model O modelo Mongoose associado a este repositório.
   */
  constructor(model) {
    this.model = model;
  }

  /**
   * @description Encontra documentos no banco de dados com base em condições.
   * @param {object} conditions Objeto contendo as condições de busca (ex: { email: "test@example.com" }).
   * @param {string|object} fields Campos a serem incluídos ou excluídos dos resultados (ex: "name email" ou { password: 0 }).
   * @returns {Promise<Array<object>>} Uma promessa que resolve para um array de documentos encontrados.
   */
  async find(conditions = {}, fields = null) {
    return this.model.find(conditions, fields);
  }

  /**
   * @description Encontra um documento pelo seu ID.
   * @param {string} id O ID do documento a ser encontrado.
   * @param {string|object} fields Campos a serem incluídos ou excluídos dos resultados.
   * @returns {Promise<object|null>} Uma promessa que resolve para o documento encontrado ou null se não for encontrado.
   */
  async findById(id, fields = null) {
    return this.model.findById(id, fields);
  }

  /**
   * @description Cria um novo documento no banco de dados.
   * @param {object} data Os dados do novo documento.
   * @returns {Promise<object>} Uma promessa que resolve para o documento criado.
   */
  async create(data) {
    const newItem = new this.model(data);
    return newItem.save();
  }

  /**
   * @description Atualiza um documento existente pelo seu ID.
   * @param {string} id O ID do documento a ser atualizado.
   * @param {object} data Os dados a serem atualizados.
   * @returns {Promise<object|null>} Uma promessa que resolve para o documento atualizado ou null se não for encontrado.
   */
  async update(id, data) {
    // { new: true } retorna o documento modificado em vez do original.
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  /**
   * @description Remove um documento existente pelo seu ID.
   * @param {string} id O ID do documento a ser removido.
   * @returns {Promise<object|null>} Uma promessa que resolve para o documento removido ou null se não for encontrado.
   */
  async remove(id) {
    return this.model.findByIdAndDelete(id);
  }
}

module.exports = Repository;


