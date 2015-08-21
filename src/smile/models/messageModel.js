export default (sequelize, DataTypes) => {
  // var User = require('./userModel')(sequelize, DataTypes);

  const Message = sequelize.define('message', {
    text: DataTypes.STRING,
    textTranslate: DataTypes.STRING,
  }, {
    // Model tableName will be the same as the model name
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        Message.belongsTo(models.user, {
          onDelete: 'CASCADE',
          as: 'fromUser',
          foreignKey: 'fromUserId',
        });
        Message.belongsTo(models.user, {
          onDelete: 'CASCADE',
          as: 'toUser',
          foreignKey: 'toUserId',
        });
      },
    },
  });

  return Message;
};