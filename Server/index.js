var express = require('express')
var serveIndex = require('serve-index')
var serveStatic = require('serve-static')
var multiparty = require('multiparty')
var util = require('util')

var LOCAL_BIND_PORT = 3000
var app = express()

// app.post('/upload', function(req, res) {
//   var form = new multiparty.Form()
//   form.encoding = 'utf-8'
//   form.uploadDir = './htdocs/upfile'
//   form.maxFilesSize = 4 * 1024 * 1024
//   form.parse(req, function(err, fields, files) {
//     if(err) {
//       console.log('parse error: ' + err)
//     } else {
//       console.log('parse files: ' + JSON.stringify(files))
//     }
//     res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'})
//     res.write('received upload')
//     res.end()
//   })
// })

// var serve = serveStatic('./htdocs')
// app.use('/', serveIndex('./htdocs', {'icons': true}))

var serve = serveStatic('./audio')
app.use('/', serveIndex('./audio', {'icons': true}))

app.get('/*', function(req, res) {
    serve(req, res)
});

console.log(`Start static file server at ::${LOCAL_BIND_PORT}, Press ^ + C to exit`)
app.listen(LOCAL_BIND_PORT)




// npm install express --save
// npm install ejs --save

var fs = require('fs');
var express = require("express");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());



//get请求新闻信息
app.get('/api/metaverse/news',function (req,res) {
    console.log(req.query);
	fs.readFile('news.json', 'utf-8', function (err, data) {
	    if (err) {
	        console.log(err);
	    } else {
            res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});
	        //res.end(data);
	        res.end(data);
	    }
	});
});

//get请求用途信息
app.get('/api/metaverse/use',function (req,res) {
  console.log(req.query);
fs.readFile('use.json', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
          res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});
        //res.end(data);
        res.end(data);
    }
});
});

//get请求本源信息
app.get('/api/metaverse/intro',function (req,res) {
  console.log(req.query);
fs.readFile('intro.json', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
          res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});
        //res.end(data);
        res.end(data);
    }
});
});









app.listen(3001);    



/*

//模板引擎
app.set("view engine","ejs");

app.get("/",function(req,res){
     res.render("form");
});
/*
//bodyParser API
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/",function(req,res){
    console.log(req.body);
});

*/



// var sd = require('silly-datetime');
// var http = require('http')
// var WebSocketServer = require('websocket').server

// const httpServer = http.createServer((request, response) => {
//   console.log('[' + new Date + '] Received request for ' + request.url)
//   response.writeHead(404)
//   response.end()
// })

// const wsServer = new WebSocketServer({
//   httpServer,
//   autoAcceptConnections: true
// })

// wsServer.on('connect', (connection) => {
//   connection.on('message', (message) => {
//     console.log('>>message ', message);
//     if (message.type === 'utf8') {
//       var data = {'content': '自动回复', 'date': sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')}
//       // 服务器返回的信息
//       connection.sendUTF( JSON.stringify(data) )
//     }
//   });
//   // 连接的关闭监听
//   connection.on('close', (reasonCode, description) => {
//     console.log('[' + new Date() + '] Peer ' + connection.remoteAddress + ' disconnected.')
//   })
//   // 接收控制台的输入
//   process.stdin.on('data', function(data){
//     data = data.toString().trim()
//     var data = {'content': data, 'date': sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')}
//     connection.sendUTF( JSON.stringify(data) )
//   })
// })

// httpServer.listen(3002, () => {
//   console.log('[' + sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss') + ']  server is listening on port 3000')
// })
