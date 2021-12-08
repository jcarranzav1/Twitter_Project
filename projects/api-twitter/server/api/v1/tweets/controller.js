const {
  filterByNested,
  paginationParams,
  sortParams,
  sortTransform,
} = require('../../../utils');

// eslint-disable-next-line object-curly-newline
const { Model, fields, references, virtuals } = require('./model');
const { Model: User } = require('../users/model');

const referencesNames = [
  ...Object.getOwnPropertyNames(references),
  ...Object.getOwnPropertyNames(virtuals),
];

exports.parentId = async (req, res, next) => {
  const { params = {} } = req;
  const { user = '' } = params;

  if (user) {
    const data = await User.findById(user).exec();
    if (data) {
      next();
    } else {
      const message = 'User not found';
      next({
        message,
        statusCode: 404,
        level: 'error',
      });
    }
  } else {
    next();
  }
};

exports.id = async (req, res, next) => {
  const { params = {} } = req;
  const { id = '' } = params;
  const { populate } = filterByNested(params, referencesNames);
  try {
    const data = await Model.findById(id).populate(populate);
    if (!data) {
      const message = `${Model.modelName} not found`;
      next({
        message,
        statusCode: 404,
        level: 'warn',
      });
    } else {
      req.doc = data; // hacemos monekey patch, para que el res en read lea el elemento docx
      next();
    }
  } catch (error) {
    next(error);
  }
};

exports.all = async (req, res, next) => {
  const { params, query = {} } = req;
  const { limit, skip, page } = paginationParams(query);
  const { sortBy, direction } = sortParams(query, fields);
  const { filters, populate } = filterByNested(params, referencesNames);

  const docs = Model.find(filters)
    .sort(sortTransform(sortBy, direction))
    .skip(skip)
    .limit(limit)
    .populate(populate);

  const all = Model.countDocuments(filters);
  try {
    const response = await Promise.all([docs.exec(), all.exec()]);
    // se hace con el fin de ejecuar docs y all en paralelo.
    // Ya no necesitamos esperar que se cumpla una, para ejecutar la otra.
    // Es una forma de optimizar promesas.
    const [data, total] = response;
    const pages = Math.ceil(total / limit);

    res.json({
      data,
      meta: {
        limit,
        skip,
        total,
        page,
        pages,
      },
    });
  } catch (error) {
    next(error);
  }
};
exports.create = async (req, res, next) => {
  const { body = {}, decoded } = req;
  const { id } = decoded;
  const document = new Model({
    ...body,
    user: id,
    /* este user hace referencia al user de nuestro model.
    Antes agregabamos en el Postman el id del usuario, ahora usando tokens (signin)
    lo protegemos y lo enviamos automaticamente por auth y los routes
    */
  });
  try {
    const data = await document.save();
    const status = 201;
    res.status(status);
    res.json({
      data,
      meta: {
        status,
      },
    });
  } catch (error) {
    next(error);
  }
};
exports.read = async (req, res, next) => {
  const { doc = {} } = req;

  res.json({
    data: doc,
  });
};
exports.update = async (req, res, next) => {
  // const { doc = {}, body = {}, params = {} } = req;
  const { doc = {}, body = {} } = req;

  Object.assign(doc, body);
  try {
    // Model.findbyIdAndUpdate()
    const data = await doc.save();
    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};
exports.delete = async (req, res, next) => {
  // Model.findbyIdAndDelete()
  const { doc = {} } = req;
  try {
    const data = await doc.remove();
    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};
