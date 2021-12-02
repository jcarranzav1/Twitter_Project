const mongoose = require('mongoose');

const fields = {
  username: {
    type: String,
    required: true,
    trim: true,
    maxLength: 128,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 256,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    maxLength: 256,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
    maxLength: 256,
  },
};

const user = new mongoose.Schema(fields, {
  timestamps: true, // nos crea la fecha de creación y la fecha de edición
});

const model = mongoose.model('user', user);
module.exports = {
  Model: model,
  fields,
};
