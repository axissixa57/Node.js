// Задача: Необходимо отслеживать изменения файлов директории 
const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('events');

class Watcher extends EventEmitter {
    constructor(directory) {
        super();
        this._directory = directory;
        this._hash = new Map() // будет содержать: ключ - путь к файлу, значение - его содержимое
    }

    start() {
        this.stop();
        this._intervalId = setInterval(this.checkDirectory.bind(this), 300);
    }

    stop() {
        clearInterval(this._intervalId);
    }

    checkDirectory() {
        fs.readdir(this._directory, (err, dir) => { // dir - [ '1.txt', '2.txt', '3.txt' ] - массив из файлов в директории
            if (err) {
                console.log('error: ', err);
                return;
            }

            dir.forEach(fileName => {
                const pathToFile = path.join(this._directory, fileName);
                fs.readFile(pathToFile, 'utf-8', (err, file) => {
                    if (err) {
                        console.log('error: ', err);
                        return;
                    }

                    const prevFileState = this._hash.get(pathToFile);

                    if (file !== prevFileState) {
                        //console.log('CHANGES');
                        this.emit('CHANGES', pathToFile);
                    }

                    this._hash.set(pathToFile, file);
                });
            });
        });
    }
}

const pathToDir = path.join(__dirname, './content');

const watcher = new Watcher(pathToDir);

watcher.on('CHANGES', (file) => console.log('CHANGES AT:', file));
watcher.start();

// module.exports = Watcher;