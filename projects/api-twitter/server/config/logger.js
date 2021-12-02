const winston = require('winston');
const morgan = require('morgan');
const { v4: uuid4 } = require('uuid');
const stripFinalNewLine = require('strip-final-newline');

const logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'logs/request.log',
            level: 'info',
        }),
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
        }),
    ],
});

exports.requestId = (req, res, next) => {
    const { headers } = req;
    // console.log(headers);
    const id = headers['X-Request-Id'] ?? uuid4();
    req.id = id;
    next();
};

morgan.token('id', (req) => req.id);

exports.requestLog = morgan(
    ':remote-addr [:date[iso]] :id ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
    {
        stream: { write: (message) => logger.info(stripFinalNewLine(message)) },
    },
);

exports.logger = logger;
