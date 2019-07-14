const http = require('http');
const stream = require('stream');

const server = http.createServer();

server.on('request', (request, response) => {
    console.log(request instanceof stream.Readable); // true
    console.log(response instanceof stream.Writable); // false, но использует такое поведение
})

server.listen(8080);