// app.js код, который принимает отправленные данные с index.html
const express = require("express");
const app = express();
// создаем парсер для данных в формате json
const jsonParser = express.json();
  
app.post("/user", jsonParser, function (request, response) { // этот метод позволит получить данные из форма index.html
    if(!request.body) return response.sendStatus(400); // response.status(400).send('Bad request');
    console.log(request.body); // { userName: 'Ax1S', userAge: '25' }
    response.json(request.body); // отправит в index.html в консоль Google chrome: {"userName":"Ax1S","userAge":"25"}
});
  
app.get("/", function(request, response){
    response.sendFile(__dirname + "/index.html");
});
  
app.listen(3000);

// Прежде всего для получения данных в формате json необходимо создать парсер с помощью функции json: const jsonParser = express.json();
// И поскольку с клиентом мы взаимодействуем через формат json, то данные клиенту отправляются с помощью метода response.json():
// Для получения данных, как и в случае с формами, используются выражения типа request.body.userName, где request.body инкапсулирует данные формы, а userName - ключ данных.