var socket = io();
var app = {};

app.init = function() {
    $('form').submit(function(){
        socket.emit('chat.message', $('#m').val());
        $('#m').val('');
        return false;
    });

    socket.on('chat.message', function(msg){
        var message = '@' + msg.user.username + ' : ' + msg.content;
        $('#messages').append($('<li>').text(message));
    });

    socket.on('chat.info', function(msg){
        var message = '***' + msg.content + '***';
        $('#messages').append($('<li class="info">').text(message));
    });
}

app.init();
