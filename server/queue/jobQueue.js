const { Queue } = require('bullmq');
const IORedis = require('ioredis');
require('dotenv').config(); 

const connection = new IORedis(process.env.REDIS_URL, {
  tls: process.env.REDIS_URL.startsWith('rediss://') ? {} : undefined,
});

const jobQueue = new Queue('jobs', { connection });

module.exports = jobQueue;
