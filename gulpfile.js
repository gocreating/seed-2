/**
 * Use require hook to support es6
 */
require('babel/register');

/**
 * Load plugins
 */
var gulp          = require('gulp');
// var less          = require('gulp-less');
// var autoprefixer  = require('gulp-autoprefixer');
// var minifycss     = require('gulp-minify-css');
// var uglify        = require('gulp-uglify');
// var rename        = require('gulp-rename');
// var concat        = require('gulp-concat');
var gulpif        = require('gulp-if');
var changed       = require('gulp-changed');
var del           = require('del');
// var notify        = require('gulp-notify');
// var source        = require('vinyl-source-stream');
// var buffer        = require('vinyl-buffer');
// var babelify      = require('babelify');
// var globify       = require('require-globify');
// var preprocessify = require('preprocessify');
// var preprocess    = require('gulp-preprocess');
var babel         = require('gulp-babel');
// var gutil         = require('gulp-util');
var runSequence   = require('run-sequence');
var webpack       = require('gulp-webpack');
var path          = require('path');
var nodemon       = require('gulp-nodemon');

/**
 * Load parameters
 */
var argv = require('yargs')
  .usage('Usage: gulp <command> [options] [-u]')
  .command(
    'init',
    'Initialize database.\n' +
    'Create tables from schemas, and insert built-in records ' +
    'like root user, default permissions, etc.'
  )
  .command(
    'build',
    'Prepare an environment for development, test or production.'
  )
  .demand(1)
  .example('gulp build -d', 'build environment for development')
  .alias('d', 'development')
  .describe('d', 'Development environment')
  .alias('t', 'test')
  .describe('t', 'Test environment')
  .alias('p', 'production')
  .describe('p', 'Production environment')
  .alias('u', 'uglify')
  .describe('u', 'Uglify backend .js scripts')
  .help('h')
  .alias('h', 'help')
  .argv;

// variables for environment
var env;
var isDev;
var isTest;
var isProd;

if (argv.d || argv.development) {
  isDev = true;
  env = 'development';
}
if (argv.t || argv.test) {
  isTest = true;
  env = 'test';
}
if (argv.p || argv.production) {
  isProd = true;
  env = 'production';
}

// the default env is `development`
if (!isDev && !isTest && !isProd) {
  isDev = true;
  env = 'development';
}

/**
 * Custom configurations
 */

var settings = require('./src/core/settings');

/**
 * error handler
 */
var handleErrors = function() {
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>',
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};

/**
 * clean the build files
 */
gulp.task('clean', function(cb) {
  if (isDev) {
    del(['build/debug/'], cb);
  } else if (isTest) {
    del(['build/test/'], cb);
  } else if (isProd) {
    del(['build/release/'], cb);
  }
});

gulp.task('webpack', function(cb) {
  var webpackconfig = require('./gulp/webpack.development.js');

  return gulp
    .src('./src/core/flux/boot.js')
    .pipe(webpack(webpackconfig))
    .pipe(gulp.dest('./build/debug/core/public/js'));
});

/**
 * compile .less files
 */
gulp.task('styles', function() {
  // global style, material-ui style
  return gulp
    .src(['src/assets/less/main.less', 'src/assets/less/material-ui.less'])
    .pipe(gulpif(isDev, changed('build/debug/assets/css')))
    .pipe(less())
    .on('error', handleErrors)
    .pipe(autoprefixer(
      'last 2 version',
      'safari 5',
      'ie 8',
      'ie 9',
      'opera 12.1',
      'ios 6',
      'android 4'
    ))
    .pipe(gulpif(isDev, gulp.dest('build/debug/assets/css')))
    .pipe(gulpif(isProd || isTest, minifycss()))
    .pipe(gulpif(isTest, gulp.dest('build/test/assets/css')))
    .pipe(gulpif(isProd, gulp.dest('build/release/assets/css')));
});

/**
 * compile front-end .js files
 */
// gulp.task('frontend-scripts', function() {
//   return gulp
//     .src('src/assets/js/**/*.js')
//     .pipe(gulpif(isDev, changed('build/debug/assets/js')))
//     .pipe(preprocess({
//       context: {
//         ENV: env,
//         DEV: isDev,
//         TEST: isTest,
//         PROD: isProd,
//       },
//     }))
//     .pipe(babel())
//     .pipe(gulpif(isProd || isTest, uglify()))
//     .pipe(gulpif(isDev, gulp.dest('build/debug/assets/js')))
//     .pipe(gulpif(isTest, gulp.dest('build/test/assets/js')))
//     .pipe(gulpif(isProd, gulp.dest('build/release/assets/js')));
// });

