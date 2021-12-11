const express = require('express');
const cors = require('cors');

const api = require('./api/v1/api');
const { logger, requestId, requestLog } = require('./config/logger');
const { cors: corsConfig } = require('./config');

const app = express();

// Middleware
app.use(
  cors({
    origin: corsConfig,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Accept', 'Content-Type', 'Authorization'],
  }),
);
app.use(requestId);
app.use(requestLog);
app.use(express.json()); // es como el body-parser

// API
app.use('/api', api);
app.use('/api/1', api);

// catch all
app.use((req, res, next) => {
  const message = 'Error. Route Not Found';
  const statusCode = 404;

  logger.warn(message);

  next({
    statusCode,
    message,
  });
});

// error
app.use((error, req, res, next) => {
  const { message = '', name = '' } = error;
  let { statusCode = 500 } = error;

  if (name === 'ValidationError') {
    statusCode = 422;
    logger.warn(message);
  } else {
    logger.error(message);
  }

  res.status(statusCode);
  res.json({
    message,
    error,
  });
});

module.exports = app;
