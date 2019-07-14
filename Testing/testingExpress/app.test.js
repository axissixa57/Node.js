const request = require("supertest"); // Для тестирования получаем модули supertest
const assert = require("assert");
 
var app = require("./app").app;
 
it("should return Hello Test", function(done){
    // Для настройки и выполнения теста в request передается функционал приложения: request(app)
    request(app)
        .get("/") // устанавливаем маршрут, по которому будем обращаться в приложении
        .expect("Hello Test") // Устанавливаем ожидаемый результат через метод expect
        .end(done); // с помощью метода end() выполняем тест
});

it("should return NotFound with status 404", function(done){
     
    request(app)
        .get("/error")
        .expect(404) // Если нам надо проверить статусный код, то также можем передать ожидаемый код статуса в метод expect(404)
        .expect("NotFound")
        .end(done);
});
 
it("should return user with name Tom and age 22", function(done){
     
    request(app)
        .get("/user")
        .expect(function(response){
            assert.deepEqual(response.body, {name:"Tom", age:22});
        })
        .end(done);
});
// Если необходимо проверить какие-то комплексные объекты, которые отправляются в ответе клиенту, то в метод expect передается функция, в которую в качестве параметра передается объект ответа response. А через объект response.body можно получить весь ответ и сравнить его с ожидаемым значением. Для сравнения комплексных объектов можно применить метод deepEqual() или deepStrictEqual() библиотеки assert