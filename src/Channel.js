var User = require('./User.js');
var Message = require('./Message.js');

function Channel(server, id) {
    var self = this;
    this.server = server;
    this.id = id;
    this.name = '/channel.' + id;
    this.namespace = server.io.of(this.name);
    
    this.channel = this.namespace.on('connection', function (socket) {
        self.connection(socket);
    });
}

Channel.prototype.connection = function (socket) {
    socket.emit('chat.info', { content: 'Connected on channel ' + this.name });

    var self = this;
    var user = new User();

    socket.emit('chat.info', { content: 'Welcome ' + user.getUsername() });
    console.log('user connected : ' + user.getID());

    var msg = user.getUsername() + ' has connect';
    var message = new Message(null, msg);
    socket.broadcast.emit('chat.info', message);

    socket.on('disconnect', function(){
        console.log('user disconnected : ' + user.getID());
        var msg = user.getUsername() + ' has disconnect';
        var message = new Message(null, msg);
        socket.broadcast.emit('chat.info', message);
    });

    socket.on('chat.message', function(msg){
        console.log('user ' + user.getID() + ' sent a message: ' + msg);
        var message = new Message(user, msg);
        self.channel.emit('chat.message', message);
    });
};

module.exports = Channel;
