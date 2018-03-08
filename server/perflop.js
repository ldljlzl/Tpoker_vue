const BlindsPosition=require('./model/blindsPosition')
const Player=require('./model/player')


function action(playerList,arr,_index){
    if(arr[_index]){
        let playerIndex
        playerList.forEach(function(elem,index){
            if(elem.seatNum===arr[_index]){
                playerIndex=index
                io.sockets.connected[elem.socketId].emit('action',smallBlindPosition)
                elem.socketIo.on('actionOver',(data)=>{
                    //status=0为自动押注，status=1为跟注或加注，status=2为弃牌，status=3为让牌
                    if((data.status===1)||(data.status===0)){
                        elem.betNum+=data.num
                        action(playerList,arr,_index++)
                    }else if(data.status===2){
                        arr.splice(_index,1)
                        playerList.splice(playerIndex,1)
                    }else if(data.status===3){
                        //暂时想不到这里要干嘛
                    }else{
                        console.log('actionOver返回data错误')
                        return
                    }
                })
            }
        })
    }else{
        //如果arr遍历完，进行下一轮询问（不一定进入下一轮）
        return
    }
        
}


//Perflop押注环节
function perflop(playerList,io){
    console.log('perflop押注');
    (function(){
        let p=new Promise((resolve)=>{
            BlindsPosition.findOne({},(err,res)=>{
                if(err){
                    console.log("Error:" + err)
                }else{
                    if(res){
                        resolve({
                            smallBlindPosition:res.smallBlindPosition,
                            bigBlindPosition:res.bigBlindPosition
                        })
                    }else{
                        console.log('BlindsPosition初始化错误')
                        console.log('BlindsPosition：'+res)
                    } 
                }
            })                
        })
        return p
    })()
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
                            console.log(playerList)
                            action(playerList,arr,0)
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