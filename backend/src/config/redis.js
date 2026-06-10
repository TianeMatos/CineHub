require('dotenv').config();
const { createClient } = require('redis');

const redisClient = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
    }
});

redisClient.on('error', (err) => console.error('🔴 Redis Client Error', err));

async function connectRedis() {
  try {
    await redisClient.connect();
    console.log("🟢 Redis conectado com sucesso!");
  } catch (error) {
    console.error("🔴 Erro ao conectar no Redis:", error);
  }
}

// O cliente -> para buscar/salvar dados
// A função -> para ligar no server.js
module.exports = { redisClient, connectRedis };