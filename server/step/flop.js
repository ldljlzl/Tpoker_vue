const action=require('./action')


function flop(arrPoker,io,playersPosition,playerList,finalPlayers,lastBet){
    console.log('flop')
    console.log('lastBet:'+lastBet)
    io.sockets.emit('flop',{arrPoker:arrPoker})
    action(playerList,playersPosition,0,lastBet,6,finalPlayers,io)
}


module.exports=flop