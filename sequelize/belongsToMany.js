const Sequelize = require("sequelize");
 
const sequelize = new Sequelize("univer", "root", "123456", {
    dialect: "mysql",
    host: "localhost",
    define: {
      timestamps: false
    }
});
 
const Student = sequelize.define("student", {
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
   
const Course = sequelize.define("course", {
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
 
// промежуточная сущность, которая связывает курс и студента
const Enrolment = sequelize.define("enrolment", { // с англ. яз. Enrollment - зачисление, поступление, регистрация, запись
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    grade: {                    // оценка студента по данному курсу
      type: Sequelize.INTEGER,
      allowNull: false
    }
});
// Непосредственно для создания связи многие-ко-многим применяется метод belongsToMany(). 
// Первый параметр метода - сущность, с которой надо установить связь. 
// Второй параметр - объект конфигурации связи, 
// который с помощью параметра through обязательно должен задавать промежуточную сущность, 
// через которую будут связаны обе основные сущности
Student.belongsToMany(Course, {through: Enrolment});
Course.belongsToMany(Student, {through: Enrolment});
 
 
sequelize.sync({force:true}).then(()=>{
 
    console.log("Tables have been created");
}).catch(err=>console.log(err));

/* CREATE TABLE IF NOT EXISTS `students` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS `courses` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS `enrolments` (`id` INTEGER NOT NULL auto_increment , `grade` INTEGER NOT NULL, `studentId` INTEGER, `courseId` INTEGER, 
UNIQUE `enrolments_courseId_studentId_unique` (`studentId`, `courseId`), PRIMARY KEY (`id`), FOREIGN KEY (`studentId`) REFERENCES `students` (`id`) 
ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) 
ENGINE=InnoDB; */

Course.create({ name: "JavaScript"});
Course.create({ name: "TypeScript"});
Course.create({ name: "Node.js"});
 
Student.create({ name: "Tom"});
Student.create({ name: "Bob"});
Student.create({ name: "Alice"});

// получаем пользователя с именем Tom
Student.findOne({where: {name: "Tom"}})
.then(student=>{
    if(!student) return;
     
    // добавим Тому курс по JavaScript
    Course.findOne({where: {name: "JavaScript"}})
        .then(course=>{
            if(!course) return;
            student.addCourse(course, {through:{grade:1}});
    });
});

// INSERT INTO `enrolments` (`id`,`grade`,`studentId`,`courseId`) VALUES (NULL,1,2,2);

// Для получения связанных данных у каждой из моделей, участвующих в связи, мы можем использовать метод getИМЯ_МОДЕЛИs(). Например, получим все курсы студента по имени Tom:
Student.findOne({where: {name: "Tom"}})
.then(student=>{
    if(!student) return;
    student.getCourses().then(courses=>{
        for(course of courses){
            console.log(course.name);
        }
    });
});

// SELECT `course`.`id`, `course`.`name`, `enrolment`.`id` AS `enrolment.id`, `enrolment`.`grade` AS `enrolment.grade`, `enrolment`.`studentId` AS `enrolment.studentId`, `enrolment`.`courseId` AS `enrolment.courseId` FROM `courses` AS `course` INNER JOIN `enrolments` AS `enrolment` ON `course`.`id` = `enrolment`.`courseId` AND `enrolment`.`studentId` = 2;

// То есть в данном случае мы сможем получить название и id курса, а также id и значение grade объекта Enrolment:
Student.findOne({where: {name: "Tom"}})
.then(student=>{
    if(!student) return;
    student.getCourses().then(courses=>{
        for(course of courses){
            console.log("course:", course.name, "grade:", course.enrolment.grade);
        }
    });
});

// Для удаления связанных данных необходимо получить объект из промежуточной таблицы и удалить его. Например, удалим у студента по имени Tom курс JavaScript:
// Student.findOne({where: {name: "Tom"}})
// .then(student=>{
//     if(!student) return;
//     student.getCourses().then(courses=>{
//         for(course of courses){
//             if(course.name==="JavaScript") course.enrolment.destroy();
//         }
//     });
// });