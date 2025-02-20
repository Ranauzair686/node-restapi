const http = require('http');
require('dotenv').config();

const app = require('./app')

const port = process.env.PORT || 5000;

const server = http.createServer(app);
//  '192.168.1.33'
server.listen(port,() => {
    console.log('http://localhost:'+port)
});
