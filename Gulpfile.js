var gulp = require('gulp'); 
var plumber = require('gulp-plumber');
var stylus = require('gulp-stylus');
var autoprefixer = require('autoprefixer-stylus');
var coffee = require('gulp-coffee');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

// BrowserSync
gulp.task('serve', ['stylus', 'coffee'], function() {
  browserSync.init({
      proxy: "http://vagrant.dev"
  });

  gulp.watch('public/css/*.styl', ['stylus']);
  gulp.watch('public/js/*.coffee', ['coffee']);
  gulp.watch("*.html").on('change', browserSync.reload);
});


// Compile Our Stylus
gulp.task('stylus', function() {
  gulp.src('public/stylus/[^_]*.styl')
    .pipe(plumber())
    .pipe(stylus({
      use: [autoprefixer('last 2 versions')]
    }))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
});

gulp.task('coffee', function() {
  gulp.src('public/js/*.coffee')
    .pipe(plumber())
    .pipe(coffee())
    .pipe(gulp.dest('public/js'))
    .pipe(browserSync.stream());
});

// Default Task
gulp.task('default', ['serve']);