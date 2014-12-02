'use strict';

var gulp = require('gulp');

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  return gulp.src('app/*.html')
    .pipe(wiredep({
      directory: 'app/bower_components'
    }))
    .pipe(gulp.dest('app'));
});