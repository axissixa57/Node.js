const net = require('net');

const server = net.createServer();
server.on('connection', (socket) => {
    // т.к. socket duplex(readable and writable) stream то можно записать socket.pipe(socket);
    // всё что напишет клиент серверу, получит в ответ
    socket.pipe(socket); 
    socket.on('close', () => { // сработает при отправке client.end
        console.log('client disconnected');
    });
});
server.listen(8080);

const client = net.createConnection(8080); // подключение клиента к серверу
client.on('data', (data) => {
    console.log('server responded: ', data.toString());
});

client.write('Hello server!');
client.end('Bye server!');
