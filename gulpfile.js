var gulp  = require('gulp');
var path  = require('path');
var del   = require('del');
var $     = require('gulp-load-plugins')();

// config
var config = {
  port: $.util.env.port || 4444,
  src: 'src/',
  dist: 'dist/',
};

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
    .pipe(gulp.dest(config.dist + 'js/'))
    .pipe($.size({ title : 'js' }))
    .pipe($.connect.reload());
});

// copy html from src to dist
gulp.task('html', function() {
  return gulp.src(config.src + 'index.html')
    .pipe(gulp.dest(config.dist))
    .pipe($.size({ title : 'html' }))
    .pipe($.connect.reload());
});

// convert stylus to css
gulp.task('styles',function(cb) {
  return gulp.src(config.src + 'styles/app.styl')
    .pipe($.stylus({
      compress: isProduction, // only compress if we are in production
      'include css' : true    // include 'normal' css into app.css
    }))
    .pipe($.autoprefixer({browsers: autoprefixerBrowsers}))
    .pipe(gulp.dest(config.dist + 'css/'))
    .pipe($.size({ title : 'css' }))
    .pipe($.connect.reload());
});

// copy images
gulp.task('images', function(cb) {
  return gulp.src(config.src + 'public/img/**/*.{png,jpg,jpeg,gif}')
    .pipe($.size({ title : 'images' }))
    .pipe(gulp.dest(config.dist + 'img/'));
});

// waits until clean is finished then builds the project
gulp.task('build', ['images', 'js', 'styles'], function(){
  return gulp.src(config.src + 'index.html')
    .pipe(gulp.dest(config.dist))
    .pipe($.size({ title : 'html' }))
    .pipe($.connect.reload());
});

// remove bundels
gulp.task('clean', function(cb) {
  del([config.dist], cb);
});

// add livereload on the given port
gulp.task('server:connect', ['build'], function() {
  $.connect.server({
    root: config.dist,
    port: config.port,
    livereload: {
      port: 35729
    }
  });
});

// watch styl, html and js file changes
gulp.task('server', ['server:connect'], function() {
  gulp.watch(config.src + 'styles/*.styl', ['styles']);
  gulp.watch(config.src + 'index.html', ['html']);
  gulp.watch(config.src + 'app/**/*.js', ['js']);
  gulp.watch(config.src + 'app/**/*.jsx', ['js']);
});

// by default build project and then watch files in order to trigger livereload
gulp.task('default', function() {
  gulp.start('server');
});
