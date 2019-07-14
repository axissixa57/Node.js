const fs = require('fs');
const path = require('path');

const pathToBigFile = path.join(__dirname, 'bigfile.txt');


function generateFile(lines, cb) {
    const writable = fs.createWriteStream(pathToBigFile);
    const str = 'Lorem Ipsum '.repeat(5).concat('\n');

    writable.on('close', cb); // при зыкрытии потока сработает callback

    function start(n) {
        if (n === 0) {
            writable.end('last line'); // записывает последнюю запись в файл
            return;
        }

        // вывод кол-ва затрачиваемой памяти для записи в файл.
        n % 100000 === 0 && console.log('memory:', (process.memoryUsage().heapTotal / 1e+9).toFixed(2), 'GB')
        writeToStream(writable, str, () => start(n - 1));
    }

    start(lines);
}

function writeToStream(stream, chunk, cb) {
    const isFull = !stream.write(chunk); // если false - stream переполнен

    if (isFull) { // нужна проверка т.к. может не успеть записывать данные 
        stream.once('drain', cb); 
        // событие 'drain' сработает когда stream будет готов принимать в себя данные;
        // once - значит что обработчик сработает и сразу удалится
    } else {
        cb();
        // process.nextTick(cb);
    }
}

const now = Date.now();
generateFile(10 ** 6,
    () => console.log('time: ', (Date.now() - now) / 1000, 'sec')
)
