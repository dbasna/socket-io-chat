function Chat() {
    this.messages = {};
    this.users = {};
}

Chat.prototype.addMessage = function (message) {
    this.messages[message.getID()] = message;
};

Chat.prototype.getMessage = function (id) {
    return this.messages[id];
};

Chat.prototype.deleteMessage = function (id) {
    delete this.messages[id];
};

Chat.prototype.addUser = function (user) {
    this.users[users.getID()] = users;
};

Chat.prototype.getUser = function (id) {
    return this.users[id];
};

Chat.prototype.removeUser = function (id) {
    delete this.users[id];
};

module.exports = Chat;
