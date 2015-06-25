'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('sass', function () {
    gulp.src('./client/sass/style.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./client/public/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./client/sass/**/*.sass', ['sass']);
});

gulp.task('default', ['sass:watch']);