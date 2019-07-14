// const express = require("express");
// const app = express();

// app.use(function(request, response, next){    
//     console.log("Middleware 1");
//     next();
// });
// app.use(function(request, response, next){
//     console.log("Middleware 2");
//     next();
// });
// app.get("/", function(request, response){
//     console.log("Route /");
//     response.send("Hello");
// });
// app.listen(3000);
// -----------------------------------------------------------------------------------------------------
// const express = require("express");
// const app = express();
// app.use(function(request, response, next){
//     console.log("Middleware 1");
//     next();
// });
// app.use(function(request, response, next){
//     console.log("Middleware 2");
//     response.send("Middleware 2");
//     //next(); // если раскомментировать будет ошибка при запросе т.к. нельзя отправлять больше 1 раза response
// });
// app.get("/", function(request, response){
//     console.log("Route /");
//     response.send("Hello");
// });
// app.listen(3000);
// -----------------------------------------------------------------------------------------------------
// const express = require("express");
// const app = express();
// app.use(function(request, response, next){
//     console.log("Middleware 1");
//     next();
// });
// app.use("/about", function(request, response, next){
//     console.log("About Middleware");
//     response.send("About Middleware");
// });
 
// app.get("/", function(request, response){
//     console.log("Route /");
//     response.send("Hello");
// });
// app.listen(3000);
// -----------------------------------------------------------------------------------------------------
// Middleware помогают выполнять некоторые задачи, которые должны быть сделаны до отправки ответа. Стандартная задача - логгирование запросов.
// const express = require("express");
// const fs = require("fs");
 
// const app = express();
// app.use(function(request, response, next){
//     let now = new Date();
//     let hour = now.getHours();
//     let minutes = now.getMinutes();
//     let seconds = now.getSeconds();
//     let data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
//     console.log(data);
//     fs.appendFile("server.log", data + "\n", function(){}); // запись в файл server.log
//     next();
// });
 
// app.get("/", function(request, response){
//     response.send("Hello");
// });
// app.listen(3000);