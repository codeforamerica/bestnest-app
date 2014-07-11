var gulp = require('gulp')
var brfs = require('brfs')
var source = require('vinyl-source-stream')
var rename = require('gulp-rename')
var rimraf = require('gulp-rimraf')
var uglify = require('gulp-uglify')
var buffer = require('vinyl-buffer')
var size = require('gulp-size')
var sass = require('gulp-sass')
var concatCss = require('gulp-concat-css')
var browserify = require('browserify')
var livereload = require('gulp-livereload')
var httpServer = require('http-server')
var opener = require('opener')
var watchify = require('watchify')

var js = function () {
  return browserify('./index.js')
    .transform(brfs)
}

gulp.task('browserify-release', ['clean-release'], function () {
  return js()
    .bundle()
    .pipe(source('./bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(size())
    .pipe(gulp.dest('./build/release/'))
})

gulp.task('html-release', ['clean-release'], function () {
  return gulp.src('./index.html')
    .pipe(gulp.dest('./build/release/'))

})

gulp.task('html-dev', function () {
  return gulp.src('./index.html')
    .pipe(gulp.dest('./build/dev/'))

})


gulp.task('css-release', ['clean-release'], function () {
  return gulp.src('./css/bestnest.scss')
    .pipe(sass())
    .pipe(concatCss('style.css'))
    .pipe(gulp.dest('./build/release/'))
})

gulp.task('css-dev', ['clean-release'], function () {
  return gulp.src('./css/bestnest.scss')
    .pipe(sass())
    .pipe(concatCss('style.css'))
    .pipe(gulp.dest('./build/dev/'))
})

gulp.task('clean-release', function () {
  return gulp.src('./build/release/')
    .pipe(rimraf())
})

gulp.task('clean-dev', function () {
  return gulp.src('./build/dev/')
    .pipe(rimraf())
})

gulp.task('clean', function () {
  return gulp.src('./build/')
    .pipe(rimraf())
})


gulp.task('build-release', [
  'html-release',
  'browserify-release',
  'css-release'
])

gulp.task('watchify', function () {
  var bundler = watchify(js())

  bundler.on('update', rebundle)

  function rebundle() {
    console.log('rebuilding js bundle')
    bundler.bundle({debug: true})
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./build/dev/'))
  }

  return rebundle()
})

gulp.task('dev', [
  'watchify',
  'html-dev',
  'css-dev'
  ], function () {
    gulp.watch('./index.html', ['html-dev'])
    gulp.watch('./css/*.scss', ['css-dev'])
  })

gulp.task('serve', ['dev'], function () {
  var lr = livereload()
  gulp.watch('./build/dev/*')
    .on('change', function (file) {
      console.log('build changed', file.path)
      lr.changed(file.path)
    })

  var server = httpServer.createServer({
    root: './build/dev'
  }).listen(9090)

  opener('http://localhost:9090')

})