/**
 * compressing images
 * TO-DO
 */
gulp.task('images', function() {
  return gulp
    .src('src/assets/img/**/*')
    .pipe(gulpif(isDev, changed('build/debug/assets/img')))
    // .pipe(cache(imagemin({
    //   optimizationLevel: 3,
    //   progressive: true,
    //   interlaced: true,
    // })))
    .pipe(gulpif(isDev, gulp.dest('build/debug/assets/img')))
    .pipe(gulpif(isTest, gulp.dest('build/test/assets/img')))
    .pipe(gulpif(isProd, gulp.dest('build/release/assets/img')));
});

/**
 * compile backend .js files
 */
gulp.task('backend-scripts', function() {
  return gulp
    .src([
      'src/**/*.js',
      '!src/public/**/*.js',
      '!src/flux/**/*.js',
    ])
    .pipe(gulpif(isDev, changed('build/debug')))
    // .pipe(preprocess({
    //   context: {
    //     ENV: env,
    //     DEV: isDev,
    //     TEST: isTest,
    //     PROD: isProd,
    //   },
    // }))
    .pipe(babel())
    // .pipe(gulpif(argv.u, uglify()))
    .pipe(gulpif(isDev, gulp.dest('build/debug')))
    .pipe(gulpif(isTest, gulp.dest('build/test')))
    .pipe(gulpif(isProd, gulp.dest('build/release')));
});

gulp.task('copy', function() {
  return gulp
    .src([
      'src/*/public/**/*',
      'src/*/flux/**/*',
      // 'src/**/*',
      // '!src/assets/',
      // '!src/**/*.js',
    ])
    .pipe(gulpif(isDev, changed('build/debug')))
    .pipe(gulpif(isDev, gulp.dest('build/debug')))
    .pipe(gulpif(isTest, gulp.dest('build/test')))
    .pipe(gulpif(isProd, gulp.dest('build/release')));
});

gulp.task('watch', function(cb) {
  if (isDev) {
    // watch .less files
    // gulp.watch('src/assets/less/**/*.less', ['styles']);

    // watch .js files
    gulp.watch('src/**/*.js', ['backend-scripts']);
    // gulp.watch(['src/**/*.js', '!src/assets/**/*.js'], ['backend-scripts']);

    // watch .jsx files
    gulp.watch('src/*/flux/views/**/*.jsx', ['copy', 'webpack']);

    // watch image files
    // gulp.watch('src/assets/img/**/*', ['images']);

    // watch other files
    gulp.watch([
      'src/*/public/**/*',
    ], ['copy']);
  }

  cb();
});

gulp.task('nodemon', function(cb) {
  if (isDev) {
    var started = false;

    return nodemon({
      script: 'build/debug/app.js',
      ext: 'js',
      ignore: [
        'gulpfile.js',
        'node_modules/**/*',
        'src/**/*',
        'build/debug/*/public/js/bundle.js',
        'build/release/**/*',
        'build/test/**/*',
      ],
    })
    .on('start', function() {
      if (!started) {
        cb();
        started = true;
      } else {
        // browserSync.reload();
      }
    })
    .on('restart', function() {
    });
  } else {
    cb();
  }
});

gulp.task('webpack-dev-server', function(cb) {
  if (isDev) {
    var webpack = require('webpack');
    var WebpackDevServer = require('webpack-dev-server');
    var config = require('./gulp/webpack.development.js');

    new WebpackDevServer(webpack(config), {
      publicPath: 'http://localhost:3001/core/js',
      hot: true,
      inline: true,
      lazy: false,
      quiet: true,
      noInfo: false,
      historyApiFallback: true,
      proxy: {
        '*': 'http://localhost:3000',
      },
      // headers: {'Access-Control-Allow-Origin': '*'},
      stats: {colors: true},
    }).listen(3001, 'localhost', function(err, result) {
      if (err) {
        console.log(err);
      }
      console.log('Webpack-dev-server listening at localhost:3001');
    });
  }
});
/**
 * default task
 */
gulp.task('default', function() {
  gulp.start('build');
});

/**
 * build task
 */
gulp.task('build', function(cb) {
  runSequence(
    'clean',
    'webpack',
    'backend-scripts',
    'copy',
    'watch',
    'nodemon',
    'webpack-dev-server',
    cb
  );
});