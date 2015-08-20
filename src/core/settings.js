var path = require('path');

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
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
    },
    test: 'sqlite://db.test.sqlite',
    production: 'sqlite://db.production.sqlite',
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
    smile: {
      pathPrefix: '/smile',
    },
  },
};