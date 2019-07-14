const stream = require('stream');
const fs = require('fs');
const path = require('path');

const pathToBigFile = path.join(__dirname, 'bigfile.txt');

let lines = 10 ** 6;

// создаём свой ReadStream
const readStream = new stream.Readable({
    read() {
        const str = 'Lorem Ipsum '.repeat(5).concat('\n');
        this.push(str); 
        if (lines-- <= 0) {
            this.push(null); // окончание stream-a
        }
    }
}) 
// при иницилизации экземпляра Readable stream-a необходимо передавать объект с вызовом метода read() иначе:
// Error [ERR_METHOD_NOT_IMPLEMENTED]: The _read() method is not implemented
// this.push(str); - представим что highWaterMark: 64 * 1024 из fs.createReadStream (в файле read.js) отвечает за
// размер chunk-a, кот. мы готовы обрабатывать и это chunk представляет из себя какую-то структуру и где-то хранится
// и при вызове this.push мы туда шлём кусочек и он уже пакуется в chunk и отправляется следующему потребителю

const write = fs.createWriteStream(pathToBigFile);

const start = Date.now();
readStream.pipe(write).on('finish',
    () => console.log('time: ', (Date.now() - start) / 1000, 'sec')
) 
// pipe - соеденияет 2 потока, позволяет слажено работать двум потокам
// Под копотом pipe:
// наш stream readStream генерирует строки через метод read() и отдаёт их stream-у write.
// stream write набирает в себя chunks, как только он достиг лимита (highWaterMark) он становится "занятым" и говорит что нужно "подождать"
// как-только он записал, освободился - стригерился event drain (файл write.js), readStream это замечает и продолжает работать