
const mongoose = require('mongoose');

const importLogSchema = new mongoose.Schema({
  fileName: String, 
  totalFetched: Number,
  totalImported: Number,
  newJobs: Number,
  updatedJobs: Number,
  failedJobs: [
    {
      jobTitle: String,
      reason: String,
    }
  ],
  createdAt: { type: Date, default: Date.now } 
});

module.exports = mongoose.model('ImportLog', importLogSchema);

