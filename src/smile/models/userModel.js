export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: DataTypes.STRING,
    group: DataTypes.ENUM('patient', 'doctor'),
    // https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
    locale: DataTypes.ENUM(
      'ms', // Malay
      'en' // English
    ),
  }, {
    // Model tableName will be the same as the model name
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        User.hasOne(models.user, {
          as: 'doctor',
          foreignKey: 'doctorId',
          allowNull: true,
        });

        User.hasMany(models.article, {
          foreignKey: 'authorUserId',
        });
      },
    },
  });

  return User;
};