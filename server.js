const http = require('http');

const app = require('./app')

const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port, '192.168.1.33',() => {
    console.log('http://localhost:'+port)
});
