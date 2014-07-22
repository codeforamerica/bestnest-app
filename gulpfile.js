var gulp = require('gulp')
var brfs = require('brfs')
var source = require('vinyl-source-stream')
var rename = require('gulp-rename')
var del = require('del')
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
var run = require('run-sequence')
var portfinder = require('portfinder')

var js = function () {
  return browserify('./index.js')
    .transform(brfs)
}

gulp.task('browserify-release', function () {
  return js()
    .bundle()
    .pipe(source('./bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(size())
    .pipe(gulp.dest('./build/release/'))
})

gulp.task('html-release', function () {
  return gulp.src('./index.html')
    .pipe(gulp.dest('./build/release/'))

})

gulp.task('html-dev', function () {
  return gulp.src('./index.html')
    .pipe(gulp.dest('./build/dev/'))
})


gulp.task('css-release', function () {
  return gulp.src('./css/bestnest.scss')
    .pipe(sass())
    .pipe(concatCss('style.css'))
    .pipe(gulp.dest('./build/release/'))
})

gulp.task('css-dev', function () {
  return gulp.src('./css/bestnest.scss')
    .pipe(sass())
    .pipe(concatCss('style.css'))
    .pipe(gulp.dest('./build/dev/'))
})

gulp.task('clean', function (cb) {
  return del('./build', cb)
})


gulp.task('build-release', function (cb) {
  run('clean',
    ['html-release', 'browserify-release', 'css-release'],
    cb)

})

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

gulp.task('dev', function (cb) {
  run('clean',
    ['watchify','html-dev','css-dev'],
    function (err) {
      if (err) { return cb(err) }
      gulp.watch('./index.html', ['html-dev'])
      gulp.watch('./css/*.scss', ['css-dev'])
      cb()
    })
})

gulp.task('serve', ['dev'], function () {
  var lr = livereload
  lr.listen()
  gulp.watch('./build/dev/*')
    .on('change', function (file) {
      console.log('build changed', file.path)
      lr.changed(file.path)
    })

    portfinder.getPort(function (err, port) {

      var server = httpServer.createServer({
        root: './build/dev'
      }).listen(port)

      opener('http://localhost:'+port)

    })

})
