const cluster = require('cluster'); // Без cluster Node работает на 1 ядрe
const http = require('http');
const numCPUs = require('os').cpus().length; // число процессоров(ядер)

if (cluster.isMaster) { // проверка на то, является ли ядро главным
  console.log(`Master ${process.pid} is running`); // Идентификатор процесса process identifier, PID

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork(); // для масштабирования создаются новые процессы через cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}