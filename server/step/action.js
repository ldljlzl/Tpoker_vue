//玩家行动函数
const myEmitter=require('../emitter')

let callFlag=false
let checkNum=0

function action(playerList,arr,_index,lastBet,smallBlindPosition,finalPlayers,foldPlayers,io){
    //playerList：玩家列表，包含socketId、seatNum、socketIo、betNum
    //arr：发牌的座位号次序
    //_index：行动玩家编号
    //lastBet：上一名玩家押注
    //smallBlindPosition：小盲注座位号
    //foldFlag：是否允许fold
    //finalPlayers：进入最终比牌的玩家
    //io

    //如果arr[_index]未定义，说明一轮结束
    console.log('action')

    if(playerList.length===0){
        console.log(playerList)
        myEmitter.emit('next',{lastBet:lastBet})
        return
    }

    if((arr[_index])||(arr[_index]===0)){
    // if((arr[_index]>=0)&&(arr[_index]<=5)){  
        let playerIndex,socketIo,seatNum
        //找到当前说话的玩家信息
        playerList.forEach(function(elem){
            if(elem.seatNum===arr[_index]){
                console.log('emit action')
                let actionOverFlag=false
                playerIndex=_index
                socketIo=elem.socketIo
                seatNum=elem.seatNum
                io.sockets.connected[elem.socketId].emit('action',{
                    smallBlindPosition:smallBlindPosition,
                    lastBet:lastBet
                })
                io.sockets.emit('actionFlag',{seatNum:seatNum})
            }
        })
                //超过12s直接进入下一名玩家行动
        let timer=setInterval(function(){
            if(!actionOverFlag){
                console.log('超过时间限制，踢出游戏')
                clearInterval(timer)
                console.log(seatNum+'号弃牌')
                arr.splice(playerIndex,1)
                let foldPlayer=playerList.splice(playerIndex,1)[0]
                foldPlayers.push(foldPlayer)
                io.sockets.emit('sendPlayerActionInfo',{seatNum:seatNum,num:data.num,status:2})
                action(playerList,arr,playerIndex,data.num,smallBlindPosition,finalPlayers,foldPlayers,io)
            }else{
                clearInterval(timer)
            }
        },23000)
        
        socketIo.on('actionOver',(data)=>{
            //status=0为自动押注，status=1为跟注或加注，status=2为弃牌，status=3为让牌，status=4为AllIn
            io.sockets.emit('sendPlayerActionInfo',{seatNum:seatNum,num:data.num,status:data.status})
            clearInterval(timer)
            socketIo.removeAllListeners('actionOver');
            actionOverFlag=true
            if(data.status===0){
                console.log(seatNum+'号自动押注')
                console.log(seatNum+'号下注额为'+data.num)
                let tempIndex=playerIndex+1
                callFlag=true
                playerList[playerIndex].betNum=data.num
                action(playerList,arr,tempIndex,data.num,smallBlindPosition,finalPlayers,foldPlayers,io)
            }else if(data.status===1){
                console.log(seatNum+'号跟注或加注')
                console.log(seatNum+'号下注额为'+data.num)
                if(playerList.length===1){
                    playerList[playerIndex].betNum=data.num
                    arr.splice(playerIndex,1)
                    let finalPlayer=playerList.splice(playerIndex,1)[0]
                    finalPlayers.push(finalPlayer)
                    action(playerList,arr,playerIndex,data.num,smallBlindPosition,finalPlayers,foldPlayers,io)
                }else{
                    callFlag=true
                    playerList[playerIndex].betNum=data.num
                    let tempIndex=playerIndex+1
                    action(playerList,arr,tempIndex,data.num,smallBlindPosition,finalPlayers,foldPlayers,io)
                }
                    
            }else if(data.status===2){
                console.log(seatNum+'号弃牌')
                console.log(seatNum+'号下注额为'+playerList[playerIndex].betNum)
                arr.splice(playerIndex,1)
                let foldPlayer=playerList.splice(playerIndex,1)[0]
                foldPlayers.push(foldPlayer)
                action(playerList,arr,playerIndex,data.num,smallBlindPosition,finalPlayers,foldPlayers,io)
            }else if(data.status===3){
                console.log(seatNum+'号让牌')
                console.log(seatNum+'号下注额为'+data.num)
                checkNum+=1
                let tempIndex=playerIndex+1
                action(playerList,arr,tempIndex,data.num,smallBlindPosition,finalPlayers,foldPlayers,io)
            }else if(data.status===4){
                console.log(seatNum+'号allIn')
                console.log(seatNum+'号下注额为'+data.bet)
                callFlag=true
                playerList[playerIndex].betNum=data.bet
                arr.splice(playerIndex,1)
                let finalPlayer=playerList.splice(playerIndex,1)[0]
                finalPlayers.push(finalPlayer)
                action(playerList,arr,playerIndex,data.num,smallBlindPosition,finalPlayers,foldPlayers,io)
            }else{
                console.log(seatNum+'号actionOver返回data错误')
                return
            }
        })
    }else{
        //如果arr遍历完，进行下一轮询问（不一定进入Flop）
        if(checkNum===playerList.length){
            //如果所有玩家都让牌
            callFlag=false
            checkNum=0
            console.log('所有玩家都让牌:'+lastBet)
            myEmitter.emit('next',{lastBet:lastBet})
        }else if(callFlag){
            //如果有人跟注或加注，进入下一轮
            console.log('有人跟注或加注或AllIn')
            callFlag=false
            checkNum=0
            action(playerList,arr,0,lastBet,6,finalPlayers,foldPlayers,io) 
        }else{
            console.log('action出现了问题')
        }
        
    }
        
}

module.exports=action