module.exports=function(io){
    console.log('io')
    io.on('connection',function(socket){
        console.log('open')
        socket.emit('open')
        
    })


}