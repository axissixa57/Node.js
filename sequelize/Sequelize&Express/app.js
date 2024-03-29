const Sequelize = require("sequelize");
const express = require("express");
// const bodyParser = require("body-parser");

const app = express();
const urlencodedParser = express.urlencoded({ extended: false }); // bodyParser.urlencoded({ extended: false });

// определяем объект Sequelize
const sequelize = new Sequelize("usersdb", "root", "1234567", {
    dialect: "mysql",
    host: "localhost",
    define: {
        timestamps: false // не создавать поля по умолчанию createAt, updateAt
    }
});

// определяем модель User. В БД будет users
const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

app.set("view engine", "hbs");

// синхронизация с бд, после успшной синхронизации запускаем сервер
sequelize.sync({force:true}).then(() => { // {force:true} - если в бд есть модель и она отличная от созданной модели, то она заменит её
    console.log("Tables have been created");
    app.listen(3000, function () {
        console.log("Сервер ожидает подключения...");
    });
}).catch(err => console.log(err));

// получение данных
app.get("/", function (req, res) {
    User.findAll({ raw: true }).then(data => { // { raw: true } - возратит данные без метаданных таблицы
        res.render("index.hbs", {
            users: data
        });
    }).catch(err => console.log(err));
});

app.get("/create", function (req, res) {
    res.render("create.hbs");
});

// добавление данных
app.post("/create", urlencodedParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);

    const username = req.body.name;
    const userage = req.body.age;
    User.create({ name: username, age: userage }).then(() => {
        res.redirect("/");
    }).catch(err => console.log(err));
});

// получаем объект по id для редактирования
app.get("/edit/:id", function (req, res) {
    const userid = req.params.id;
    User.findAll({ where: { id: userid }, raw: true })
        .then(data => {
            res.render("edit.hbs", {
                user: data[0]
            });
        })
        .catch(err => console.log(err));
});

// обновление данных в БД
app.post("/edit", urlencodedParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);

    const username = req.body.name;
    const userage = req.body.age;
    const userid = req.body.id;
    User.update({ name: username, age: userage }, { where: { id: userid } }).then(() => {
        res.redirect("/");
    })
        .catch(err => console.log(err));
});

// удаление данных
app.post("/delete/:id", function (req, res) {
    const userid = req.params.id;
    User.destroy({ where: { id: userid } }).then(() => {
        res.redirect("/");
    }).catch(err => console.log(err));
});