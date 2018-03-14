const judgeLevel=require('../judgeLevel')

function judge(io,playersInfo,personnalPoker,publicPoker){
    console.log('judge')
    console.log(publicPoker)
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
        console.log(level)
        playersLevel.push({
            seatNum:elem.seatNum,
            level:level
        })
    })
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

}


module.exports=judge