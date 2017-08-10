var Message = require('./Message.js');

function CommandHandler(user, command, params) {
    this.user = user;
    this.command = command;
    this.params = params;
    this.callback = undefined;
}

CommandHandler.prototype.execute = function (callback) {
    this.callback = callback;

    switch (this.command) {
        case '/name':
            this.switchName();
            break;
        default:
            break;
    }
};

CommandHandler.prototype.switchName = function () {
    if(this.params[0] !== undefined) {
        var oldname = this.user.getUsername();
        this.user.setUsername(this.params[0]);

        var msg = oldname + ' change his name to ' + this.user.getUsername();
        var message = new Message(null, msg);
        console.log('user ' + oldname + ' has change name to ' + this.user.getUsername());

        if(this.callback !== undefined) {
            this.callback(message);
        }
    }
};

module.exports = CommandHandler;
