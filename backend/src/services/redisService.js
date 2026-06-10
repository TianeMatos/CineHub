const { redisClient } = require('../config/redis');

const getCache = async (key) => {
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null; 
}

const setCache = async (key, value, time = 3600) => { // 3600s = 1h
  await redisClient.set(key, JSON.stringify(value), {
    EX: time
  });
}

const delCache = async (key) => {
  await redisClient.del(key);
};

module.exports = { getCache, setCache, delCache };