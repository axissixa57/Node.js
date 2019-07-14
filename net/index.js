const net = require('net'); // IPC(Internal-process communication) server/client and TCP(transmission control protocol) server/client

const server = net.createServer();
server.on('connection', (socket) => {
    socket.on('data', (data) => {
        console.log('message from client: ', data.toString()); // данные от клиента client.write
    });

    socket.write('hello client!'); // отправка клиенту
})
server.listen(8080, () => {
    console.log(server.address()); // { address: '::', family: 'IPv6', port: 8080 }
})


const client = net.createConnection(8080, () => {
    client.write('hello server!'); // отправка серверу
})

client.on('data', (data) => {
    console.log('server responded with: ', data.toString()); // данные от сервера socket.write
})