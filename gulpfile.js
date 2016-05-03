"use strict";

const gulp = require("gulp");
const plumber = require('gulp-plumber');
const typescript = require('typescript');
const stylus = require("gulp-stylus");
const watch = require("gulp-watch");
const browserify = require('browserify');
const browserSync = require('browser-sync');
const tsify = require('tsify');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const jeet = require('jeet');
const nib = require('nib');
const port = 3000;

function bundle() {
    var bundler = browserify(
        'src/ts/app.ts',
        {
            debug: true
        })
        .plugin(tsify, {
            target: 'es5'
        });
    return bundler.bundle().on('error',handleTSErrors)
        .pipe(source('app.js'))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
}

function browserSyncInit() {
    return browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
}


function baseHtml() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
}

function handleTSErrors(error) {
    console.log('ERROR: '+error.message);
    this.emit('end');
}

function stylusCompile() {
    return gulp.src('src/styl/style.styl')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(stylus({
            use: [
                jeet(),
                nib()
            ]
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
}


gulp.task('browserSync', ['bundle'], function () {
    browserSyncInit();
});

gulp.task('stylus',  function () {
    return stylusCompile();
});

gulp.task('baseHtml', ['stylus'], function () {
    return baseHtml();
});

gulp.task('bundle', ['baseHtml'], function () {
    return bundle();
});

gulp.task('bscss', ['bsjs'], function () {
    return gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('dist/css'));
})

gulp.task('bsjs', function () {
    return gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
        .pipe(gulp.dest('dist/js'));
})

gulp.task('default', ['browserSync', 'bscss'], function () {
    gulp.watch([
        './src/ts/*.ts',
        './src/ts/**/*.ts',
        './src/ts/**/*.tsx'
    ], function () {
        bundle();
    });

    gulp.watch([
        './index.html'
    ], function () {
        baseHtml();
    })

    gulp.watch([
        './src/styl/*.styl',
        './src/styl/**/*.styl'
    ], function () {
        stylusCompile();
    });

});

