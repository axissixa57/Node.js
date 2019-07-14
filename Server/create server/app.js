// var http = require("http");
 
// http.createServer(function(request, response){
     
//     console.log("Url: " + request.url); // index.html 
//     console.log("Тип запроса: " + request.method); // GET
//     console.log("User-Agent: " + request.headers["user-agent"]); // Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36
//     console.log("Все заголовки");
//     console.log(request.headers);
     
//     response.end();
// }).listen(3000);

// если обратиться по адресу http://localhost:3000/index.html в браузере
//
// Terminal: ...
// Все заголовки
// { host: 'localhost:3000',
//   connection: 'keep-alive',
//   'upgrade-insecure-requests': '1',
//   'user-agent':
//    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
//   accept:
//    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
//   'accept-encoding': 'gzip, deflate, br',
//   'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7' }
// Url: /favicon.ico
// Тип запроса: GET
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36
// Все заголовки
// { host: 'localhost:3000',
//   connection: 'keep-alive',
//   'user-agent':
//    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
//   accept: 'image/webp,image/apng,image/*,*/*;q=0.8',
//   referer: 'http://localhost:3000/index.html',
//   'accept-encoding': 'gzip, deflate, br',
//   'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7' }
// -------------------------------------------------------------------------------------------
const http = require("http");

http.createServer(function(request, response){ 
    response.setHeader("UserId", 12);
    response.setHeader("Content-Type", "text/html; charset=utf-8;");
    response.write("<h2>hello world</h2>");
    response.end();
}).listen(3000);

// В браузере F12 -> Network -> Ctrl+R -> localhost
// Отобразит записи в Response Headers