const express = require("express");
const multer  = require("multer");
  
const app = express();
  
app.use(express.static(__dirname));
// в функцию multer передается объект, в котором параметр dest указывает на путь, по которому будет загружаться файл.
// В данном случае это папка uploads.
// Если внутри проекта такой папки нет, то она автоматически будет создана.
// функция single() указывает, что загружаться будет один файл
// В этот метод передается название поля, который исспользуется на форме для загрузки файлa
app.use(multer({dest:"uploads"}).single("filedata"));
app.post("/upload", function (req, res, next) {
   
    let filedata = req.file;
    console.log(filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
});
app.listen(3000);

// Также нам необязательно встраивать mutler глобально в конвейер обработки запросов в виде компонента middleware. 
// Вместо этого мы можем определить использование mutler только для отдельных функций обработки запросов. Например:
/* const express = require("express");
const multer  = require("multer");
  
const app = express();
 
const upload = multer({dest:"uploads"});
app.use(express.static(__dirname));
 
app.post("/upload", upload.single("filedata"), function (req, res, next) {
   
    let filedata = req.file;
 
    console.log(filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
});
app.listen(3000); */