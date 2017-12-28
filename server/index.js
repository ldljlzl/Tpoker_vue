const express=require('express')
const path=require('path')
// const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')


let app=express()


app.use('/public',express.static(__dirname+'/static'))
app.use(bodyParser.urlencoded({extended:false}))

//
app.use(cookieParser())


app.listen(8080);
console.log('success listen8080…………');
http://blog.csdn.net/qq_26598303/article/details/53468399
https://github.com/FatDong1/vue-blog
https://www.cnblogs.com/axl234/p/5899137.html
http://blog.csdn.net/MRblackLu/article/details/56286077