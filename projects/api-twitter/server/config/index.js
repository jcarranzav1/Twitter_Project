require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  database: {
    url: process.env.DATABASE_URL,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
  pagination: {
    limit: 10,
    skip: 0,
    page: 1,
  },
  sort: {
    sortBy: {
      fields: ['createdAt', 'updatedAt'],
      default: 'createdAt',
    },
    direction: {
      default: 'desc',
      options: ['asc', 'desc'],
    },
  },
  token: {
    secret: process.env.TOKEN_SECRET,
    expires: process.env.TOKEN_EXPIRES,
  },
  cors: {
    origin: process.env.ACCESS_CONTROL_ALLOW_ORIGIN,
  },
};
module.exports = config;
