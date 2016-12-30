// 引入 gulp
var gulp = require('gulp');

// 引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rev = require('gulp-rev-hash');
var clean = require('gulp-clean');
var uglify = require("gulp-uglify");
var replace = require('gulp-replace');
var babel = require('gulp-babel');

var ngHtml2Js = require('gulp-ng-html2js');
var minifyHtml = require("gulp-minify-html");

var cleanCSS = require('gulp-clean-css');

var sourcemaps = require('gulp-sourcemaps');


// 合并，压缩文件
gulp.task('build', function () {
     gulp.src(['./src/style/index.scss'])
        .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(concat('ng-datatable.min.css'))
            .pipe(cleanCSS({compatibility: 'ie9'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/style'));
    
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
        
    gulp.src('./src/**/*.js')
        .pipe(sourcemaps.init())
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(babel())
            .pipe(concat('ng-datatable.min.js'))
            .pipe(uglify())
        .pipe(sourcemaps.write('.'))
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