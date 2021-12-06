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
  lastname: {
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
  toJSON: {
    virtuals: true,
  },
});

user
  .virtual('fullname')
  .get(function getFullname() {
    return `${this.name} ${this.lastname}`;
  })
  .set(function setFullname(value) {
    const [name = '', lastname = ''] = value.split(' ');
    this.name = name;
    this.lastname = lastname;
  });

const model = mongoose.model('user', user);

module.exports = {
  Model: model,
  fields,
};
