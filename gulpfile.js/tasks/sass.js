var config = require('../config');
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var handleError = require('../lib/handleError')

// scss config
var scss = {
    in: config.config.source + config.scss.in,
    out: config.config.dest + config.scss.out,
    sassOpts: {
        //outputStyle: 'nested',
        //precison: 3,
        errLogToConsole: true,
        includePaths: [config.vendors.bootstrapSass.in + 'assets/stylesheets', config.vendors.owlCarousel.in + 'src/scss']
    }
};

// gulp task
gulp.task('sass', function() {
    return gulp.src(scss.in)
    .pipe(sass(scss.sassOpts))
    .on('error', handleError)
    .pipe(autoprefixer())
    .pipe(gulp.dest(scss.out));
});
