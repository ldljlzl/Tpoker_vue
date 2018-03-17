const judgeLevel=require('../judgeLevel')
const User=require('../model/user')
const Player=require('../model/player')

function judge(io,foldPlayers,playersInfo,personnalPoker,publicPoker){
    console.log('judge')
    // console.log(publicPoker)
    //每个玩家手牌+公共牌构成的牌组信息
    let playersPoker=[]
    personnalPoker.forEach(function(elem) {
        playersPoker.push({
            seatNum:elem.seatNum,
            pokers:elem.bottomPokers.concat(publicPoker)
        })
    })

    //转化成具体牌型等级
    let playersLevel=[]
    playersPoker.forEach((elem)=>{
        let arr=[]
        elem.pokers.forEach((num)=>{
            arr.push({
                count:num%13,
                suit:parseInt(num/13)
            })
        })  
        let level=judgeLevel(arr)
        // console.log(level)
        playersLevel.push({
            seatNum:elem.seatNum,
            level:level
        })
    })

    // console.log('-------------------------------------')
    // console.log('foldPlayers:')
    // console.log(foldPlayers)

    playersLevel.sort((player1,player2)=>{
        if(player1.level.Level!==player2.level.Level){
            return player2.level.Level-player1.level.Level
        }else{
            let num1=player1.level.Num
            let num2=player2.level.Num
            if(num1.length===num2.length){
                for(let i=0;i<num1.length;i++){
                    if(num1[i]!==num2[i]){
                        return num2[i]-num1[i]
                    }
                }
            }else{
                console.log('牌型判定出了问题')
            }
        }
    })


    console.log('牌最大的是seatNum='+playersLevel[0].seatNum)
    console.log(playersLevel[0].level)
    console.log('牌次大的是seatNum='+playersLevel[1].seatNum)
    console.log(playersLevel[1].level)

    //按照牌型大小排序的玩家信息
    let players=[]
    let players_temp=[]
    for(let i=0;i<playersInfo.length;i++){
        playersInfo.forEach((elem)=>{
            if(elem.seatNum===playersLevel[i].seatNum){
                elem.score=0
                players.push(elem)
            }
        })
    }
    foldPlayers.forEach((elem)=>{
        elem.score=0
        players.push(elem)
    })

    console.log('-------------------------------------')
    console.log('players:')
    console.log(players)

    players_temp=players


    for(let i=0;i<players.length;i++){
        //向玩家发送输赢结果
        if(i===0){
            console.log('win')
            // console.log(players[i])
            io.sockets.connected[players[i].socketId].emit('win') 
        }else{
            console.log('lose')
            // console.log(players[i])
            io.sockets.connected[players[i].socketId].emit('lose') 
        }

        //计算筹码情况
        for(let j=i;j<players.length;j++){
            console.log('i:'+i)
            console.log('j:'+j)
            if(players[i].betNum>=players[j].betNum){
                console.log('大')
                players[i].score+=players[j].betNum
                if(i!==j){
                    players[j].betNum=0
                }
                
            }else{
                console.log('小')
                players[i].score+=players[i].betNum
                players[j].betNum-=players[i].betNum
            }
            console.log('players['+i+'].score:'+players[i].score)
        }
    } 



    let playerScore=[]
    players.forEach((elem,index)=>{
        playerScore.push({
            seatNum:elem.seatNum,
            //筹码增加或减少情况
            score:elem.score
            // score:elem.score-players_temp[index].betNum
        })
    })
    //向玩家发送筹码情况
    io.sockets.emit('renewScore',playerScore) 

    console.log('-------------------------------------')
    console.log('playerScore')
    console.log(playerScore)

    

    //更新用户，玩家两个数据库状态，向玩家发送筹码情况
    players.forEach((elem,index)=>{
        let username=elem.username
        User.findOne({account:username},(err,res)=>{
            if(err){
                console.log(err)
            }else{
                console.log('找到用户'+username)
                let score=res.score+elem.score-players_temp[index].betNum
                User.update({account:username},{score:score},(err,res)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log('更新用户'+username+'分数成功')
                    }
                })
            }
        })
        Player.findOne({username:username},(err,res)=>{
            if(err){
                console.log(err)
            }else{
                console.log('找到用户'+username)
                let score=res.score+elem.score-players_temp[index].betNum
                Player.update({username:username},{score:score,readyFlag:false},(err,res)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log('更新玩家'+username+'状态成功')
                    }
                })
            }
        })
    })
    

}


module.exports=judge