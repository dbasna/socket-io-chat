var config = require("../config");
var gulp = require('gulp');
var gutil = require("gulp-util");
var path = require("path");
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');

// scss config
var icons = {
    in: config.config.source + config.icons.in,
    out: config.config.dest + config.icons.out
};

// gulp task
gulp.task('icons', function() {
    return gulp.src(icons.in)
    .pipe(svgmin(function (file) {
      var prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins: [{
          cleanupIDs: {
            prefix: prefix + '-',
            minify: true
          }
        }]
      }
    }))
    .pipe(svgstore())
    .pipe(gulp.dest(icons.out));
});
