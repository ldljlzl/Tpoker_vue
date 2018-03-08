const mongoose=require('mongoose')

let BlindsPositionSchema= new mongoose.Schema({
    smallBlindPosition:Number,
    bigBlindPosition:Number
})

module.exports=mongoose.model('BlindsPosition',BlindsPositionSchema)