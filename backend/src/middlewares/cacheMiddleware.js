const redisService = require('../services/redisService');

const cacheMiddleware = (time = 3600) => async (req, res, next) => {
  const key = `cache:${req.originalUrl}`;

  try {
    const cached = await redisService.getCache(key);
    if (cached) return res.json(cached);

    const originalJson = res.json.bind(res);
    res.json = async (data) => {
      if (res.statusCode === 200) {
        await redisService.setCache(key, data, time);
      }
      return originalJson(data);
    };

    next();
  } catch (error) {
    console.error('🔴 Falha no Middleware de Cache:', error);
    next();
  }

};

module.exports = cacheMiddleware;