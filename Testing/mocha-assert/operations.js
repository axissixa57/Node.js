module.exports.multiply = function(x,y){return x * y;}
module.exports.add = function(x, y){ return x + y;}

// асинхронная функция
module.exports.multiplyAsync = function (a, b, callback){
    setTimeout(function(){
        callback(a * b);
    }, 1000)
}