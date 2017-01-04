// 引入 gulp
var gulp = require('gulp');

var webpack = require('webpack-stream');

// 引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require("gulp-uglify");

var ngHtml2Js = require('gulp-ng-html2js');
var minifyHtml = require("gulp-minify-html");

var cleanCSS = require('gulp-clean-css');

var sourcemaps = require('gulp-sourcemaps');


// 合并，压缩文件
gulp.task('build', function () {
    gulp.src("./src/templates/**/*.html")
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(ngHtml2Js({
            moduleName: "ng-datatable",
            prefix: "ng-datatable-"
        }))
        .pipe(concat("template.js"))
        .pipe(gulp.dest("./src"));
        
    gulp.src('./src/index.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['build'], function () {
    gulp.watch('./src/**/*.js', ['build']);
    gulp.watch('./src/templates/**/*.html', ['build']);
    gulp.watch('./src/style/**/*.scss', ['build']);
    setTimeout(function () {
        console.log('------ ***** ***** ------');
        console.log('------ start watch ------');
        console.log('------ ***** ***** ------');
    }, 1000);
});