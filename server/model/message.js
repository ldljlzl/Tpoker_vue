const mongoose=require('mongoose')

let MessageSchema= new mongoose.Schema({
    username:String,
    msg:String,
})

module.exports=mongoose.model('Message',MessageSchema)