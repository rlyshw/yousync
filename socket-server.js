module.exports = function(io){
    io.on('connection', connection_cb)
}

var connection_cb = function(socket){
    console.log("a user connected");
    
    socket.on('disconnect', function(){
        console.log('a user disconnected');
    })

    socket.on('start', function(msg){
        console.log("joining",msg)
        socket.join(msg);
    })
    
    socket.on('update',function(data){
        socket.to(data.id).emit('update',data);
    })
}