// const fs = require("fs");

// const readableStream = fs.createReadStream("hello.txt", "utf8");
// const writeableStream = fs.createWriteStream("some.txt");
// readableStream.on("data", function(chunk){
//     writeableStream.write(chunk);
// });
// -----------------------------------------------------------------------------------------------------
// const fs = require("fs");

// const readableStream = fs.createReadStream("hello.txt", "utf8");
// const writeableStream = fs.createWriteStream("some2.txt");
// readableStream.pipe(writeableStream);
// -----------------------------------------------------------------------------------------------------
// Рассмотрим другую проблему - архивацию файла. Здесь нам надо сначала считать файл, затем сжать данные и в конце записать сжатые данные в файл-архив. Pipes особенно удобно применять для подобного набора операций:
// const fs = require("fs");
// const zlib = require("zlib");

// const readableStream = fs.createReadStream("hello.txt", "utf8");
// const writeableStream = fs.createWriteStream("hello.txt.gz");
// const gzip = zlib.createGzip();
// readableStream.pipe(gzip).pipe(writeableStream);
// Для архивации подключается модуль zlib. Каждый метод pipe() в цепочке вызовов возвращает поток для чтения, к которому опять же можно применить метод pipe() для записи в другой поток.