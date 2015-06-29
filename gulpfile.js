'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserify = require('browserify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream');

gulp.task('sass', function () {
    gulp.src('./client/sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./client/build/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./client/sass/**/*.scss', ['sass']);
});


gulp.task('js', function() {
    var b = browserify({
        insertGlobals: true,
        debug: true
    });
    b.transform(reactify);
    b.add('./client/js/app.js');
    return b.bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./client/build/js'));
});

gulp.task('js:watch', function () {
    gulp.watch('./client/js/**/*.js', ['js']);
});

gulp.task('build', ['sass', 'js']);

gulp.task('watch', ['sass:watch', 'js:watch']);

gulp.task('default', ['build']);
