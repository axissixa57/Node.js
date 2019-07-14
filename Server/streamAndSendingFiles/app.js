const http = require("http");
const fs = require("fs");
 
http.createServer(function(request, response){
     
    if(request.url=="/some.docx"){
        response.writeHead(200, {"Content-Type" : "application/msword"});
        fs.createReadStream("some.docx").pipe(response);
    }
    else{
        response.end("hello world!");
    }
     
}).listen(3000);

// response.writeHead(200, {"Content-Type" : "application/msword"}); - отправляется статусный код "200" и указывается тип содержимоего (MIME-тип) "application/msword", то есть файл Microsoft Word. Если в данном случае мы обращаемся по адресу /some.docx, то отправляем пользователю данный файл. При отправке устанавливаем необходимые заголовки
// Метод fs.createReadStream("some.docx") создает поток для чтения - объект fs.ReadStream. Для получения данных из потока вызывается метод pipe(), в который передается объект интерфейса stream.Writable или поток для записи. А именно таким и является объект http.ServerResponse, который реализует этот интерфейс.