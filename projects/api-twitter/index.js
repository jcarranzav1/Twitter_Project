const http = require('http');
const app = require('./server');
const config = require('./server/config/index');

/* const hostname: '127.0.0.1; ya no es necesario ponerlo,
porque esta configuracion ya corre en la maquina local */

const { port } = config;
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
});
