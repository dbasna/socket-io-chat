var User = require('./User.js');
var Message = require('./Message.js');

function Channel(server, id) {
    //Define an alias to get the channel instance
    var self = this;

    //Set the server instance
    this.server = server;
    //Set the channel id
    this.id = id;
    //Set the channel name (ex: /channel.1)
    this.name = '/channel.' + id;
    //Define a namespace (channel)
    this.namespace = server.io.of(this.name);

    //Listen to all connection in the namespace (channel)
    this.channel = this.namespace.on('connection', function (socket) {
        self.connection(socket);
    });
}

Channel.prototype.connection = function (socket) {
    //Define an alias of the channel instance
    var self = this;

    //Emit a "chat.info" action to the current socket connected
    var msg = 'Connected on channel ' + self.name;
    var message = new Message(null, msg);
    socket.emit('chat.info', message);

    //Define a "room" socket listener
    socket.on('room', function(room) {
        //Create a new custom user
        var user = new User();
        //Add the connected socket to the room
        socket.join(room);

        //Emit a "chat.info" message to the current connected socket
        //Socket emit send a message only to the current socket
        var msg = 'You have join room /' + room;
        var message = new Message(null, msg);
        socket.emit('chat.info', message);

        //Emit a "chat.info" message to the current connected socket
        //Socket emit send a message only to the current socket
        var msg = 'Welcome ' + user.getUsername();
        var message = new Message(null, msg);
        socket.emit('chat.info', message);
        console.log('user connected : ' + user.getID());

        //Broadcast to the room a "chat.info" message
        //Broadcasting send a message to the concern room to all user except the socket that initiate action
        var msg = user.getUsername() + ' has connect';
        var message = new Message(null, msg);
        socket.broadcast.to(room).emit('chat.info', message);

        //Define a "chat.message" listener
        socket.on('chat.message', function(msg){
            //Send the capture message to the room
            var message = new Message(user, msg);
            self.channel.in(room).emit('chat.message', message);
            console.log('user ' + user.getID() + ' sent a message: ' + msg);
        });

        //Define a "disconnect" listener
        socket.on('disconnect', function(){
            //Broadcast to the room a "chat.info" message
            var msg = user.getUsername() + ' has disconnect';
            var message = new Message(null, msg);
            socket.broadcast.to(room).emit('chat.info', message);
            console.log('user disconnected : ' + user.getID());
        });
    });
};

module.exports = Channel;
