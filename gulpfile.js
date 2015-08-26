var gulp  = require('gulp');
var path  = require('path');
var del   = require('del');
var $     = require('gulp-load-plugins')();

// config
var port = $.util.env.port || 4444;
var src = 'src/';
var dist = 'dist/';

// env config
var environment   = $.util.env.type || 'development';
var isProduction  = environment === 'production';
var webpackConfig = require('./webpack.config.js')[environment];

// https://github.com/ai/autoprefixer
var autoprefixerBrowsers = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 6',
  'opera >= 23',
  'ios >= 6',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('js', function() {
  return gulp.src(webpackConfig.entry)
    .pipe($.webpack(webpackConfig))
    .pipe(isProduction ? $.uglifyjs() : $.util.noop())
    .pipe(gulp.dest(dist + 'js/'))
    .pipe($.size({ title : 'js' }))
    .pipe($.connect.reload());
});

// copy html from src to dist
gulp.task('html', function() {
  return gulp.src(src + 'index.html')
    .pipe(gulp.dest(dist))
    .pipe($.size({ title : 'html' }))
    .pipe($.connect.reload());
});

// convert stylus to css
gulp.task('styles',function(cb) {
  return gulp.src(src + 'styles/app.styl')
    .pipe($.stylus({
      compress: isProduction, // only compress if we are in production
      'include css' : true    // include 'normal' css into app.css
    }))
    .pipe($.autoprefixer({browsers: autoprefixerBrowsers}))
    .pipe(gulp.dest(dist + 'css/'))
    .pipe($.size({ title : 'css' }))
    .pipe($.connect.reload());
});

// copy images
gulp.task('images', function(cb) {
  return gulp.src(src + 'public/img/**/*.{png,jpg,jpeg,gif}')
    .pipe($.size({ title : 'images' }))
    .pipe(gulp.dest(dist + 'img/'));
});

// waits until clean is finished then builds the project
gulp.task('build', ['images', 'js', 'styles'], function(){
  return gulp.src(src + 'index.html')
    .pipe(gulp.dest(dist))
    .pipe($.size({ title : 'html' }))
    .pipe($.connect.reload());
});

// remove bundels
gulp.task('clean', function(cb) {
  del([dist], cb);
});

// add livereload on the given port
gulp.task('server:connect', ['build'], function() {
  $.connect.server({
    root: dist,
    port: port,
    livereload: {
      port: 35729
    }
  });
});

// watch styl, html and js file changes
gulp.task('server', ['server:connect'], function() {
  gulp.watch(src + 'styles/*.styl', ['styles']);
  gulp.watch(src + 'index.html', ['html']);
  gulp.watch(src + 'app/**/*.js', ['js']);
  gulp.watch(src + 'app/**/*.jsx', ['js']);
});

// by default build project and then watch files in order to trigger livereload
gulp.task('default', function() {
  gulp.start('server');
});
