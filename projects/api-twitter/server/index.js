const express = require('express');
const api = require('./api/v1/api');

const app = express();

app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.use('/api', api);
app.use('/api/1', api);

app.use((req, res, next) => {
    const message = 'Error. Route Not Found';
    const statusCode = 404;
    next({
        statusCode,
        message,
    });
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = '' } = err;
    res.status(statusCode);
    res.json({
        message,
    });
});
module.exports = app;
