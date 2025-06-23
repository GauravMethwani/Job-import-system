const cron = require('node-cron');
const fetchJobs = require('./services/getJob');
require('dotenv').config();

fetchJobs(); 

cron.schedule('0 * * * *', async () => {
  console.log(' Hourly job run started...');
  await fetchJobs();
});