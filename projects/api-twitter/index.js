const http = require('http');

const app = require('./server');
const config = require('./server/config');
const { connect } = require('./server/database');

const { database, port } = config;

// Database
connect({
  url: database.url,
  username: database.username,
  password: database.password,
});

// Server
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
