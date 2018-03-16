const action=require('./action')


function flop(arrPoker,io,playersPosition,playerList,finalPlayers,foldPlayers,lastBet){
    console.log('flop')
    console.log('lastBet:'+lastBet)
    io.sockets.emit('flop',{arrPoker:arrPoker})
    action(playerList,playersPosition,0,lastBet,6,finalPlayers,foldPlayers,io)
}


module.exports=flop