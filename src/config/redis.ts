// import { createClient } from 'redis';
// import dotenv from 'dotenv';

// dotenv.config();

// const redisHost = process.env.REDIS_HOST || 'localhost';
// const redisPort = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379;

// const redisClient = createClient({
//   url: `redis://${redisHost}:${redisPort}`
// });

// redisClient.on('error', (err) => console.log('Redis Client Error', err));

// (async () => {
//   await redisClient.connect();
// })();

// export default redisClient;
