import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import settings from '../settings';

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
 * Insert dummy data
 */

db.User
  .sync({force: true})
  .then(() => {
    db.User.bulkCreate([{
      name: 'user a',
      username: 'usera',
    }, {
      name: 'user b',
      username: 'userb',
    }, ]);
  });

db.Todo
  .sync({force: true})
  .then(() => {
    db.Todo.bulkCreate([{
      text: 'Dummy todo 01',
    }, {
      text: 'Wahahahaha',
    }, {
      text: 'Test!!',
    }, ]);
  });

export default db;