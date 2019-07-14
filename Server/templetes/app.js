const http = require("http");
const fs = require("fs");
 
http.createServer(function(request, response){
     
    fs.readFile("public/index.html", "utf8", function(error, data){
                 
        let message = "Изучаем Node.js"; 
        let header = "Главная страница";
        data = data.replace("{header}", header).replace("{message}", message); // в data содержится весь документ index.html
        response.end(data);
    })
}).listen(3000);