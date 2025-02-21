const http = require('http');
require('dotenv').config();
const connectDB = require('./config/db');

const app = require('./app')

const port = process.env.PORT || 5000;

const server = http.createServer(app);
connectDB();
//  '192.168.1.33'
server.listen(port,() => {
    console.log('http://localhost:'+port)
});
