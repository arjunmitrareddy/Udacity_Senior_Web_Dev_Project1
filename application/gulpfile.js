/* eslint-env = node */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var wiredep = require('wiredep').stream;
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', function() {
	console.log("Hello Gulp!");
});

gulp.task('build-css', function () {
  	gulp.src('sass/**/*.scss')
        .pipe($.plumber())
        .pipe($.sass())
        .pipe(autoprefixer({
            browsers: ['last 5 versions']
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('watch', function () {
    gulp.watch('./**/*.scss', ['build-css']);
});

gulp.task('format', function () {
    gulp.src('application/**/*.js')
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});



gulp.task('wire-dep', function () {
    var bower = {
            json: require('./bower.json'),
            directory: './bower_components',
            ignorePath: ''
    };

    var injectJsFiles = [
        './**/*.module.js',
        './**/*.config.js',
        './**/*.controller.js'
    ];

    return gulp
        .src('./index.html')
        .pipe(wiredep({
            bowerJson: bower.json,
            directory: bower.directory,
            ignorePath: bower.ignorePath
        }))
        .pipe($.inject(gulp.src(injectJsFiles), {
            ignorePath : '/application/', addRootSlash: false

        }))
        .pipe($.inject(gulp.src('./css/style.css'), {
            ignorePath : '/application/', addRootSlash: false
        }))
        .pipe(gulp.dest('./'));
});

/*var browserSync = require('browser-sync').create();
 browserSync.init({
     server: "./"
     
 });
 browserSync.stream();

*/