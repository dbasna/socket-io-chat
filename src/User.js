function User() {
    this.id = Date.now() + Math.round(Math.random() * 100);
    this.username = 'guest-' + this.id;
    this.color = undefined;
}

User.prototype.getID = function () {
    return this.id;
};

User.prototype.setUsername = function (username) {
    this.username = username;
};

User.prototype.getUsername = function () {
    return this.username;
};

User.prototype.setColor = function (color) {
    this.color = color;
};

User.prototype.getColor = function () {
    return this.color;
};

module.exports = User;
