const {
  paginationParams,
  sortParams,
  sortTransform,
} = require('../../../utils');

const { Model, fields } = require('./model');
const { signToken } = require('../auth');

exports.id = async (req, res, next) => {
  const { params = {} } = req;
  const { id = '' } = params;

  try {
    const data = await Model.findById(id);
    if (!data) {
      const message = `${Model.modelName} not found`;
      next({
        message,
        statusCode: 404,
        level: 'warn',
      });
    } else {
      req.doc = data; // hacemos monekey patch, para que el res en read lea el elemento doc
      next();
    }
  } catch (error) {
    next(error);
  }
};

exports.all = async (req, res, next) => {
  const { query = {} } = req;
  const { filterBy, value } = query;
  const { limit, skip, page } = paginationParams(query);
  const { sortBy, direction } = sortParams(query, fields);
  const searchBy = {};

  if (filterBy && value) {
    /* searchBy = { [filterBy]: value }; */
    Object.defineProperty(searchBy, filterBy, { value, enumerable: true });
    // agregamos enumerable para que funcione en loops
  }

  const docs = Model.find(searchBy)
    .sort(sortTransform(sortBy, direction))
    .skip(skip)
    .limit(limit);

  const all = Model.countDocuments();
  try {
    const response = await Promise.all([docs.exec(), all.exec()]);
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

exports.signin = async (req, res, next) => {
  // Recibir informacion
  // SI NO = res no existe 201
  // SI = Veriticar Password
  // SI NO = res no existe 201
  // SI = Devolver la informacion del usuario

  // Recibir informacion
  const { body = {} } = req;
  const { username, password } = body;

  try {
    // Buscar el usuario (documento) por el username
    const user = await Model.findOne({
      username,
    }).exec();
    // SI NO = res no existe 200
    const message = 'Username or password invalid';
    const statusCode = 200;

    if (!user) {
      /* este return se le conoce como early return. Porque si user no existe ejecuta el next
        y como esta con el return, se saldra de nuestra funcion signin, porque si no tocaría
        crear if else.
      */
      return next({
        message,
        statusCode,
      });
    }

    // SI = Veriticar Password
    const verified = await user.verifyPassword(password);
    if (!verified) {
      // SI NO = res no existe 200
      return next({
        message,
        statusCode,
      });
    }

    const token = signToken({
      id: user.id,
    });

    // SI = Devolver la informacion del usuario
    return res.json({
      data: user,
      meta: {
        token,
      },
    });
  } catch (error) {
    return next(error);
  }
};

exports.signup = async (req, res, next) => {
  const { body = {} } = req;
  const document = new Model(body);
  try {
    const data = await document.save();
    const status = 201;
    res.status(status);

    const token = signToken({
      id: data.id,
    });

    res.json({
      data,
      meta: {
        token,
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
exports.profile = async (req, res, next) => {
  const { decoded } = req;
  const { id } = decoded;
  try {
    const data = await Model.findById(id);
    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  const { body = {}, decoded } = req;
  const { id } = decoded;
  // const { doc={}, body = {} } = req;
  // Object.assign(doc, body);
  try {
    const data = await Model.findByIdAndUpdate(id, body, { new: true });
    // findByIdAndUpdate data será el anterior, con new:true cojemos el data actual.
    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};
