const config = require('../config/config');

const { pagination, sort } = config;

exports.paginationParams = ({
  limit = pagination.limit,
  page = pagination.page,
  skip = pagination.skip,
}) => ({
  limit: Number.parseInt(limit, 10),
  page: Number.parseInt(page, 10),
  skip: skip ? Number.parseInt(skip, 10) : (page - 1) * 10,
});

exports.sortParams = (
  { sortBy = sort.sortBy.default, direction = sort.direction.default },
  fields,
) => {
  const safeList = {
    sortBy: [Object.getOwnPropertyNames(fields), ...sort.sortBy.fields],
    direction: sort.direction.options,
  };
  // Crear una lista de todos los campos
  // Comprobar si el campo que envio el usario esta en la lista
  // Si no que tome el que esta por defecto en config
  // Return sortBy y direction
  return {
    sortBy: safeList.sortBy.includes(sortBy) ? sortBy : sort.sortBy.default,
    direction: safeList.direction.includes(direction)
      ? direction
      : sort.direction.default,
  };
};

// sortBy: location
// direction: "desc"

// return: "-location", si es "asc" return: "location"

exports.sortTransform = (sortBy, direction) => {
  const dir = direction === 'desc' ? '-' : '';
  return `${dir}${sortBy}`;
};

exports.filterByNested = (params, referencesNames) => {
  // referencesName = ['users]
  const paramsName = Object.getOwnPropertyNames(params); // ['users']
  const populateNames = referencesNames.filter(
    (item) => !paramsName.includes(item),
  ); // []

  return {
    filters: params,
    populate: populateNames.join(' '),
  };
};
