var operations = require("./operations");
var assert = require("assert"); // чтобы упростить верификацию результатов в тестах для Node.js был создан специальный модуль - assert
// Для тестирования результата применяется функция it(), которая предоставляется фреймворком Mocha
it("should multiply two numbers", function(){  

    var expectedResult = 15;
    var result = operations.multiply(3, 5);
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});

it("should add two numbers", function(){
     
    var expectedResult = 16;
    var result = operations.add(9, 7);
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});

// Особенностью тестирования асинхронных функций является то, что чтобы они завершились до завершения теста, в тестирующую функцию передается функция done(). Причем при окончании тестирования нам надо вызвать эту функцию. Тем самым через подобную функцию Mocha сможет контролировать выполнение теста.
it("shoud async multiply two numbers", function(done){
     
    var expectedResult = 12;
    operations.multiplyAsync(4, 3, function(result){
        if(result!==expectedResult){
            throw new Error(`Expected ${expectedResult}, but got ${result}`);
        }
        done(); // Если мы не передадим функцию done в тест, тогда тест завершится раньше, чем завершится асинхронная функция.
    });
});

it("should multiply two numbers", function(){
     
    var expected = 15;
    var result = operations.multiply(3, 5);
    assert.equal(result, expected); // Функция assert.equal() сравнивает два значения. Если они не равны, то генерируется ошибка.
});

it("should multiply two numbers", function(){
     
    var expected = 15;
    var result = operations.multiply(3, 5);
    assert.notEqual(result, expected); // функция assert.notEqual() генерирует ошибку, если оба значения равны
});