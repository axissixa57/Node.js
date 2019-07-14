const fs = require("fs");
 
const writeableStream = fs.createWriteStream("hello.txt");
writeableStream.write("Привет мир!");
writeableStream.write("Продолжение записи\n");
writeableStream.end("Завершение записи");
const readableStream = fs.createReadStream("hello.txt", "utf8");
 
readableStream.on("data", function(chunk){ 
    console.log(chunk);
});

// Сам поток(readableStream) разбивается на ряд кусков или чанков (chunk). 
// И при считывании каждого такого куска, возникает событие data. 
// С помощью метода on() мы можем подписаться на это событие и вывести каждый кусок данных на консоль.