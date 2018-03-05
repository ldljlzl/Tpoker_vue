const mongoose=require('mongoose')

let PlayerSchema= new mongoose.Schema({
    username:String,
    score:Number,
    seatNum:Number,
    readyFlag:Boolean
})

module.exports=mongoose.model('Player',PlayerSchema)