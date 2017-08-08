var config = require('../config');
var gulp = require('gulp');

// watch config
var watch = {
    js: config.config.source + config.js.watch,
    scss: config.config.source + config.scss.watch,
    icons: config.config.source + config.icons.watch,
    bower: './bower.json'
};

// gulp task
gulp.task('watch', function() {
    gulp.watch(watch.js, ['javascript']);
    gulp.watch(watch.scss, ['sass']);
    gulp.watch(watch.icons, ['icons']);
    gulp.watch(watch.bower, ['bower']);
});
