var gulp = require('gulp');
var stylus = require('gulp-stylus');
var nib = require('nib');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var config = require('./config');

console.log('----------------------------');
console.log('mode: ', config.mode);
console.log('debug: ', config.debug);
console.log('----------------------------');


var path = {
	root: 'client/',
	app: function () {
		return this.root + 'app/'
	},
	components: function () {
		return this.app() + 'components/'
	},
	stylesheets: function () {
		return this.root + 'stylesheets/'
	},
	dist: function () {
		return this.root + 'dist/'
	}
}

//connect
gulp.task('connect', function () {
	connect.server({
		root: 'client',
		port: 3000,
		livereload: true
	});
});

//js
gulp.task('scripts', function () {
	if (config.debug) {
		return gulp.src([
			path.app() + '**/*.module.js',
			path.app() + '**/*.config.js',
			path.app() + '**/*.service.js',
			path.app() + '**/*.directive.js',
			path.app() + '**/*.controller.js'
			])
			.pipe(concat('bundle.js'))
			.pipe(clean())
			.pipe(gulp.dest(path.dist()))
			.pipe(connect.reload());
	} else {
		return gulp.src([
			path.app() + '**/*.module.js',
			path.app() + '**/*.config.js',
			path.app() + '**/*.service.js',
			path.app() + '**/*.directive.js',
			path.app() + '**/*.controller.js'
			])
			.pipe(concat('bundle.js'))
			.pipe(clean())
			.pipe(uglify())
			.pipe(gulp.dest(path.dist()))
			.pipe(connect.reload());
	}
});

//html
gulp.task('html', function () {
	return gulp.src([
				path.root + '*.html',
				path.root + 'app/**/*.html'
			])
		.pipe(connect.reload());
});

//stylus
gulp.task('stylus', function () {
	if (config.debug) {
		return gulp.src([
				path.stylesheets() + '**/*.styl',
				path.components() + '**/*.styl'
			])
			.pipe(concat('bundle.styl'))
			.pipe(stylus({
				use: [nib()],
				compress: false
			}))
			.pipe(clean())
			.pipe(gulp.dest(path.dist()))
			.pipe(connect.reload());
	} else {
		return gulp.src([
				path.stylesheets() + '**/*.styl',
				path.components() + '**/*.styl'
			])
			.pipe(concat('bundle.styl'))
			.pipe(stylus({
				use: [nib()],
				compress: true
			}))
			.pipe(clean())
			.pipe(gulp.dest(path.dist()))
			.pipe(connect.reload());
	}
});

//watch
gulp.task('watch', function () {
	gulp.watch(path.app() + '**/*.js', ['scripts']);
	gulp.watch([
			path.stylesheets() + '**/*.styl',
			path.components() + '**/*.styl'], ['stylus']);
	gulp.watch([
			path.root + '*.html',
			path.app() + '**/*.html'], ['html']);
});

gulp.task('default', ['connect', 'scripts', 'stylus', 'html', 'watch']);