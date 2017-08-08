var config = require('../config');
var gulp = require('gulp');

// default task
gulp.task('default', ['sass', 'javascript', 'fonts', 'icons', 'bower', 'watch']);  
