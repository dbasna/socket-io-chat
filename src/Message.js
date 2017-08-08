function Message(user, content) {
    this.id = Date.now() + Math.round(Math.random() * 100);
    this.date = Date.now();
    this.user = user;
    this.content = content;
}

Message.prototype.getID = function () {
    return this.id;
};

Message.prototype.getDate = function () {
    return this.date;
};

Message.prototype.setUser = function (user) {
    this.user = user;
};

Message.prototype.getUser = function () {
    return this.user;
};

Message.prototype.setContent = function (content) {
    this.content = content;
};

Message.prototype.getContent = function () {
    return this.content;
};

module.exports = Message;
