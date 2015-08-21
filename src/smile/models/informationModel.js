export default (sequelize, DataTypes) => {
  // var User = require('./userModel')(sequelize, DataTypes);

  const Information = sequelize.define('information', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
  }, {
    // Model tableName will be the same as the model name
    freezeTableName: true,
  });

  return Information;
};