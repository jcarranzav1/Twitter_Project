const mongoose = require('mongoose');
const { hash, compare } = require('bcryptjs');
// eslint-disable-next-line import/no-unresolved
const { default: isEmail } = require('validator/lib/isemail');
const { body } = require('express-validator');

const sanitizers = [
  body('username').escape(),
  body('name').escape(),
  body('lastname').escape(),
  body('email').escape(),
  body('password').isLength({ min: 6, max: 25 }).escape(),
];

const fields = {
  username: {
    type: String,
    required: true,
    trim: true,
    maxLength: 128,
    unique: true,
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
    required: [true, 'This field is important!'],
    trim: true,
    maxLength: 256,
    unique: true,
    validate: {
      validator(value) {
        return isEmail(value);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: [6, 'The password must be at least 6 characters'],
    maxLength: 256,
  },
};
const hiddenFields = ['password'];

const user = new mongoose.Schema(fields, {
  timestamps: true,
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

/* a los documentos, le puedo crear mis propios métodos (funciones).
   Estos métodos, se van a instanciar en cualquier parte de nuestro documento.
*/
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
  sanitizers,
};
