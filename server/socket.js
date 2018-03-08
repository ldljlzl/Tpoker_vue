const Message=require('./model/message')
const myEmitter=require('./emitter')

const perflop=require('./perflop')

function socket(io,playerList){
    myEmitter.on('Perflop',(data)=>{
        console.log('emit Perflop')
        let personnalPoker=data.personnalPoker
        playerList.map((userinfo)=>{
            let seatNum=userinfo.seatNum
            let socketId=userinfo.socketId
            let bottomPokers=personnalPoker.filter((elem)=>{
                return elem.seatNum===seatNum
            })[0].bottomPokers
            if(io.sockets.connected[socketId]){
                io.sockets.connected[socketId].emit('bottomPokers',bottomPokers)
                perflop(playerList,io)
            }
        })
    })
    io.on('connection',function(socketIo){
        console.log('connection')   
        socketIo.on('sendSeatNum',(data)=>{
            let userinfo= {
                socketId:socketIo.id,
                seatNum:data.seatNum,
                socketIo:socketIo,
                betNum:0
            }
            if(playerList.length!==0){
                let existFlag=true
                playerList.forEach((elem)=>{
                    if(elem.seatNum===userinfo.seatNum){
                        existFlag=false
                        elem.socketId=userinfo.socketId
                    }
                })
                if(existFlag){
                    playerList.push(userinfo)
                }
            }else{
                playerList.push(userinfo)
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