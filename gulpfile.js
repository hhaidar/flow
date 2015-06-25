'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserify = require('gulp-browserify');

gulp.task('sass', function () {
    gulp.src('./client/sass/style.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./client/build/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./client/sass/**/*.sass', ['sass']);
});

gulp.task('js', function() {
    gulp.src('./client/js/app.js')
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(gulp.dest('./client/build/js'))
});

gulp.task('js:watch', function () {
    gulp.watch('./client/js/**/*.js', ['js']);
});

gulp.task('default', ['sass:watch', 'js:watch']);