export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  }, {
    // Model tableName will be the same as the model name
    freezeTableName: true,
  });

  User
    .sync({force: true})
    .then(() => {
      // Table created
      return User.create({
        firstName: 'John',
        lastName: 'Hancock',
      });
    });

  return User;
};