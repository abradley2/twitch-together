var gulp = require('gulp'),
	gutil = require('gulp-util'),
	stylus = require('gulp-stylus'),
	source = require('vinyl-source-stream'),
	browserify = require('browserify'),
	babelify = require('babelify'),
	watchify = require('watchify')

gulp.task('build-scripts', function () {
	return browserify({
		entries: ['./src/scripts/main.jsx'],
		extensions: ['.js', '.jsx'],
	})
		.transform('babelify', {
			presets: ['es2015', 'react']
		})
		.bundle()
		.on('error', function (error) { console.error(error.toString()) })
		.pipe(source('main.js'))
		.pipe(gulp.dest('./public/dist/js'))
})

gulp.task('watch-scripts', function () {
	var b = watchify(
		browserify({
			entries: ['./src/scripts/main.jsx'],
			extensions: ['.js', '.jsx'],
		})
	)
		.transform('babelify', {
			presets: ['es2015', 'react']
		})
		.on('log', gutil.log)
		.on('update', bundle)

	function bundle () {
		b.bundle()
			.on('error', function (error) { console.error(error.toString()) })
			.pipe(source('main.js'))
			.pipe(gulp.dest('./public/dist/js'))
	}

	bundle()

	return b
})

gulp.task('build-styles', function () {
	return gulp.src(['./src/styles/main.styl'])
		.pipe(stylus().on('error', function (error) {
			console.error(error.toString())
		}))
		.pipe(gulp.dest('./public/dist/css'))
})

gulp.task('watch-styles', ['build-styles'], function () {
	return gulp.watch(['./src/styles/**/*'], ['build-styles'])
})

gulp.task('build', ['build-scripts', 'build-styles'])
gulp.task('watch', ['watch-scripts', 'watch-styles'])

gulp.task('default', ['build'])
