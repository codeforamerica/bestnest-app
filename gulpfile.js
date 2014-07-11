var gulp = require('gulp')
var browserify = require('browserify')
var brfs = require('brfs')
var source = require('vinyl-source-stream')
var rename = require('gulp-rename')
var rimraf = require('gulp-rimraf')
var uglify = require('gulp-uglify')
var buffer = require('vinyl-buffer')
var size = require('gulp-size')
var sass = require('gulp-sass')
var concatCss = require('gulp-concat-css')

gulp.task('browserify-release', ['clean-release'], function () {
  return browserify('./index.js')
    .transform(brfs)
    .bundle()
    .pipe(source('./bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(size())
    .pipe(gulp.dest('./build/release'))
})

gulp.task('html-release', ['clean-release'], function () {
  return gulp.src('./index.html')
    .pipe(gulp.dest('./build/release'))

})

gulp.task('css-release', ['clean-release'], function () {
  return gulp.src('./css/bestnest.scss')
    .pipe(sass())
    .pipe(concatCss('style.css'))
    .pipe(gulp.dest('./build/release'))
})

gulp.task('clean-release', function () {
  return gulp.src('./build/release')
    .pipe(rimraf())
})

gulp.task('build-release', [
  'html-release',
  'browserify-release',
  'css-release'
])