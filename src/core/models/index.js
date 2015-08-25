import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import settings from '../settings';
import async from 'async';

var sequelize = new Sequelize(
  null, // database
  null, // username
  null, // password
  settings.db.development
);

var db = {};

for (let appName in settings.installedApps) {
  var modelDir = path.resolve(__dirname, '../../', appName, 'models');
  if (fs.existsSync(modelDir)) {
    fs
      .readdirSync(modelDir)
      .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
      })
      .forEach(function(file) {
        var model = sequelize.import(path.resolve(modelDir, file));
        db[model.name] = model;
      });
  }
}

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/**
 * Sync database and insert dummy data
 */

async.series([

  /**
   * Syncing
   */

  callback => {
    settings.db.development.logging('\x1b[0m=== Syncing ===');
    callback();
  },
  callback => {
    db.Permission
      .sync({force: true})
      .then(() => {callback();});
  },
  callback => {
    db.Group
      .sync({force: true})
      .then(() => {callback();});
  },
  callback => {
    db.GroupPermission
      .sync({force: true})
      .then(() => {callback();});
  },
  callback => {
    db.User
      .sync({force: true})
      .then(() => {callback();});
  },
  callback => {
    db.Todo
      .sync({force: true})
      .then(() => {callback();});
  },

  /**
   * Insert data
   */

  callback => {
    settings.db.development.logging('\x1b[0m=== Insert Data ===');
    callback();
  },
  callback => {
    db.Permission
      .bulkCreate([
        {name: 'CREATE_USER'},
        {name: 'DELETE_USER'},
        {name: 'LOGIN'},
        {name: 'POST_ARTICLE'},
      ])
      .then(() => {callback();});
  },
  callback => {
    db.Group
      .bulkCreate([
        {name: 'root'},
        {name: 'admin'},
        {name: 'user'},
      ])
      .then(() => {callback();});
  },
  callback => {
    db.User
      .bulkCreate([{
        name: 'user a',
        username: 'usera',
      }, {
        name: 'user b',
        username: 'userb',
      }, ])
      .then(() => {callback();});
  },
  callback => {
    db.Todo
      .bulkCreate([
        {text: 'Dummy todo 01'},
        {text: 'Wahahahaha'},
        {text: 'Test!!'},
      ])
      .then(() => {callback();});
  },

  /**
   * Insert relation data
   */
  callback => {
    settings.db.development.logging('\x1b[0m=== Insert Relation Data ===');
    callback();
  },
  callback => {
    db.Group
      .findOne({
        where: {
          name: 'user',
        },
      })
      .then((group) => {
        db.User
          .findOne({
            where: {
              username: 'usera',
            },
          })
          .then((user) => {
            user
              .setGroup(group)
              .then(() => {callback();});
          });
      });
  },
  callback => {
    db.Permission
      .findAll()
      .then((perms) => {
        db.Group
          .findAll()
          .then((groups) => {
            async.eachSeries(groups, (group, cb) => {
              group
                .setPermissions(perms)
                .then(() => {cb();});
            }, () => {
              callback();
            });
          });
      });
  },
]);

export default db;