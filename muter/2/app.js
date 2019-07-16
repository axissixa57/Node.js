const express = require("express");
const multer = require("multer");

const app = express();

// Для настройки сохранения файлов применяется функция multer.diskStorage()
const storageConfig = multer.diskStorage({
    // destination: определяет место для сохранения загруженных файлов - в данном случае папка "uploads".
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    // filename: определяет имя для загруженных файлов - в данном случае это непосредственно имя загруженного файла - file.originalname. 
    // Хотя здесь при необходимости можно использовать другие методы, например, добавить к имени файла текущую дату
    filename: (req, file, cb) => {
        cb(null, file.originalname + "-" + Date.now());
    }
    // Оба параметра получаю объект запроса req, из которого при необходимости мы можем получить какие-то другие данные запроса и использовать их при сохранении файла.
});

// определение фильтра по типу файла
/* С помощью значения file.mimetype мы можем проверить MIME-тип файла. 
Далее вызывается функция cb(). Если MIME-тип подходит, то есть мы хотим сохранить данный файл, 
то в качестве второго параметра в функцию cb передается true. 
Если же мы хотим отклонить файл, то передается значение false. */
const fileFilter = (req, file, cb) => {

    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        // Когда выполняется вызов cb(null, false), то при получении mutler не устанавливает значение req.file, то есть фактически оно равно undefined
        // т.о. можно обработать в условии !filedata
        cb(null, false);
    }
}

app.use(express.static(__dirname));

app.use(multer({ storage: storageConfig, fileFilter: fileFilter }).single("filedata"));
app.post("/upload", function (req, res, next) {

    let filedata = req.file;
    if (!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
});
app.listen(3000, () => { console.log("Server started"); });