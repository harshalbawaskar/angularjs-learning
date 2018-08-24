// get access to the gulp API
const gulp = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const print = require('gulp-print');
var uglify = require('gulp-uglify');
var ngAnnotate = require('browserify-ngannotate');

const babelify = require('babelify');
const browserify = require("browserify");
const connect = require("gulp-connect");
const source = require("vinyl-source-stream");

const scripts = require('./scripts');
const styles = require('./styles');

gulp.task('css', function () {
    gulp.src(styles)
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('html', function () {
    return gulp.src('./src/app/**/*.html')
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('libs', function () {
    return gulp.src([
        'node_modules/systemjs/dist/system.js',
        'node_modules/babel-polyfill/dist/polyfill.js'])
        // .pipe(print())
        .pipe(gulp.dest('./dist/libs'));
});

// gulp.task('js', function () {
//     gulp.src(scripts)
//         //.pipe(print())  
//         .pipe(babel({ presets: ['es2015'] }))
//         .pipe(concat('app.js'))
//         .pipe(gulp.dest('./dist/scripts'))
//         .pipe(browserSync.reload({
//             stream: true
//         }));
// });


//Convert ES6 ode in all js files in src/js folder and copy to 
//build folder as bundle.js
gulp.task("js", function () {
    return browserify("./src/app/app.js")
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
});


gulp.task("minify", ['js'], function () {
    return gulp.src("./dist/scripts/app.js")
        .pipe(uglify())
        .pipe(gulp.dest('./dist/scripts'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('browser-sync', function () {
    browserSync.init(null, {
        open: false,
        server: {
            baseDir: './dist',
        }
    });
});

gulp.task('build', function () {
    gulp.start(['css', 'html', 'js'])
});

gulp.task('start', function () {
    gulp.start(['build']);
});

gulp.task('default', ['start'], function () {

    browserSync.init(['./dist/**/**.**'], {
        server: "./dist",
        port: 4000,
        notify: false,
        ui: {
            port: 4001
        }
    });

    gulp.watch(['./src/app/**/*.css'], ['css']);
    gulp.watch(['./src/app/**/*.js'], ['js']);
    gulp.watch(['./src/app/**/*.html'], ['html']);
});