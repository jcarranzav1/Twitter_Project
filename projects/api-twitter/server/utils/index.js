const config = require('../config/config');

const { pagination } = config;

exports.paginationParams = ({
  limit = pagination.limit,
  page = pagination.page,
  skip = pagination.skip,
}) => ({
  limit: Number.parseInt(limit, 10),
  page: Number.parseInt(page, 10),
  skip: skip ? Number.parseInt(skip, 10) : (page - 1) * 10,
});
