// 引入 gulp
var gulp = require('gulp');

var webpack = require('webpack-stream');

// 引入组件
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require("gulp-uglify");

var ngHtml2Js = require('gulp-ng-html2js');
var minifyHtml = require("gulp-minify-html");


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
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./dist'));
});

gulp.task('demo', function () {
    gulp.src('./demo/src/index.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(webpack(require('./demo/webpack.config.js')))
        .pipe(gulp.dest('./demo/dist'));
});

gulp.task('default', ['build', 'demo'], function () {
});