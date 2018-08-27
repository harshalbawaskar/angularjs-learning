// get access to the gulp API
const gulp = require('gulp');
const concat = require('gulp-concat');
var addStream = require('add-stream');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const print = require('gulp-print');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var ngAnnotate = require('browserify-ngannotate');
var templateCache = require('gulp-angular-templatecache');
var embedTemplates = require('gulp-angular-embed-templates');
var path = require('path');
var wrap = require('gulp-wrap');

const babelify = require('babelify');
const browserify = require("browserify");
const connect = require("gulp-connect");
const source = require("vinyl-source-stream");

const scripts = require('./scripts');
const styles = require('./styles');

function css() {
    return gulp.src(styles)
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
}

function copy() {
    return gulp.src('./src/app/index.html')
        .pipe(gulp.dest('./dist'));
}

// function template() {
//     return gulp.src(['./src/app/components/*.html',
//         '!./src/app/index.html'])
//         .pipe(templateCache('templateCache.js', { module: 'todoCache', standalone: true }))
//         .pipe(gulp.dest('./dist/components'))
//         .pipe(browserSync.reload({
//             stream: true
//         }));
// }

function templates() {
    return gulp.src('./src/app/**/*.js')
        .pipe(embedTemplates())
        .pipe(gulp.dest('./dist/components'))
        .pipe(browserSync.reload({
            stream: true
        }));
}

// Convert ES6 ode in all js files in src/js folder and copy to 
// build folder as bundle.js
function js() {
    return browserify(['./dist/components/app.js'])
        .transform(babelify, {
            presets: ["es2015"]
        })
        .transform(ngAnnotate)
        .bundle()
        .pipe(source("app.js"))
        .pipe(gulp.dest("./dist/scripts"))
        .pipe(browserSync.reload({
            stream: true
        }));
}

function watchFiles() {
    gulp.watch(['./src/app/index.html'], gulp.series('copy'));
    gulp.watch(['./src/app/**/*.css'], gulp.series('css'));
    gulp.watch(['./src/app/components/**/*.html'], gulp.series('templates'));
    gulp.watch(['./src/app/**/*.js'], gulp.series('js'));
}

function browserSyncFun(done) {
    browserSync.init(['./dist/**/**.**'], {
        server: "./dist",
        port: 4000,
        notify: false,
        ui: {
            port: 4001
        }
    });
    done();
}


gulp.task('copy', copy);
gulp.task('css', css);
gulp.task('templates', templates);
gulp.task('js', js);
gulp.task('watch', watchFiles);
gulp.task('browser-sync', browserSyncFun);

gulp.task('build', gulp.series('templates', gulp.parallel('copy', 'css', 'js')));

gulp.task('default', gulp.series('build', gulp.parallel('browser-sync', 'watch')));
