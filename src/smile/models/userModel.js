export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: DataTypes.STRING,
    group: DataTypes.ENUM('patient', 'doctor'),
  }, {
    // Model tableName will be the same as the model name
    freezeTableName: true,
    // classMethods: {
    //   associate: function(models) {
    //     User.hasMany(models.chat);
    //   },
    // },
  });

  return User;
};