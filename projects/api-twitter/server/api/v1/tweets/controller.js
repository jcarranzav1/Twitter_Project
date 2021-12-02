const Model = require('./model');

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
      req.doc = data; // hacemos monekey patch, para que el res en read lea el elemento docx
      next();
    }
  } catch (error) {
    next(error);
  }
};

exports.all = async (req, res, next) => {
  const data = await Model.find({}).exec();
  // const { query = {} } = req;
  try {
    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};
exports.create = async (req, res, next) => {
  const { body = {} } = req;
  const document = new Model(body);
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
  const { doc = {}, body = {} } = req;
  console.log(doc, body);
  Object.assign(doc, body);
  try {
    const data = await doc.save();
    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};
exports.delete = async (req, res, next) => {
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
