const action=require('./action')


function turn(arrPoker,io,playersPosition,playerList,finalPlayers,foldPlayers,lastBet){
    console.log('turn')
    io.sockets.emit('turn',{arrPoker:arrPoker})
    action(playerList,playersPosition,0,lastBet,6,finalPlayers,foldPlayers,io)
}


module.exports=turn