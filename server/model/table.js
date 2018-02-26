const mongoose=require('mongoose')

let TableSchema= new mongoose.Schema({
    username:String,
    score:Number
})

module.exports=mongoose.model('Table',TableSchema)