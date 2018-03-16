const socket=require('./socket')
const myEmitter=require('./emitter')

const perflop=require('./step/perflop')
const flop=require('./step/flop')
const turn=require('./step/turn')
const river=require('./step/river')
const judge=require('./step/judge')

const BlindsPosition=require('./model/blindsPosition')

function gameServer(io){
    let foldPlayers=[]  //弃牌玩家
    let playerList=[] //玩家列表
    let finalPlayers=[]     //进入最后比牌的玩家
    // 两者数据结构为
    // {
    //     socketId:socketIo.id,
    //     seatNum:data.seatNum,
    //     socketIo:socketIo,
    //     betNum:0,
    //     username:data.username
    // }


    let personnalPoker=[]   //个人的手牌
    // 数据结构为
    // {
    //     seatNum:players[i].seatNum,
    //     bottomPokers:pokerArr.splice(0,2)
    // }

    let pokerArr=[]     //剩余的扑克牌
    let publicPoker=[]      //公共牌
    let playersPosition=[]  //玩家座位号顺序
    let index=0

    //socket事件
    socket(io,playerList,finalPlayers)

    //存储玩家座位号顺序
    myEmitter.on("sendPositionInfo",(data)=>{
        playersPosition=data.arr
    })
    //存储玩家手牌
    myEmitter.on("sendPP",(data)=>{
        personnalPoker=data.personnalPoker
    })


    //判断下一步到游戏哪一步
    //游戏过程perflop，flop，turn，river,judge（其中perflop在gameBegin已触发）
    myEmitter.on("next",(data)=>{
        console.log('next')
        let lastBet=data.lastBet
        index++
        if(index===1){
            myEmitter.emit('flop',lastBet)
        }else if(index===2){
            myEmitter.emit('turn',lastBet)
        }else if(index===3){
            myEmitter.emit('river',lastBet)
        }else if(index===4){
            myEmitter.emit('judge')
        }else{
            console.log('next事件出错')
        }
    })



    myEmitter.on("perflop",(data)=>{
        perflop(playerList,io,finalPlayers,foldPlayers)
        pokerArr=data.pokerArr
    })
    myEmitter.on("flop",(lastBet)=>{
        let arrPoker=pokerArr.splice(0,3)
        publicPoker=arrPoker
        flop(arrPoker,io,playersPosition,playerList,finalPlayers,foldPlayers,lastBet)
    })
    myEmitter.on("turn",(lastBet)=>{
        let arrPoker=pokerArr.splice(0,1)
        publicPoker.push(arrPoker[0])
        turn(arrPoker,io,playersPosition,playerList,finalPlayers,foldPlayers,lastBet)
    })
    myEmitter.on("river",(lastBet)=>{
        let arrPoker=pokerArr.splice(0,1)
        publicPoker.push(arrPoker[0])
        river(arrPoker,io,playersPosition,playerList,finalPlayers,foldPlayers,lastBet)
    })
    myEmitter.on("judge",()=>{
        let playersInfo=finalPlayers.concat(playerList)
        console.log('lllllllllllllllllllllll')
        console.log(personnalPoker)
        judge(io,foldPlayers,playersInfo,personnalPoker,publicPoker)
    })



    //从playerList中除去该玩家
    myEmitter.on("deleteSocket",(seatNum)=>{
        let _index
        playerList.forEach((elem,index)=>{
            if(elem.seatNum===seatNum){
                _index=index
            }
        })
        playerList.splice(_index,1)
        
    })



    //初始化大小盲位
    let blindsPosition=new BlindsPosition({
        smallBlindPosition:0,
        bigBlindPosition:1
    })

    BlindsPosition.findOne({},(err,res)=>{
        if(!res){
            blindsPosition.save(function(err,res){
                if(err){
                    console.log('初始化开始位置失败')
                }
                else{
                    console.log('初始化开始位置成功')
                }
            })
        }
    })

        
}

module.exports=gameServer        