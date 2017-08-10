var socket;
var app = {};

app.init = function() {
    //Get the current pathname
    var pathname = window.location.pathname;
    var channel = pathname.split('/');
    //The 3rd param define the room name
    var room = channel[3];

    //Start socket client side. We connect to the namespace (channel) define is 2nd param
    var socket = io('/channel.' + channel[2]);
    //Emit "room" action with param room name
    socket.emit('room', room);

    //On form submit emit a "chat.message" with the input value
    $('form').submit(function(){
        var value = $('#m').val();
        var regex = value.match(/^(\/[a-zA-Z]+)( [a-zA-Z]+)+$/);

        if(regex) {
            socket.emit('chat.command', { command:regex[1], params:[regex[2].substring(1)] });
        }
        else {
            socket.emit('chat.message', value);
        }

        $('#m').val('');
        return false;
    });

    //Define a "chat.info" listener returning the message to the chat
    socket.on('chat.info', function(msg){
        var message = '***' + msg.content + '***';
        $('#messages').append($('<li class="info">').text(message));
    });

    //Define a "chat.message" listener returning user message to the chat
    socket.on('chat.message', function(msg){
        var message = '@' + msg.user.username + ' : ' + msg.content;
        $('#messages').append($('<li>c').text(message));
    });
}

app.init();
