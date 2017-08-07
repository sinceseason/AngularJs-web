/**
 * Created by Shadow on 2017/8/4.
 */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    minify = require('gulp-minify'),
    uglify = require('gulp-uglify');
    plumber = require('gulp-plumber');
    cleanCss = require('gulp-clean-css');
    imagemin = require('gulp-imagemin');

gulp.task('css', function () {
    return gulp.src('./stylesheets/skin/default/*.css')
        .pipe(concat('style.min.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('./compress/css'));
});

gulp.task('image', function () {
    return gulp.src('./images/**/*')
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 5
        }))
        .pipe(gulp.dest('./compress/images'))
});

gulp.task('controller', function () {
    return gulp.src(['./app/controller/*.js', './views/**/*.js'])
        .pipe(plumber())
        .pipe(uglify({
            mangle: {reserved: ['require', 'exports', '$']}
        }))
        .pipe(gulp.dest("./compress/js/controller"))
});

gulp.task('service', function () {
    return gulp.src('./app/service/*.js')
        .pipe(plumber())
        .pipe(uglify({
            mangle: {reserved: ['require', 'exports', '$']}
        }))
        .pipe(gulp.dest("./compress/js/service"))
});

gulp.task('directive', function () {
    return gulp.src('./app/directive/*.js')
        .pipe(plumber())
        .pipe(uglify({
            mangle: {reserved: ['require', 'exports', '$']}
        }))
        .pipe(gulp.dest("./compress/js/directive"))
});

gulp.task('interceptor', function () {
    return gulp.src('./app/interceptor/*.js')
        .pipe(plumber())
        .pipe(uglify({
            mangle: {reserved: ['require', 'exports', '$']}
        }))
        .pipe(gulp.dest("./compress/js/interceptor"))
});



gulp.task('server', function () {
    gulp.watch('./stylesheets/skin/default/*.css', ['css']);
    gulp.watch('./images/**/*', ['image']);
    gulp.watch(['./app/controller/*.js', './views/**/*.js'], ['controller']);
    gulp.watch('./app/service/*.js', ['service']);
    gulp.watch('./app/directive/*.js', ['directive']);
    gulp.watch('./app/interceptor/*.js', ['interceptor']);
});

gulp.task('init', ['css', 'image', 'controller', 'service', 'directive', 'interceptor']);
gulp.task('default', ['server']);