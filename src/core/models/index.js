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

// http://pgoh13.com/mycourse/lesson1nama.php
// db.message
//   .sync({force: true})
//   .then(() => {
//   });

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

db.information
  .sync({force: true})
  .then(() => {
    db.information.create({
      title: '吃對了，顧到120歲！',
      content: `許多為人子女者，都有同樣的苦惱：家裡的老爸、老媽或是阿公、阿嬤該怎麼吃？吃些什麼？才不會吃出糖血病、高血壓、心血管疾病等慢性病，又能營養充足。其實，老人的飲食跟一般成人一樣，若能依據衛生署推出的飲食營養金字塔，每天可吃1.5碗～3碗的五穀雜糧、3～5碟的蔬菜、2～4份水果，1～2杯的牛奶，豆蛋魚肉類約3～5兩（5兩約相當於巴掌大小），就可以健康活到老。`,
    });

    db.information.create({
      title: '老人飲食營養',
      content: `老人的營養照顧其主旨在提供均衡、健康、富變化、 且符合老年期營養需求的飲食。其內容除了正常三餐之外，每日並供應水果及夜點，而在年節之時應景加菜，以滿足老人在飲食上的美味與變化。除此之外並對老人提供營養諮詢服務，建立正確飲食觀念，以期達到飲食衛生、安享晚年之目標。`,
    });
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;