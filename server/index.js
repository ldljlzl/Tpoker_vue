const express=require('express')
const path=require('path')
const fs = require('fs')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')



const socket=require('./socket')
const myEmitter=require('./emitter')

const ActionPerson=require('./model/actionPerson')

let app=express()



// app.use('/public',express.static(__dirname+'/static'))
app.use(express.static(path.resolve(__dirname, '../dist')))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser())

mongoose.connect('mongodb://localhost:28017/tpoker',function(err){
    if(err){
        console.log('数据库连接失败')
    }
    else{
        console.log('mongodb连接成功')
    }
})


app.get('/', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
    res.send(html)
})

app.use('/api',require('./api'))

//socket.io官网若使用Express 3/4代码为
// var app = require('express')();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);

// server.listen(80);

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(3000);



console.log('success listen3000…………')




let sockets=[]

socket(io,sockets)



let actionPerson=new ActionPerson({
    actionPosition:0
})
actionPerson.save(function(err,res){
    if(err){
        console.log('初始化开始位置失败')
    }
    else{
        console.log('初始化开始位置成功')
    }
})

