const BlindsPosition=require('./model/blindsPosition')
const Player=require('./model/player')
const Flop=require('./flop')
let callFlag=false
let checkNum=0

function action(playerList,arr,_index,lastBet,smallBlindPosition,foldFlag,finalPlayers,io){
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
    console.log('arr:'+arr)
    console.log('_index:'+_index)
    if((arr[_index])||(arr[_index]===0)){
    // if((arr[_index]>=0)&&(arr[_index]<=5)){    
        let playerIndex,socketIo,betNum
        //找到当前说话的玩家信息
        playerList.forEach(function(elem,index){
            if(elem.seatNum===arr[_index]){
                let actionOverFlag=false
                playerIndex=index
                socketIo=elem.socketIo
                betNum=elem.betNum
                io.sockets.connected[elem.socketId].emit('action',{
                    smallBlindPosition:smallBlindPosition,
                    lastBet:lastBet,
                    foldFlag:foldFlag
                })
            }
        })
                //超过12s直接进入下一名玩家行动
        let timer=setInterval(function(){
            if(!actionOverFlag){
                console.log('超过时间限制，踢出游戏')
                clearInterval(timer)
                arr.splice(_index,1)
                playerList.splice(playerIndex,1)
                action(playerList,arr,_index,lastBet,smallBlindPosition,foldFlag,finalPlayers,io)
            }else{
                clearInterval(timer)
            }
        },12000)
        socketIo.on('actionOver',(data)=>{
            //status=0为自动押注，status=1为跟注或加注，status=2为弃牌，status=3为让牌，status=4为AllIn
            console.log('actionOver数据:'+data)
            clearInterval(timer)
            console.log('data.status:'+data.status)
            actionOverFlag=true
            if(data.status===0){
                console.log('自动押注')
                let tempIndex=_index+1
                callFlag=true
                betNum+=data.num
                action(playerList,arr,tempIndex,data.num,smallBlindPosition,foldFlag,finalPlayers,io)
            }else if(data.status===1){
                callFlag=true
                betNum+=data.num
                let tempIndex=_index+1
                action(playerList,arr,tempIndex,data.num,smallBlindPosition,true,finalPlayers,io)
            }else if(data.status===2){
                arr.splice(_index,1)
                playerList.splice(playerIndex,1)
                action(playerList,arr,_index,data.num,smallBlindPosition,foldFlag,finalPlayers,io)
            }else if(data.status===3){
                checkNum+=1
                let tempIndex=_index+1
                action(playerList,arr,tempIndex,data.num,smallBlindPosition,foldFlag,finalPlayers,io)
            }else if(data.status===4){
                arr.splice(_index,1)
                let finalPlayer=playerList.splice(playerIndex,1)
                finalPlayers.push(finalPlayer)
            }else{
                console.log('actionOver返回data错误')
                return
            }
        })
    }else{
        //如果arr遍历完，进行下一轮询问（不一定进入Flop）
        if(checkNum===playerList.length){
            //如果所有玩家都让牌
            Flop()
        }else if(callFlag){
            //如果有人跟注或加注，进入下一轮
            action(playerList,arr,0,lastBet,6,true,finalPlayers,io)
        }else{
            console.log('action出现了问题')
        }
        
    }
        
}


//Perflop押注环节
function perflop(playerList,io,finalPlayers){
    console.log('perflop押注');
    (function(io){
        let p=new Promise((resolve)=>{
            BlindsPosition.findOne({},(err,res)=>{
                if(err){
                    console.log("Error:" + err)
                }else{
                    if(res){
                        resolve({
                            smallBlindPosition:res.smallBlindPosition,
                            bigBlindPosition:res.bigBlindPosition,
                            io:io
                        })
                    }else{
                        console.log('BlindsPosition初始化错误')
                    } 
                }
            })                
        })
        return p
    })(io)
    .then((data)=>{
        return (function(data){
            let p=new Promise((resolve)=>{
                Player.find({readyFlag:true},(err,res)=>{
                    if(err){
                        console.log("Error:" + err)
                    }else{
                        if(res.length>1){
                            let players=res
                            let smallBlindPosition=data.smallBlindPosition
                            let arr1=[]
                            let arr2=[]
                            players
                            .sort((player1,player2)=>{
                                return player1.seatNum-player2.seatNum
                            })
                            .forEach(function(element,index) {
                                if(element.seatNum<smallBlindPosition){
                                    arr1.push(element.seatNum)
                                }else if(element.seatNum>=smallBlindPosition){
                                    arr2.push(element.seatNum)
                                }
                            })
                            let arr=arr2.concat(arr1)
                            action(playerList,arr,0,10,smallBlindPosition,false,finalPlayers,data.io)
                        }else{
                            console.log('perflop押注错误')
                        } 
                    }
                })
            })
            return p
        })(data)
    })
}

module.exports=perflop