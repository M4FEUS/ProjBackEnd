/**
 * @file logger.js
 * @description Configura o sistema de logging da aplicação para registrar informações e erros.
 * Utiliza a biblioteca Winston para criar logs formatados em texto simples (TXT).
 */

const winston = require("winston");
const config = require("../config/config");
const path = require("path");
const fs = require("fs");

// Garante que o diretório de logs exista
const logDir = path.resolve(__dirname, "../../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
  level: config.logging.level,
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    // Formato de texto simples para os logs
    winston.format.printf(info => {
      if (info.stack) {
        return `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}\n${info.stack}`;
      }
      return `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`;
    })
  ),
  transports: [
    // Transport para logs de erro (nível 'error' e abaixo) em arquivo TXT
    new winston.transports.File({
      filename: path.join(logDir, config.logging.errorFile),
      level: "error",
      format: winston.format.uncolorize(), // Garante que não haja cores no arquivo
    }),
    // Transport para logs gerais (nível 'info' e abaixo) em arquivo TXT
    new winston.transports.File({
      filename: path.join(logDir, config.logging.logFile),
      format: winston.format.uncolorize(), // Garante que não haja cores no arquivo
    }),
  ]
});

// Adiciona transporte para console apenas em ambiente de desenvolvimento
if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(), // Cores no console para melhor legibilidade
      winston.format.simple()
    )
  }));
}

module.exports = logger;


