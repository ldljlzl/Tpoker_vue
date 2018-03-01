const Message=require('./model/message')

function socket(io){
    io.on('connection',function(socketIo){
        console.log('connection')
        socketIo.on('sendMessage',(clientMsg)=>{
            let username=clientMsg.username
            let msg=clientMsg.msg
            let message=new Message({
                username:username,
                msg:msg
            })
            message.save(function(err,res){
                if(err){
                    console.log('err:'+err)
                }else{
                    console.log('用户消息存入成功')
                    //广播除自己的所有人
                    socketIo.broadcast.emit('receiveMsgSuccess',{
                        username:username,
                        msg:msg
                    })
                }
            })
        })
    })

}



    

module.exports=socket