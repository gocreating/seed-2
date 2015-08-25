import path from 'path';

module.exports = {
  server: {
    port: {
      development: 5000,
      test: 4567,
      production: 3000,
    },
  },
  // connection string of mongodb: 'mongodb://root@localhost/seed'
  // connection string of sqlite: 'sqlite://db.sqlite'
  db: {
    development: {
      dialect: 'sqlite',
      // the path is relative to 'build/debug/core'
      storage: path.resolve(__dirname, '../../../db.development.sqlite'),
      // logging: false,
      logging: str => {
        // color codes from:
        //   http://bluesock.org/~willkg/dev/ansi.html
        console.log(
          '\x1b[1;36m' + '[SQL] ' +
          '\x1b[1;30m' + str.replace('Executing (default): ', '') +
          '\x1b[0m'
        );
      },
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
    },
    test: {
      dialect: 'sqlite',
      // the path is relative to 'build/debug/core'
      storage: path.resolve(__dirname, '../../../db.test.sqlite'),
      logging: false,
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
    },
    production: {
      dialect: 'sqlite',
      // the path is relative to 'build/debug/core'
      storage: path.resolve(__dirname, '../../../db.production.sqlite'),
      logging: false,
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
    },
  },
  user: {
    bearerToken: {
      expiration: '7 days',
      secret: 'saltForJwtToken',
    },
  },
  installedApps: {
    core: {
      pathPrefix: '/',
    },
    user: {
      pathPrefix: '/user',
    },
    todo: {
      pathPrefix: '/todo',
    },
  },
};