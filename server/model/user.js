const mongoose=require('mongoose')



let UserSchema= new mongoose.Schema({
    account:String,
    password:String,
    isAdmin:{
        type:Boolean,
        default:false
    },
    score:{
        type:Number,
        default:500
    }
})

module.exports=mongoose.model('User',UserSchema)