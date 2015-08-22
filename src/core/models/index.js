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

// fs
//   .readdirSync(__dirname)
//   .filter(function(file) {
//     return (file.indexOf('.') !== 0) && (file !== 'index.js');
//   })
//   .forEach(function(file) {
//     var model = sequelize.import(path.join(__dirname, file));
//     db[model.name] = model;
//   });

for (let appName in settings.installedApps) {
  var modelDir = path.resolve(__dirname, '../../', appName, 'models');
  if (fs.existsSync(modelDir)) {
    // console.log(modelDir);
    fs
      .readdirSync(modelDir)
      .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
      })
      .forEach(function(file) {
        // console.log(file);
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

db.user
  .sync({force: true})
  .then(() => {
    // Table created
    db.user.create({
      name: 'Patient A',
      group: 'patient',
      locale: 'ms',
    });
    db.user.create({
      name: 'Doctor B',
      group: 'doctor',
      locale: 'en',
    });
  });

db.message
  .sync({force: true})
  .then(() => {
  });

db.article
  .sync({force: true})
  .then(() => {
    db.article.create({
      title: 'Hampden-Sydney College in Virginia, looked',
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      authorUserId: 2,
    });

    db.article.create({
      title: '交流文章',
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      authorUserId: 1,
    });
  });

// db.information
//   .sync({force: true})
//   .then(() => {
//   });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;