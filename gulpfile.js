/**
 * Use require hook to support es6
 */
// require('babel/register');

/**
 * Load plugins
 */
var gulp          = require('gulp');
var gutil         = require('gulp-util');
var less          = require('gulp-less');
var autoprefixer  = require('gulp-autoprefixer');
var minifycss     = require('gulp-minify-css');
var uglify        = require('gulp-uglify');
var rename        = require('gulp-rename');
var concat        = require('gulp-concat');
var gulpif        = require('gulp-if');
var changed       = require('gulp-changed');
var del           = require('del');
var notify        = require('gulp-notify');
var preprocess    = require('gulp-preprocess');
var babel         = require('gulp-babel');
var sourcemaps    = require('gulp-sourcemaps');
var runSequence   = require('run-sequence');
var webpack       = require('gulp-webpack');
var path          = require('path');
var fs            = require('fs');
var nodemon       = require('gulp-nodemon');
var browserSync   = require('browser-sync');
var async         = require('async');
var merge         = require('merge-stream');

/**
 * Load parameters
 */
var argv = require('yargs')
  .usage('Usage: gulp <command> [options] [-u]')
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

var settings = require('./src/core/settings.server');

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

/**
 * compile .less files
 */

function getFolders(dir) {
  return fs
    .readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

gulp.task('styles', function() {
  var folders = getFolders('./src');
  var tasks = folders.map(function(folder) {
    var destFolder;
    if (isDev) {
      destFolder = path.join('./build/debug/public/css/', folder);
    } else if (isTest) {
      destFolder = path.join('./build/test/public/css/', folder);
    } else if (isProd) {
      destFolder = path.join('./build/release/public/css/', folder);
    }

    return gulp
      .src(path.join('./src', folder, '/public/less/**/*.less'))
      .pipe(gulpif(isDev, changed(destFolder)))
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
      .pipe(gulpif(isTest || isProd, minifycss()))
      .pipe(concat('bundle.css'))
      .pipe(gulp.dest(destFolder));
  });
  return tasks;
});

gulp.task('webpack', function(cb) {
  var webpackconfig = require('./gulp/webpack.' + env + '.js');

  return gulp
    .src('')
    .pipe(webpack(webpackconfig))
    .pipe(gulpif(isTest || isProd, uglify()))
    .pipe(gulpif(isDev, gulp.dest('./build/debug/public')))
    .pipe(gulpif(isTest, gulp.dest('./build/test/public')))
    .pipe(gulpif(isProd, gulp.dest('./build/release/public')));
});

/**
 * compile backend .js files
 */
gulp.task('backend-scripts', function() {
  return gulp
    .src([
      'src/**/*.js',
      '!src/public/**/*.js',
      '!src/*/public/**/*.js',
      '!src/*/flux/**/*.js',
    ])
    .pipe(gulpif(isDev, changed('build/debug')))
    .pipe(gulpif(isDev, sourcemaps.init()))
      .pipe(preprocess({
        type: 'js',
        context: {
          ENV: env,
          DEV: isDev,
          TEST: isTest,
          PROD: isProd,
        },
      }))
      .pipe(babel({
        stage: 0, // to support es7
      }))
      .pipe(gulpif(argv.u, uglify()))
    .pipe(gulpif(isDev, sourcemaps.write({
      includeContent: false,
      sourceRoot: function(file) {
        return path.resolve(__dirname, 'src');
      },
    })))
    .pipe(gulpif(isDev, gulp.dest('build/debug')))
    .pipe(gulpif(isTest, gulp.dest('build/test')))
    .pipe(gulpif(isProd, gulp.dest('build/release')));
});

gulp.task('backend-views', function() {
  var reactJsx = gulp
    .src('./src/*/flux/**/*.jsx')
    .pipe(gulpif(isDev, changed('./build/debug')))
    .pipe(gulpif(isDev, sourcemaps.init()))
      .pipe(babel({
        stage: 0, // to support es7
      }))
      .pipe(gulpif(isTest || isProd, uglify()))
    .pipe(gulpif(isDev, sourcemaps.write({
      includeContent: false,
      sourceRoot: function(file) {
        return path.resolve(__dirname, 'src');
      },
    })))
    .pipe(rename({
      extname: '.jsx',
    }))
    .pipe(gulpif(isDev, gulp.dest('./build/debug')))
    .pipe(gulpif(isTest, gulp.dest('./build/test')))
    .pipe(gulpif(isProd, gulp.dest('./build/release')));

  var reactJs = gulp
    .src('./src/*/flux/**/*.js')
    .pipe(gulpif(isDev, changed('./build/debug')))
    .pipe(gulpif(isDev, sourcemaps.init()))
      .pipe(babel({
        stage: 0, // to support es7
      }))
      .pipe(gulpif(isTest || isProd, uglify()))
    .pipe(gulpif(isDev, sourcemaps.write({
      includeContent: false,
      sourceRoot: function(file) {
        return path.resolve(__dirname, 'src');
      },
    })))
    .pipe(gulpif(isDev, gulp.dest('./build/debug')))
    .pipe(gulpif(isTest, gulp.dest('./build/test')))
    .pipe(gulpif(isProd, gulp.dest('./build/release')));

  return merge(reactJsx, reactJs);
});

gulp.task('copy', function() {
  return gulp
    .src([
      'src/*/public/**/*',
      '!src/*/flux/views/**/*',
      '!src/*/public/less',
      '!src/*/public/less/**/*',
    ])
    .pipe(gulpif(isDev, changed('build/debug')))
    .pipe(gulpif(isDev, gulp.dest('build/debug')))
    .pipe(gulpif(isTest, gulp.dest('build/test')))
    .pipe(gulpif(isProd, gulp.dest('build/release')));
});

gulp.task('watch', function(cb) {
  if (isDev) {
    // watch .less files
    gulp.watch('src/*/public/less/**/*.less', ['styles']);

    // watch .js files
    gulp.watch('src/**/*.js', ['backend-scripts']);
    // gulp.watch(['src/**/*.js', '!src/assets/**/*.js'], ['backend-scripts']);

    // watch react files
    gulp.watch('src/*/flux/**/*', ['backend-views', 'webpack']);

    // watch image files
    // gulp.watch('src/assets/img/**/*', ['images']);

    // watch other files
    gulp.watch([
      'src/*/public/**/*',
      '!src/*/public/less',
      '!src/*/public/less/**/*',
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
        'build/debug/public/js/*/bundle.js',
        'build/debug/public/js/common.js',
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

    var WEBPACK_HOST = process.env.HOST || 'localhost';
    var WEBPACK_PORT = parseInt(process.env.PORT) + 1 || 8080;
    var serverOptions = {
      publicPath: config.output.publicPath,
      // contentBase: path.join(__dirname, './build/debug/public'),
      contentBase: 'http://' + WEBPACK_HOST + ':' + WEBPACK_PORT,
      hot: true,
      inline: true,
      lazy: false,
      quiet: true,
      noInfo: false,
      historyApiFallback: true,
      proxy: {
        '*': 'http://localhost:' + settings.server.port[env],
      },
      stats: {colors: true},
    };

    var compiler = webpack(config);
    var webpackDevServer = new WebpackDevServer(compiler, serverOptions);

    webpackDevServer.listen(WEBPACK_PORT, WEBPACK_HOST, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(
          'Webpack-dev-server listening on ' +
          WEBPACK_HOST + ':' + WEBPACK_PORT
        );
      }
    });
  }
});

gulp.task('browser-sync', function(cb) {
  if (isDev) {
    browserSync.init(null, {
      files: [
        'build/debug/**/*.css',
        // to prevent the server-rendered document tree differentiate with
        // the client-rendered document tree, we have to unwatch view files
        // on both server and client side
        // '!build/debug/views/**/*.jsx',
        // '!build/debug/assets/js/bundle.js',
      ],
      port: 7000,
      logLevel: 'info',
      injectChanges: true,
      logSnippet: true,
    });
  } else {
    cb();
  }
});

gulp.task('init', ['backend-scripts'], function(gulpCallback) {
  var db;

  if (isDev) {
    db = require('./build/debug/core/models');
  } else if (isTest) {
    db = require('./build/test/core/models');
  } else if (isProd) {
    db = require('./build/release/core/models');
  }

  var log = function(str) {
    gutil.log(gutil.colors.bgWhite.black(str));
  };

  /**
   * Sync database and insert dummy data
   */

  async.series([

    /**
     * Syncing
     */

    function(callback) {
      // settings.db.development.logging('\x1b[0m=== Syncing ===');
      log(' Syncing tables ');
      callback();
    },
    function(callback) {
      db.Permission
        .sync({force: true})
        .then(function() {callback();});
    },
    function(callback) {
      db.Group
        .sync({force: true})
        .then(function() {callback();});
    },
    function(callback) {
      db.GroupPermission
        .sync({force: true})
        .then(function() {callback();});
    },
    function(callback) {
      db.User
        .sync({force: true})
        .then(function() {callback();});
    },
    function(callback) {
      db.Todo
        .sync({force: true})
        .then(function() {callback();});
    },

    /**
     * Insert data
     */

    function(callback) {
      // settings.db.development.logging('\x1b[0m=== Insert Data ===');
      log(' Inserting data ');
      callback();
    },
    function(callback) {
      db.Permission
        .bulkCreate([
          {name: 'CREATE_USER'},
          {name: 'DELETE_USER'},
          {name: 'LOGIN'},
          {name: 'POST_ARTICLE'},
        ])
        .then(function() {callback();});
    },
    function(callback) {
      db.Group
        .bulkCreate([
          {name: 'root'},
          {name: 'admin'},
          {name: 'user'},
        ])
        .then(function() {callback();});
    },
    function(callback) {
      db.User
        .bulkCreate([{
          name: 'Root User',
          username: 'root',
          password: 'root',
        }, {
          name: 'Admin User',
          username: 'admin',
          password: 'admin',
        }, {
          name: 'Guest User',
          username: 'guest',
          password: 'guest',
        }, ])
        .then(function() {callback();});
    },
    function(callback) {
      db.Todo
        .bulkCreate([
          {text: 'Dummy todo 01'},
          {text: 'Wahahahaha'},
          {text: 'Test!!'},
        ])
        .then(function() {callback();});
    },

    /**
     * Insert relation data
     */
    function(callback) {
      // settings.db.development.logging('\x1b[0m=== Insert Relation Data ===');
      log(' Inserting relation data ');
      callback();
    },
    function(callback) {
      var groupMap = [
        {username: 'root', groupName: 'root'},
        {username: 'admin', groupName: 'admin'},
        {username: 'guest', groupName: 'user'},
      ];

      async.eachSeries(groupMap, function iterator(item, cb) {
        db.Group
        .findOne({
          where: {
            name: item.groupName,
          },
        })
        .then(function(group) {
          db.User
            .findOne({
              where: {
                username: item.username,
              },
            })
            .then(function(user) {
              user
                .setGroup(group)
                .then(function() {cb();});
            });
        });
      }, function done() {
        callback();
      });
    },
    function(callback) {
      db.Permission
        .findAll()
        .then(function(perms) {
          db.Group
            .findAll()
            .then(function(groups) {
              async.eachSeries(groups, function(group, cb) {
                group
                  .setPermissions(perms)
                  .then(function() {cb();});
              }, function() {
                callback();
              });
            });
        });
    },
  ], function done(err, result) {
    gulpCallback();
  });
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
    'styles',
    'webpack',
    'backend-scripts',
    'backend-views',
    'copy',
    'watch',
    [
      'webpack-dev-server',
      'nodemon',
      // 'browser-sync',
    ],
    cb
  );
});