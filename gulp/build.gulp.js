'use strict';

var gulp = require('gulp'),
	cache = require('gulp-cache'),
	del = require('del'),
	pls = require('gulp-load-plugins')();

//Error Handler
var errorLog = function (error) {
	console.error(error.toString());
	this.emit('end');
};

//Clean Dirs
gulp.task('clean', function (done) {
	del(['.tmp', 'dist'], done);
});

//Clear Cache
gulp.task('clear', function (done) {
	return cache.clearAll(done);
});

//Build
gulp.task('build', function () {
	console.log('Start build');
});

