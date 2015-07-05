'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
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
        .on('error', function(err) {
            gutil.log(gutil.colors.red(err.toString()));
            this.emit('end');
        })
        .pipe(source('app.js'))
        .pipe(gulp.dest('./client/build/js'));
});

gulp.task('js:watch', function () {
    gulp.watch('./client/js/**/*.js', ['js']);
});

gulp.task('font', function() {
    gulp.src('./client/font/*')
        .pipe(gulp.dest('./client/build/font'));
});


gulp.task('build', ['sass', 'js', 'font']);

gulp.task('watch', ['sass:watch', 'js:watch']);

gulp.task('default', ['build']);

gulp.on('err', function(err){
  console.log(err);
});
