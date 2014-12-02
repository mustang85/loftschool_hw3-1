'use strict';

var gulp = require('gulp');

gulp.task('watch', function () {
	gulp.watch('src/sass/**/*', ['sass']);
	gulp.watch('src/*.html', ['html']);
	gulp.watch('bower.json', ['wiredep']);
	gulp.watch('src/jade/**/*.jade', ['jade']);
});