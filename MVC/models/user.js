// const users = []; // что будет храниться [ User { name: 'Евгений', age: '25' }, User { name: 'Дмитрий', age: '24' }, ... ]
// const users = [
//     { id: 1, login: 'Alex', email: 'alex@gmail.com', password: 'secret' },
//     { id: 2, login: 'Max', email: 'max@gmail.com', password: 'secret' },
//     { id: 3, login: 'Hagard', email: 'hagard@gmail.com', password: 'secret' }
// ];

// class User {
//     constructor(login, password) {
//         this.login = name;
//         this.password = age;
//     }
//     save() {
//         users.push(this); // this - это например, User { name: 'Евгений', age: '25' }
//     }
//     static getOne(login, password) {
//         return users.find(
//             user => user.login === login && user.password === password // TODO: hash
//         )
//     }
//     static findById(userId) {
//         return users.find(user => user.id === userId)
//     }
//     static getAll() {
//         console.log(users);
//         return users;
//     }
// }

// =================================================================

const mongoose = require("mongoose");
 
const Schema = mongoose.Schema;
// установка схемы
const userScheme = new Schema({
    name: String,
    age: Number
});
module.exports = mongoose.model("User", userScheme); // в бд будет коллекция users