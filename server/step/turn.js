const action=require('./action')


function turn(arrPoker,io,playersPosition,playerList,finalPlayers,lastBet){
    console.log('turn')
    io.sockets.emit('turn',{arrPoker:arrPoker})
    action(playerList,playersPosition,0,lastBet,6,finalPlayers,io)
}


module.exports=turn