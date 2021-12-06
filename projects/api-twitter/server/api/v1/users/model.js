const mongoose = require('mongoose');

// eslint-disable-next-line import/no-unresolved
const { hash, compare } = require('bcryptjs');

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
const hiddenFields = ['password'];

const user = new mongoose.Schema(fields, {
  timestamps: true, // nos crea la fecha de creación y la fecha de edición
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
});

// this hace referencia al document
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

//  estoy diciendo pre 'save', osea antes de guardar ejecuta esta funcion
user.pre('save', async function save(next) {
  if (this.isNew || this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
  next();
});

/* a los documentos, le puedo crear mis propios métodos (funciones) */

// user.methods.toJSON : convertimos el documento en un objeto JS
// como nosotros más arriba llamamos a la funcion de mongoose toJSON,
// pues esta funcion de abajo, se ejecutará antes de crear un archivo JSON.
user.methods.toJSON = function toJSON() {
  const document = this.toObject();
  hiddenFields.forEach((field) => {
    if (document[field] !== undefined) {
      delete document[field];
    }
  });
  return document;
};

user.methods.verifyPassword = function verifyPassword(value) {
  return compare(value, this.password);
};

const model = mongoose.model('user', user);

module.exports = {
  Model: model,
  fields,
};
