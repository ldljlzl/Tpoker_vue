const Message=require('./model/message')
const myEmitter=require('./emitter')
const Player=require('./model/player')



function socket(io,playerList,finalPlayers){
    myEmitter.on('sendPersonnalPoker',(data)=>{
        console.log('emit sendPersonnalPoker')
        let personnalPokerTemp=data.personnalPoker
        myEmitter.emit('sendPP',{personnalPoker:personnalPokerTemp})
        playerList.map((userinfo)=>{
            let seatNum=userinfo.seatNum
            let socketId=userinfo.socketId
            let bottomPokers=personnalPokerTemp.filter((elem)=>{
                return elem.seatNum===seatNum
            })[0].bottomPokers
            if(io.sockets.connected[socketId]){
                io.sockets.connected[socketId].emit('bottomPokers',bottomPokers)
            }
        })
    })
    myEmitter.on("getPlayers",()=>{
        io.sockets.emit("getPlayers")
    })
    myEmitter.on("sendMyInfo",(seatNum)=>{
        console.log('sendMyInfo')
        Player.findOne({seatNum:seatNum},(err,res)=>{
            if(err){
                console.log(err)
            }else{
                let playerInfo=res
                let socketId=''
                playerList.forEach((elem)=>{
                    if(elem.seatNum===seatNum){
                        socketId=elem.socketId
                    }
                })
                if(playerInfo){
                    console.log('如果该玩家还在')
                    io.sockets.connected[socketId].broadcast.emit('sendPlayerInfo',playerInfo)
                }else{
                    console.log('如果该玩家不在')
                    io.sockets.emit('sendPlayerInfo',{seatNum:seatNum})
                }
            }

        })
    })

    io.on('connection',function(socketIo){
        console.log('connection')
        socketIo.on('addPlayer',(data)=>{
            let userinfo= {
                socketId:socketIo.id,
                seatNum:data.seatNum,
                socketIo:socketIo,
                betNum:0,
                username:data.username
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
            myEmitter.emit('sendMyInfo',data.seatNum)

        })

        
        socketIo.on('takingAction',(data)=>{
            let seatNum=data.seatNum
            socketIo.broadcast.emit('actionFlag',{
                seatNum:seatNum,
            })
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