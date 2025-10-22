/**
 * @file index.js
 * @description Arquivo principal para demonstração das funcionalidades CRUD
 * de Usuários, Posts e Comentários, utilizando Node.js puro e MongoDB (Mongoose).
 * Inclui exemplos de criação, leitura, atualização e exclusão, além de validações
 * e integração com o sistema de logging de erros.
 */

const connectDB = require("./src/db/db");
const logger = require("./src/utils/logger");
const UserRepository = require("./src/repositories/userRepository");
const PostRepository = require("./src/repositories/postRepository");
const CommentRepository = require("./src/repositories/commentRepository");
const bcrypt = require("bcryptjs");

// Função para simular atrasos em operações assíncronas
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * @description Função principal que executa todos os testes CRUD.
 */
async function runTests() {
  logger.info("Iniciando os testes CRUD...");

  // Conecta ao banco de dados
  await connectDB();

  try {
    // --- TESTES DE USUÁRIO (User) ---
    logger.info("\n--- Testes de Usuário ---");

    // 1. Criar Usuário
    logger.info("Criando usuário: Alice");
    const hashedPasswordAlice = await bcrypt.hash("passwordAlice", 10);
    let alice = await UserRepository.create({
      username: "alice_wonder",
      email: "alice@example.com",
      password: hashedPasswordAlice,
    });
    logger.info("Usuário Alice criado:", alice);

    logger.info("Criando usuário: Bob");
    const hashedPasswordBob = await bcrypt.hash("passwordBob", 10);
    let bob = await UserRepository.create({
      username: "bob_builder",
      email: "bob@example.com",
      password: hashedPasswordBob,
    });
    logger.info("Usuário Bob criado:", bob);

    // 1.1. Teste de validação: Criar usuário com email duplicado
    logger.warn("Tentando criar usuário com email duplicado (deve falhar):");
    try {
      const hashedPasswordAlice2 = await bcrypt.hash("passwordAlice", 10);
      await UserRepository.create({
        username: "alice_duplicate",
        email: "alice@example.com",
        password: hashedPasswordAlice2,
      });
    } catch (error) {
      logger.error(`Erro esperado ao criar usuário duplicado: ${error.message}`);
    }

    // 2. Ler Usuários
    logger.info("Buscando todos os usuários:");
    let users = await UserRepository.find({});
    logger.info("Usuários encontrados:", users.map(u => ({ id: u._id, username: u.username })));

    logger.info("Buscando usuário Alice pelo ID:");
    alice = await UserRepository.findById(alice._id);
    logger.info("Alice encontrada:", { id: alice._id, username: alice.username });

    // 3. Atualizar Usuário
    logger.info("Atualizando email de Alice:");
    alice = await UserRepository.update(alice._id, { email: "alice.new@example.com" });
    logger.info("Alice atualizada:", { id: alice._id, email: alice.email });

    // --- TESTES DE POST (Post) ---
    logger.info("\n--- Testes de Post ---");

    // 1. Criar Post
    logger.info("Alice criando um post:");
    let postAlice1 = await PostRepository.create({
      user_id: alice._id,
      content: "Olá, mundo! Meu primeiro post aqui."
    });
    logger.info("Post de Alice criado:", postAlice1);

    logger.info("Bob criando um post:");
    let postBob1 = await PostRepository.create({
      user_id: bob._id,
      content: "Construindo algo incrível hoje!"
    });
    logger.info("Post de Bob criado:", postBob1);

    // 1.1. Teste de validação: Criar post sem user_id (deve falhar)
    logger.warn("Tentando criar post sem user_id (deve falhar):");
    try {
      await PostRepository.create({ content: "Post sem autor" });
    } catch (error) {
      logger.error(`Erro esperado ao criar post sem user_id: ${error.message}`);
    }

    // 2. Ler Posts
    logger.info("Buscando todos os posts:");
    let posts = await PostRepository.find({});
    logger.info("Posts encontrados:", posts);

    logger.info("Buscando posts de Alice:");
    let alicePosts = await PostRepository.find({ user_id: alice._id });
    logger.info("Posts de Alice encontrados:", alicePosts);

    // 3. Atualizar Post
    logger.info("Atualizando conteúdo do post de Alice:");
    postAlice1 = await PostRepository.update(postAlice1._id, { content: "Olá novamente! Post atualizado." });
    logger.info("Post de Alice atualizado:", postAlice1);

    // --- TESTES DE COMENTÁRIO (Comment) ---
    logger.info("\n--- Testes de Comentário ---");

    // 1. Criar Comentário
    logger.info("Bob comentando no post de Alice:");
    let commentBob1 = await CommentRepository.create({
      post_id: postAlice1._id,
      user_id: bob._id,
      content: "Ótimo post, Alice!"
    });
    logger.info("Comentário de Bob criado:", commentBob1);

    logger.info("Alice comentando no próprio post:");
    let commentAlice1 = await CommentRepository.create({
      post_id: postAlice1._id,
      user_id: alice._id,
      content: "Obrigada, Bob!"
    });
    logger.info("Comentário de Alice criado:", commentAlice1);

    // 1.1. Teste de validação: Criar comentário sem post_id (deve falhar)
    logger.warn("Tentando criar comentário sem post_id (deve falhar):");
    try {
      await CommentRepository.create({
        user_id: bob._id,
        content: "Comentário sem post"
      });
    } catch (error) {
      logger.error(`Erro esperado ao criar comentário sem post_id: ${error.message}`);
    }

    // 2. Ler Comentários
    logger.info("Buscando todos os comentários:");
    let comments = await CommentRepository.find({});
    logger.info("Comentários encontrados:", comments);

    logger.info("Buscando comentários do post de Alice:");
    let postAliceComments = await CommentRepository.find({ post_id: postAlice1._id });
    logger.info("Comentários no post de Alice:", postAliceComments);

    // 3. Atualizar Comentário
    logger.info("Atualizando conteúdo do comentário de Bob:");
    commentBob1 = await CommentRepository.update(commentBob1._id, { content: "Realmente muito bom, Alice!" });
    logger.info("Comentário de Bob atualizado:", commentBob1);

    // --- TESTES DE EXCLUSÃO ---
    logger.info("\n--- Testes de Exclusão ---");

    // 4. Deletar Comentário
    logger.info("Deletando comentário de Alice:");
    await CommentRepository.remove(commentAlice1._id);
    logger.info("Comentário de Alice deletado.");
    let remainingComments = await CommentRepository.find({ _id: commentAlice1._id });
    logger.info("Comentário de Alice após exclusão (deve ser vazio):", remainingComments);

    // 4. Deletar Post
    logger.info("Deletando post de Alice (e seus comentários associados, se houver cascade):");
    await PostRepository.remove(postAlice1._id);
    logger.info("Post de Alice deletado.");
    let remainingPosts = await PostRepository.find({ _id: postAlice1._id });
    logger.info("Post de Alice após exclusão (deve ser vazio):", remainingPosts);
    let commentsAfterPostDeletion = await CommentRepository.find({ post_id: postAlice1._id });
    logger.info("Comentários do post de Alice após exclusão do post (deve ser vazio):", commentsAfterPostDeletion);

    // 4. Deletar Usuário
    logger.info("Deletando usuário Bob (e seus posts/comentários associados, se houver cascade):");
    await UserRepository.remove(bob._id);
    logger.info("Usuário Bob deletado.");
    let remainingBob = await UserRepository.find({ _id: bob._id });
    logger.info("Usuário Bob após exclusão (deve ser vazio):", remainingBob);

    logger.info("Deletando usuário Alice:");
    await UserRepository.remove(alice._id);
    logger.info("Usuário Alice deletado.");

  } catch (error) {
    logger.error(`Erro durante os testes CRUD: ${error.message}`, { stack: error.stack });
  } finally {
    // Garante que a conexão com o banco de dados seja fechada após os testes
    logger.info("\nFinalizando testes. Desconectando do MongoDB.");
    await require("mongoose").disconnect();
  }
}

// Executa os testes
runTests();


