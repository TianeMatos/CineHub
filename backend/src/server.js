const app = require('./app');
const { connectRedis } = require("./config/redis");


const PORT = process.env.SERVER_PORT || 3000
async function startServer() {

  try {
    // 1. connect on redis
    await connectRedis();

    // 2. initialize the server
    app.listen(process.env.SERVER_PORT, () => {
      console.log("Server running on Port ", PORT);
    });
  } catch (error) {
    console.error("🔴 Falha crítica na inicialização do servidor: ", error);
    process.exit(1);
  }

}

startServer();