const net = require('net');
const fs = require('fs');

const server = net.createServer();

server.on('connection', (socket) => { // событие 'connection' сработает когда клиент подключится
    // socket-om посути является клиент
    socket.on( // событие 'data' сработает когда придут данные от клиента
        'data',
        data => console.log('request: ', data.toString())
    )

    // Console: 
    // request:  GET / HTTP/1.1
    // Host: localhost:8080
    // Connection: keep-alive
    // Upgrade-Insecure-Requests: 1
    // User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36
    // Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
    // Accept-Encoding: gzip, deflate, br
    // Accept-Language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7


    // request:  GET /favicon.ico HTTP/1.1
    // Host: localhost:8080
    // Connection: keep-alive
    // User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36
    // Accept: image/webp,image/apng,image/*,*/*;q=0.8
    // Referer: http://localhost:8080/
    // Accept-Encoding: gzip, deflate, br
    // Accept-Language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7

    const html = '<h1>hello world!!</h1>';

    socket.end(`HTTP/1.1 200 OK
                Content-Length: ${html.length}
                Content-Type: text/html

                ${html}`); // эти параметры необходимы, чтобы браузер понял что к нему идёт http 
});

server.listen(8080, () => console.log('listening...'));

