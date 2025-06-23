const axios = require('axios');
const xml2js = require('xml2js');
const jobQueue = require('../queue/jobQueue');

const jobFeeds = [
  'https://jobicy.com/?feed=job_feed',
  'https://jobicy.com/?feed=job_feed&job_categories=data-science',
  'https://jobicy.com/?feed=job_feed&job_categories=seller&job_types=full-time&search_region=france'
  'https://jobicy.com/?feed=job_feed&job_categories=design-multimedia'
];

const parseXML = async (xml) => await xml2js.parseStringPromise(xml, { explicitArray: false });


const fetchJobs = async () => {
  for (const feed of jobFeeds) {
    try {
      const { data } = await axios.get(feed);
      const json = await parseXML(data);
      const items = json.rss.channel.item || [];
      const jobs = Array.isArray(items) ? items : [items];

      for (let job of jobs) {
        job.source = feed;
        await jobQueue.add('import-job', job);
      }

      console.log(` ${jobs.length} jobs queued from ${feed}`);
    } catch (error) {
      console.error(` Failed to fetch from ${feed}:`, error.message);
    }
  }
};

module.exports = fetchJobs;
