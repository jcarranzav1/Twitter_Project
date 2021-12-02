const mongoose = require('mongoose');

const tweet = {
  content: String,
  location: String,
};
const model = mongoose.model('tweet', tweet);
module.exports = model;
