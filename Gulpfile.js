'use strict';

// Load plugins
var gulp = require('gulp'); 
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var notify = require('gulp-notify');
var stylus = require('gulp-stylus');
var autoprefixer = require('autoprefixer-stylus');
var coffee = require('gulp-coffee');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');

// Error function for plumber
var onError = function (err) {
  gutil.beep();
  console.log(err);
  this.emit('end');
};

// BrowserSync
gulp.task('serve', ['stylus', 'coffee'], function() {
  browserSync.init({
      proxy: "http://vagrant.dev"
  });

  gulp.watch('public/stylus/*.styl', ['stylus']);
  gulp.watch('public/js/*.coffee', ['coffee']);
  gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile Our Stylus
gulp.task('stylus', function() {
  gulp.src('public/stylus/[^_]*.styl')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(stylus({
      use: [autoprefixer('last 2 versions')]
    }))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream())
    .pipe(notify({ message: 'Styles task complete' }));
});


// Compile our Coffeescript
gulp.task('coffee', function() {
  gulp.src('public/js/*.coffee')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(coffee())
    .pipe(gulp.dest('public/js'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
    .pipe(browserSync.stream())
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  gulp.src('public/img/*')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(imagemin({ progressive: true }))
    .pipe(gulp.dest('public/img'))
    .pipe(notify({ message: 'Optimised images' }));
});

// Default Task
gulp.task('default', ['serve', 'images']);