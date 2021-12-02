const express = require('express');

const api = require('./api/v1/api');
const { logger, requestId, requestLog } = require('./config/logger');

const app = express();

// Middleware
app.use(requestId);
app.use(requestLog);
app.use(express.json());

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
app.use((err, req, res, next) => {
    const { statusCode = 500, message = '' } = err;
    logger.error(message);

    res.status(statusCode);
    res.json({
        message,
    });
});
module.exports = app;
