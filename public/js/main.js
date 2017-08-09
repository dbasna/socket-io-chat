var socket;
var app = {};

app.init = function() {
    var pathname = window.location.pathname;
    var channel = pathname.split('/channel/');
    var socket = io('/channel.' + channel[1]);

    $('form').submit(function(){
        socket.emit('chat.message', $('#m').val());
        $('#m').val('');
        return false;
    });

    socket.on('chat.info', function(msg){
        var message = '***' + msg.content + '***';
        $('#messages').append($('<li class="info">').text(message));
    });

    socket.on('chat.message', function(msg){
        console.log(msg);
        var message = '@' + msg.user.username + ' : ' + msg.content;
        $('#messages').append($('<li>').text(message));
    });
}

app.init();
