const fs = require('fs')
const path = require('path');

const pathToFile = path.join(__dirname, 'bigfile.txt');

function generateFile(lines, cb) {
    let res = ''
    for (let i = 0; i < lines; i++) {
        res += 'Lorem ipsum '.repeat(5).concat('\n');
        i % 100000 === 0 && reportMemoryUsage();
    }

    fs.writeFile(pathToFile, res, cb)
}

function reportMemoryUsage() {
    // вывод кол-ва затрачиваемой памяти для записи в файл. Макс память для process 1,5 GB, после будет ошибка
    console.log('memory:', (process.memoryUsage().heapTotal / 1e+9).toFixed(2), 'GB') 
}

const now = Date.now();
generateFile(10 ** 9,
    () => console.log('time: ', (Date.now() - now) / 1000, 'sec')
)