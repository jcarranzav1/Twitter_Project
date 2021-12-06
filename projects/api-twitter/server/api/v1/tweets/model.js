const mongoose = require('mongoose');

const fields = {
  content: {
    type: String,
    required: true,
    trim: true,
    maxLength: 255,
  },
  location: {
    type: String,
    trim: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
};
const references = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
};

const virtuals = {
  comments: {
    ref: 'comment',
    localField: '_id',
    foreignField: 'tweet',
  },
};

const tweet = new mongoose.Schema(Object.assign(fields, references), {
  timestamps: true, // nos crea la fecha de creación y la fecha de edición
  toJSON: {
    virtuals: true,
  },
});

tweet.virtual('comments', virtuals.comments);

const model = mongoose.model('tweet', tweet);

module.exports = {
  Model: model,
  fields,
  references,
  virtuals,
};
