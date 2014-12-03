'use strict';

var gulp = require('gulp'),
	browserSync = require('browser-sync');

var files = [
	'./app/sass/**/*',
	'./app/*.html',
	'./bower.json',
	'./app/jade/**/*.jade'
];

gulp.task('browser-sync', function () {
	browserSync({
		startPath: 'index.html',
        server: {
            baseDir: ["app", '.tmp']
        },
        files: files
    });
});

gulp.task('server', ['build', 'watch'], function () {
	gulp.start('browser-sync');
});