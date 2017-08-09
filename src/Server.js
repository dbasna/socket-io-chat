var express = require('express');
var http = require('http');
var io = require('socket.io');

var Channel = require('./Channel.js');

function Server() {
    //Define an alias to get the server instance
    var self = this;

    //Include express à nodejs web framework
    this.app = express();
    //Init http server with express supplied
    this.http = http.Server(this.app);
    //Start Socket.IO allowing bi-directional communication
    this.io = io(this.http);
    //Init an object to store channels
    this.channels = {};

    //Declare the use of public folder
    this.app.use(express.static('public'));

    //We define a route handler / that gets called when we hit our website home
    this.app.get('/', function(req, res){
        res.setHeader('Content-Type', 'text/plain');
        res.end('Socket IO chat homepage');
    });

    //Define a route handler with dynamic channel and room params
    this.app.get('/channel/:channel/:room', function(req, res) {
        //Get index.html template file in the current directory
        res.sendFile(__dirname + '/index.html');

        //Use the channel if it already exist. If not create a new channel instance
        if(self.channels[req.params.channel] !== undefined) {
            var channel = self.channels[req.params.channel];
        }
        else {
            var channel = new Channel(self, req.params.channel);
            self.channels[req.params.channel] = channel;
        }
    });

    //Start server listening on a define port
    this.http.listen(3000, function(){
        console.log('listening on *:3000');
    });
}

module.exports = Server;
