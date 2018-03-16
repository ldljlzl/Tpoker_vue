const BlindsPosition=require('../model/blindsPosition')
const Player=require('../model/player')
const myEmitter=require('../emitter')

const action=require('./action')



//Perflop押注环节
function perflop(playerList,io,finalPlayers,foldPlayers){
    console.log('perflop押注');

    
    (function(io){
        let p=new Promise((resolve)=>{
            //找到这局的大小盲位
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
                    //找出所有参与这局的玩家，顺时针确定action顺序，其中小盲位第一个
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
                            myEmitter.emit('sendPositionInfo',{
                                //玩家座位号顺序
                                arr:arr,
                            })
                            action(playerList,arr,0,10,smallBlindPosition,finalPlayers,foldPlayers,data.io)
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