export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    // Model tableName will be the same as the model name
    freezeTableName: true,
  });

  return User;
};