var express = require('express');
var http = require('http');
var io = require('socket.io');

var Channel = require('./Channel.js');

function Server() {
    var self = this;
    this.app = express();
    this.http = http.Server(this.app);
    this.io = io(this.http);
    this.channels = {};

    //Declare the use public folder
    this.app.use(express.static('public'));

    //We define a route handler / that gets called when we hit our website home
    this.app.get('/', function(req, res){
        res.setHeader('Content-Type', 'text/plain');
        res.end('Socket IO chat homepage');
    });

    this.app.get('/channel/:channel', function(req, res) {
        res.sendFile(__dirname + '/index.html');

        if(self.channels[req.params.channel] !== undefined) {
            var channel = self.channels[req.params.channel];
        }
        else {
            var channel = new Channel(self, req.params.channel);
            self.channels[req.params.channel] = channel;
        }
    });

    this.http.listen(3000, function(){
        console.log('listening on *:3000');
    });
}

module.exports = Server;
