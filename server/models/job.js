const mongoose = require('mongoose');


const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  description: String,
  url: String,
  postedAt: Date,
  source: String,
});

module.exports = mongoose.model('Job', jobSchema);