const express=require('express')
const path=require('path')
const fs = require('fs')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')


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

app.listen(8088);
console.log('success listen8088…………');
// http://blog.csdn.net/qq_26598303/article/details/53468399
// https://github.com/FatDong1/vue-blog
// https://www.cnblogs.com/axl234/p/5899137.html
// http://blog.csdn.net/MRblackLu/article/details/56286077