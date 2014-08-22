var gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    minifycss = require('gulp-minify-css'),
    livereload = require('gulp-livereload'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    watch = require('gulp-watch'),
    stylish = require('jshint-stylish');

var config = {'environment': 'production'};

var roots = {src: 'src', dist: 'dist'};

var paths = {
    dest: ['.', '!**/node_modules/**', '!**/vendor/**'],
    assets: 'src/assets/**/*.*',
    sass: [roots.src + '/assets/sass/**/*.scss', '!**/vendor/**'],
    css: 'src/assets/css/*.css',
    scripts: [roots.src + '/assets/js/**/*.js', '!**/admin/**']
};

// Sass compilation
gulp.task('sass', function () {
    gulp.src(paths.sass)
        .pipe(plumber())
        .pipe(sass({
                unixNewlines: true,
                sourceMap: 'map',
                precision: 10,
                imagePath: '../img'
            }
        ))
        .pipe(autoprefixer('last 3 version', 'ie 8', 'ie 9', 'opera 12.1', 'safari 5'))
        .pipe(gulp.dest(roots.src + '/assets/css'))
        .pipe(livereload())

});

// Javascript validation (and eventually concatenation)
gulp.task('scripts', function () {
    return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        //.pipe(rename('app.js'))
        .pipe(gulp.dest(roots.dist + '/assets/js'));
});

// HTML (this is kinda pointless for only one file but it'll grow)
gulp.task('html', function () {
    gulp.src('index.html')
        .pipe(watch())
        .pipe(livereload());
});


// Set environment
gulp.task('dev_config', function () {
    console.log("[CONFIG] Using 'development' environment for this process");
    config.environment = 'development';
});

gulp.task('dev', ['dev_config', 'watch', 'prod']);

gulp.task('prod', ['styles'], function () {
    console.log('finished compiling');
});


gulp.task('copy', function() {
    gulp.src(roots.src)
        .pipe(gulp.dest(roots.dist));
});

gulp.task('build', ['sass', 'scripts']);


gulp.task('default', function() {
    livereload.listen();
    gulp.watch(paths.assets, ['build']);
});