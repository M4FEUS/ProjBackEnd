/**
 * @file db.js
 * @description Configura e estabelece a conexão com o banco de dados MongoDB usando Mongoose.
 */

const mongoose = require("mongoose");
const config = require("../config/config");
const logger = require("../utils/logger");

/**
 * @function connectDB
 * @description Conecta a aplicação ao banco de dados MongoDB.
 * Utiliza a URI de conexão definida no arquivo de configuração.
 * Em caso de sucesso, registra uma mensagem de informação.
 * Em caso de falha, registra o erro e encerra o processo da aplicação.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(config.database.uri, {
      // useNewUrlParser e useUnifiedTopology são opções que não têm mais efeito em versões recentes do driver do MongoDB,
      // mas são mantidas por compatibilidade com versões mais antigas do Mongoose.
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("Conectado ao MongoDB com sucesso!");
  } catch (error) {
    logger.error(`Erro ao conectar ao MongoDB: ${error.message}`);
    process.exit(1); // Encerra o processo da aplicação em caso de falha na conexão com o DB
  }
};

module.exports = connectDB;


