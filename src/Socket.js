var express = require('express');
var http = require('http');
var io = require('socket.io');

var User = require('./User.js');
var Message = require('./Message.js');

function Socket() {
    var self = this;
    this.app = express();
    this.http = http.Server(this.app);
    this.io = io(this.http);

    //Declare the use public folder
    this.app.use(express.static('public'));

    //We define a route handler / that gets called when we hit our website home
    this.app.get('/', function(req, res){
        res.sendFile(__dirname + '/index.html');
    });

    this.io.on('connection', function(socket){
        self.connection(socket);
    });

    this.http.listen(3000, function(){
        self.listen();
    });
}

Socket.prototype.connection = function (socket) {
    var self = this;
    var user = new User();

    console.log('user connected : ' + user.getID());
    var msg = user.getUsername() + ' has connect';
    var message = new Message(null, msg);
    self.io.emit('chat.info', message);

    socket.on('disconnect', function(){
        console.log('user disconnected : ' + user.getID());
        var msg = user.getUsername() + ' has disconnect';
        var message = new Message(null, msg);
        self.io.emit('chat.info', message);
    });

    socket.on('chat.message', function(msg){
        console.log('user ' + user.getID() + ' sent a message: ' + msg);
        var message = new Message(user, msg);
        self.io.emit('chat.message', message);
    });
};

Socket.prototype.listen = function () {
    console.log('listening on *:3000');
};

module.exports = Socket;
