'use strict';

var gulp = require('gulp');

gulp.task('watch', function () {
	gulp.watch('app/sass/**/*', ['sass']);
	gulp.watch('app/*.html', ['html']);
	gulp.watch('bower.json', ['wiredep']);
	gulp.watch('app/jade/**/*.jade', ['jade']);
});