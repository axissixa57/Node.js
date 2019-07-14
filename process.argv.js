let nodePath = process.argv[0];
let appPath = process.argv[1];
let name = process.argv[2];
let age = process.argv[3];
 
console.log("nodePath: " + nodePath);
console.log("appPath: " + appPath);
console.log();
console.log("name: " + name);
console.log("age: " + age);

// При запуске приложения из терминала/командной строки мы можем передавать ему параметры. 
// Для получения параметров в коде приложения применяется массив process.argv. 
// Это аналогично тому, как в языках C/C++/C#/Java в функцию main передается набор аргументов в виде строкового массива.

// Первый элемент этого массива всегда указывает на путь к файлу node.exe, который вызывает приложение. 
// Второй элемент массив всегда указывает на путь к файлу приложения, который выполняется.

// Terminal: node app.js Tom 23