// Для получения данных форм из запроса необходимо использовать специальный пакет body-parser. Поэтому вначале добавим его в проект с помощью команды.
const express = require("express");
const bodyParser = require("body-parser"); // в последних версиях express, вместо этого пакета используется exress.jsonParser

const app = express();
// создаем парсер для данных application/x-www-form-urlencoded
// Поскольку данные отправляются с помощью формы, то для создания парсера применяется функция urlencoded(). 
// В эту функцию передается объект, устанавливающий параметры парсинга. 
// Значение extended: false указывает, что объект - результат парсинга будет представлять набор пар ключ-значение, а каждое значение может быть представлено в виде строки или массива.
const urlencodedParser = bodyParser.urlencoded({extended: false});
 
app.get("/register", urlencodedParser, function (request, response) {
    console.log(__dirname);
    response.sendFile(__dirname + "/register.html"); // __dirname - здесь находится путь от диска F:\node\POSTrequestsAndFormsSubmission
});
app.post("/register", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400); // отобразит на странице Bad Request
    //if (request.body.userName == '' || request.body.userAge == '') return response.status(400).send('Форма не заполнена');
    console.log(request.body); // [Object: null prototype] { userName: 'Ax1S', userAge: '24' }
    response.send(`${request.body.userName} - ${request.body.userAge}`);
});
  
app.get("/", function(request, response){
    response.send("Главная страница");
});
  
app.listen(3000);