const mongoose=require('mongoose')

let PlayerSchema= new mongoose.Schema({
    username:String,
    score:Number,
    seatNum:Number
})

module.exports=mongoose.model('Player',PlayerSchema)