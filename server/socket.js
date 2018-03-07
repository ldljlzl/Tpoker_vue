const Message=require('./model/message')

const myEmitter=require('./emitter')

function socket(io,sockets){
    myEmitter.on('Perflop',(data)=>{
        console.log('emit Perflop')
        let personnalPoker=data.personnalPoker
        console.log(personnalPoker)
        sockets.map((userinfo)=>{
            let seatNum=userinfo.seatNum
            let socketId=userinfo.socketId
            let bottomPokers=personnalPoker.filter((elem)=>{
                return elem.seatNum===seatNum
            })[0].bottomPokers
            console.log('bottomPokers:'+bottomPokers)
            if(io.sockets.connected[socketId]){
                console.log(bottomPokers)
                io.sockets.connected[socketId].emit('bottomPokers',bottomPokers);
            }
        })
    })
    io.on('connection',function(socketIo){
        console.log('connection')   
        socketIo.on('sendSeatNum',(data)=>{
            let userinfo= {
                socketId:socketIo.id,
                seatNum:data.seatNum,
            }
            if(sockets.length!==0){
                let existFlag=true
                sockets.forEach((elem)=>{
                    if(elem.seatNum===userinfo.seatNum){
                        existFlag=false
                        elem.socketId=userinfo.socketId
                    }
                })
                if(existFlag){
                    sockets.push(userinfo)
                }
            }else{
                sockets.push(userinfo)
            }
                
            
        })
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