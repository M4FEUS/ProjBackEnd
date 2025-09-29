/**
 * @file config.js
 * @description Arquivo de configuração central para a aplicação.
 * Gerencia variáveis de ambiente e configurações para diferentes partes da aplicação.
 */

module.exports = {
  // Porta em que o servidor Express irá escutar. Padrão: 3000.
  port: process.env.PORT || 3000,

  // Chave secreta para assinar e verificar JSON Web Tokens (JWT).
  // É crucial que esta chave seja forte e mantida em segredo em produção.
  jwtSecret: process.env.JWT_SECRET || 'supersecretjwtkey',

  // Configurações do banco de dados MongoDB.
  database: {
    // URI de conexão com o MongoDB. Padrão: MongoDB local na porta 27017 com o banco 'microblog'.
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/microblog'
  },

  // Configurações para o sistema de logging (Winston).
  logging: {
    // Nível mínimo de log a ser exibido/salvo (ex: 'info', 'warn', 'error', 'debug'). Padrão: 'info'.
    level: process.env.LOG_LEVEL || 'info',
    // Caminho para o arquivo de log geral. Padrão: './logs/app.log'.
    logFile: process.env.LOG_FILE || './logs/app.log',
    // Caminho para o arquivo de log de erros. Padrão: './logs/error.log'.
    errorFile: process.env.ERROR_FILE || './logs/error.log'
  }
};


