const AppError = require("../utils/AppError");

const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${req.method} ${req.originalUrl} → ${err.message}`);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err.response) {
    return res.status(err.response.status).json({
      error: `Erro na API do TMDB: ${err.response.data?.status_message || err.response.statusText}`,
    });
  }

  res.status(500).json({
    error: process.env.NODE_ENV === 'development'
      ? err.message
      : 'Erro interno do servidor',
  });
};

module.exports = errorHandler;