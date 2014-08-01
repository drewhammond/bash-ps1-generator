var gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    minifycss = require('gulp-minify-css'),
    livereload = require('gulp-livereload'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    watch = require('gulp-watch');

var config = {'environment': 'production'};

var paths = {
    'sass': 'assets/sass/**/*.scss',
    'css': 'assets/css'
};

// Sass compilation
gulp.task('styles', function () {
        watch({glob: paths.sass})
            .pipe(sass({
                    sourceMap: 'map',
                    precision: 10,
                    imagePath: '../img'
                }
            ))
            .pipe(gulp.dest(paths.css))
            .pipe(livereload())
//    } else {
//        gulp.src(paths.sass)
//            .pipe(sass())
//            .pipe(gulp.dest(paths.css))
//            .pipe(minifycss())
//            .pipe(rename({suffix: '.min'}))
//            .pipe(gulp.dest(paths.css))
//    }

});

gulp.task('dev_config'), function() {
    console.log('[config] Using development environment');
    config.environment = 'development';
};

gulp.task('dev', ['dev_config', 'prod']);

gulp.task('prod', ['styles']);
