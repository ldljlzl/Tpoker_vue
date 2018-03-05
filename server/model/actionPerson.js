const mongoose=require('mongoose')

let ActionPersonSchema= new mongoose.Schema({
    actionPosition:Number
})

module.exports=mongoose.model('ActionPerson',ActionPersonSchema)