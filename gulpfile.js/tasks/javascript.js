var config = require('../config');
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var handleError = require('../lib/handleError')

// js config
var js = {
    in: config.config.source + config.js.in,
    out: config.config.dest + config.js.out,
    source: config.js.source,
    vendor_in: config.config.source + config.js.vendor_in,
    vendor_out: config.config.dest + config.js.vendor_out,
    vendor_source: config.js.vendor_source,
    dashboard_in: config.config.source + config.js.dashboard_in,
    dashboard_out: config.config.dest + config.js.dashboard_out,
    dashboard_source: config.js.dashboard_source
};

// gulp task
gulp.task('javascript', function() {
    // set up the browserify instance on a task basis

    var files = [
        { 'in':js.in, 'out':js.out, 'source': js.source },
        { 'in':js.dashboard_in, 'out':js.dashboard_out, 'source': js.dashboard_source }
    ];

    var tasks = files.map(function(entry) {
        return browserify({ entries: [entry.in] })
        .bundle()
        .on('error', handleError)
        .pipe(source(entry.source))
        .pipe(buffer())
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(entry.out));
    });
});
