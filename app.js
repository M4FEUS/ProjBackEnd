require('dotenv').config();
const express = require('express');
const connectDB = require('./src/db/db');
const logger = require('./src/utils/logger');

// Importar rotas (serão criadas nas próximas etapas)
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const postRoutes = require('./src/routes/postRoutes');
const commentRoutes = require('./src/routes/commentRoutes');

// Importar middlewares
const { notFound, errorHandler } = require('./src/middleware/errorMiddleware');

const app = express();

// Conectar ao banco de dados
connectDB();

// Middlewares globais
app.use(express.json()); // Permite que o Express parseie o corpo das requisições como JSON

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Rota de teste simples
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API Micro-Blogging rodando com sucesso!' });
});

// Middlewares de tratamento de erro (devem ser os últimos a serem usados)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});

