var notify = require("gulp-notify");

module.exports = function(errorObject, callback) {
    //Notify error in log and notification
    notify.onError(errorObject).apply(this, arguments);
    // Keep gulp from hanging on this task
    if (typeof this.emit === 'function') this.emit('end')

};
