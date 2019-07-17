const Sequelize = require("sequelize");

const sequelize = new Sequelize("game", "root", "123456", {
    dialect: "mysql",
    host: "localhost",
    define: {
        timestamps: false
    }
});
const Coach = sequelize.define("coach", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
const Team = sequelize.define("team", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Coach.hasOne(Team, { onDelete: "cascade" });

sequelize.sync({ force: true }).then(() => {

    console.log("Tables have been created");
}).catch(err => console.log(err));

// CREATE TABLE `coaches` (
//     `id` int(11) NOT NULL AUTO_INCREMENT,
//     `name` varchar(255) NOT NULL,
//     PRIMARY KEY (`id`)
//   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
   
//   CREATE TABLE `teams` (
//     `id` int(11) NOT NULL AUTO_INCREMENT,
//     `name` varchar(255) NOT NULL,
//     `coachId` int(11) DEFAULT NULL,
//     PRIMARY KEY (`id`),
//     KEY `coachId` (`coachId`),
//     CONSTRAINT `teams_ibfk_1` FOREIGN KEY (`coachId`) REFERENCES `coaches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
//   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

// Для установки связанных данных применяется метод setНАЗВАНИЕ_МОДЕЛИ(). Например, добавим тренера и его команду:
// добавляем тренера
Coach.create({ name: "Tom Smith"})
.then(coach=>{
    // Добавляем команду
    Team.create({name:"Real Madrid"}).then(team=>{
        // устанавливаем для тренера команду
        coach.setTeam(team).catch(err=>console.log(err));
    });
}).catch(err=>console.log(err));
// По факту метод setМОДЕЛЬ() будет вызывать SQL-команду UPDATE. То есть к моменту вызова данного метода связываемые сущности уже должны быть в базе данных.

// Для получения связанных данных применяется метод getНАЗВАНИЕ_МОДЕЛИ(). Например, получим тренера и его команду:
// получаем тренера с id=1
Coach.findByPk(1).then(coach=>{
    if(!coach) return console.log("Coach not found");
    coach.getTeam().then(team=>{
        console.log(coach.name, "-", team.name);
    });
});

// Получение всех тренеров с включением связанных данных:
Coach.findAll({
    attributes: ["name"], // включаем столбец name из таблицы coaches
    include: [{
      model: Team,
      attributes: ["name"]  // включаем столбец name из таблицы teams
    }]
  }).then(coaches => {
      for(coach of coaches){
        console.log(coach.name, "-", coach.team.name);
      }
});