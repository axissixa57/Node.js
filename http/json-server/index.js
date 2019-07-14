const http = require('http');

const users = [
    { name: 'John', age: 20 },
    { name: 'Paul', age: 25 },
];

const cities = [
    { name: 'Minsk', country: 'Belarus', capital: true },
    { name: 'Brest', country: 'Belarus', capital: false },
    { name: 'Paris', coutnry: 'France', capital: true },
];

const server = http.createServer();
server.on('request', (request, response) => {
    switch (request.url) {
        case '/users':
            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            response.end(JSON.stringify(users)); // без JSON.stringify будет ошибка т.к. в stream можно писать string or Buffer
            break;
        case '/cities':
            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            response.end(JSON.stringify(cities));
            break;
        default:
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            })
            response.end(`${request.url} not supported`);
    }
});

server.listen(8080);