const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
   
const app = express();
const jsonParser = express.json(); // парсит тело только тех запросов, для которых 'Content-Type' равен 'application/json'. Результат парсинга сохраняется в объекте req.body
 
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
 
let dbClient;
 
app.use(express.static(__dirname + "/public")); // __dirname позволяет получить полный путь к папке: F:\node\MongoDb\MongoDbAndExpress + \public, но засчёт express.static обратиться к файлам внутри паблик можно напрямую, например: http://localhost:3000/about.html. данный вызов помещается до всех остальных вызовов функции app.get()
 
mongoClient.connect(function(err, client){ // client - это сама mongodb
    if(err) return console.log(err);
    dbClient = client;
    // получаем ссылку на коллекцию в локальную переменную приложения app.locals.collection
    app.locals.collection = client.db("usersdb").collection("users"); // если нет бд usersdb - создаёт её и таким же образом коллекцию users
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});
 
app.get("/api/users", function(req, res){
        
    const collection = req.app.locals.collection;
    collection.find({}).toArray(function(err, users){
         
        if(err) return console.log(err);
        res.send(users)
    });
     
});
app.get("/api/users/:id", function(req, res){
        
    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    collection.findOne({_id: id}, function(err, user){
               
        if(err) return console.log(err);
        res.send(user);
    });
});

// Когда приходит POST-запрос, с помощью парсера jsonParser получаем отправленные данные и по ним создаем объект, который добавляем в базу данных посредством метода insertOne()
app.post("/api/users", jsonParser, function (req, res) {
       
    if(!req.body) return res.sendStatus(400);
       
    const userName = req.body.name;
    const userAge = req.body.age;
    const user = {name: userName, age: userAge};
       
    const collection = req.app.locals.collection;
    collection.insertOne(user, function(err, result){
               
        if(err) return console.log(err);
        res.send(user);
    });
});
    
app.delete("/api/users/:id", function(req, res){
        
    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    collection.findOneAndDelete({_id: id}, function(err, result){
               
        if(err) return console.log(err);    
        let user = result.value;
        res.send(user);
    });
});
   
app.put("/api/users", jsonParser, function(req, res){
        
    if(!req.body) return res.sendStatus(400);
    const id = new objectId(req.body.id);
    const userName = req.body.name;
    const userAge = req.body.age;
       
    const collection = req.app.locals.collection;
    collection.findOneAndUpdate({_id: id}, { $set: {age: userAge, name: userName}},
         {returnOriginal: false },function(err, result){
               
        if(err) return console.log(err);     
        const user = result.value;
        res.send(user);
    });
});
 
// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});

// Для каждого типа запросов здесь определен свой обработчик Express. И в каждом из обработчиков мы каждый раз обращаемся к базе данных. Чтобы не открывать и закрывать подключение каждый раз при каждом запросе, мы открываем подключение в самом начале и только после открытия подключения запускаем прослушивание входящих запросов
// Поскольку все взаимодействие будет идти с коллекцией users, то получаем ссылку на эту коллекцию в локальную переменную приложения app.locals.collection. Затем через эту переменную мы сможем получить доступ к коллекции в любом месте приложения.
// В конце работы скрипта мы можем закрыть подключение, сохраненное в переменную dbClient. В данном случае мы прослушиваем событие "SIGINT", которое генерируется при нажатии комбинации CTRL+C в консоли, что завершит выполнение скрипта.
// поскольку Express в качестве хранилища статических файлов использует папку public, то при обращении к приложению по корневому маршруту http://localhost:3000 клиент получит данный файл.