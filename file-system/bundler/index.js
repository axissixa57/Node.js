const fs = require('fs');
const { promisify } = require('util');
const path = require('path');

const readdir = promisify(fs.readdir); 
const readfile = promisify(fs.readFile);
const writefile = promisify(fs.writeFile);
// промисифицируем стандартные ф-ции модуля fs из callback() вида в Promise()

async function bundleCss(pathToDir) {
    // [ '1.css', '2.css', '3.css' ]
    const dir = await readdir(pathToDir);

    // Если не указать кодировку, то файл будет прочитан в Buffer типе
    // [ <Buffer 23 72 6f 6f 74 20 7b 0d 0a 20 20 20 20 6d 61 72 67 69 6e 3a 20 30 3b 0d 0a 7d>,
    //     <Buffer 2e 72 6f 6f 74 20 7b 0d 0a 20 20 20 20 6d 61 72 67 69 6e 3a 20 30 3b 0d 0a 7d>,
    //     <Buffer 64 69 76 20 7b 0d 0a 20 20 20 20 6d 61 72 67 69 6e 3a 20 30 3b 0d 0a 7d> ]
    const files = await Promise.all(
        dir.map(
            fileName => readfile(path.join(pathToDir, fileName))
        )
    );

    // получится строка с содержимым из всех файлов
    const bundle = files.reduce(
        (result, file, i) => result
            .concat(`\n/* module: ${path.join(pathToDir, dir[i])} */\n`) // путь файла
            .concat(file), // содержимое файла
        '/* #### CSS BUNDLER #### */\n' // отработает вначале
    );

    await writefile(path.join(__dirname, 'dist', 'bundle.css'), bundle);
}

bundleCss(path.join(__dirname, 'src'))
    .then(() => console.log('done'))
    .catch(err => console.log('error: ', err));