var assert = require("assert");
var operations = require("./operations");
 
describe("Operation Tests", function(){
    it("should multiply two numbers", function(){
         
        var expected = 15;
        var result = operations.multiply(3, 5);
        assert.equal(result, expected);
    });
    it("should add two numbers", function(){
         
        var expected = 16;
        var result = operations.add(9, 7);
        assert.equal(result, expected);
    });
});

// В процессе разработки у нас может быть множество модулей, и для каждого может быть определено несколько тестов. С помощью метода describe(), который определен в mocha.js, можно оформить тесты в связанные группы. Например, тесты по одному модулю будут составлять одну группу, а тесты другого модуля будут оформлять соответственно другую группу. Разбиение на группы позволит легко идентифицировать, для какого модуля или группы не прошел тест, особенно если тестов очень много.