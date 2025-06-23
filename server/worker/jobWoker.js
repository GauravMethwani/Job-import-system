const { Worker } = require('bullmq');
const IORedis = require('ioredis');
const mongoose = require('mongoose');
const Job = require('../models/job');
const ImportLog = require('../models/logs');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once('open', () => console.log('MongoDB connected'));


const connection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
  tls: process.env.REDIS_URL.startsWith('rediss://') ? {} : undefined,
});

connection.on('connect', () => console.log('Redis connected'));
connection.on('error', (err) => console.error('Redis Error:', err.message));


let stats = {
  totalFetched: 0,
  totalImported: 0,
  newJobs: 0,
  updatedJobs: 0,
  failedJobs: [],
  source: null,
};

console.log(" Worker started and waiting for jobs...");


const worker = new Worker('jobs', async (job) => {
  stats.totalFetched++;

  const data = job.data;
    if (!stats.source && data.source) {
    stats.source = data.source; 
  }

  let jobData = {};

  try {
    console.log("👷 Received Job:", job.id);

    jobData = {
      title: data.title,
      description: data.description,
      company: data['job:company'] || 'Unknown',
      location: data['job:location'] || 'Remote',
      url: data.link,
      postedAt: new Date(data.pubDate),
      source: data.source,
    };

    const existing = await Job.findOne({ title: jobData.title, url: jobData.url });

    if (existing) {
      await Job.updateOne({ _id: existing._id }, jobData);
      stats.updatedJobs++;
      console.log(`🔁 Updated Job: ${jobData.title}`);
    } else {
      await Job.create(jobData);
      stats.newJobs++;
      console.log(`New Job Added: ${jobData.title}`);
    }

    stats.totalImported++;
  } catch (err) {
    console.error("Worker error:", err.message);
    stats.failedJobs.push({
      jobTitle: jobData.title || 'Unknown',
      reason: err.message,
    });
  }
}, { connection });


worker.on('completed', async () => {
  if (stats.totalFetched > 0) {
    const log = {
      fileName: stats.source || 'Unknown',          
      totalFetched: stats.totalFetched,
      totalImported: stats.totalImported,
      newJobs: stats.newJobs,
      updatedJobs: stats.updatedJobs,
      failedJobs: stats.failedJobs
    };

    await ImportLog.create(log);                     
    console.log('📝 Import log saved to MongoDB');

    stats = {
      totalFetched: 0,
      totalImported: 0,
      newJobs: 0,
      updatedJobs: 0,
      failedJobs: [],
      source: null                                     
    };
  }
});

worker.on('failed', (job, err) => {
  console.error(' Worker Error on Job:', job?.id || 'unknown', '-', err.message);
});
