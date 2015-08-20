export default (sequelize, DataTypes) => {
  // var User = require('./userModel')(sequelize, DataTypes);

  const Chat = sequelize.define('chat', {
    text: DataTypes.STRING,
  }, {
    // Model tableName will be the same as the model name
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        Chat.belongsTo(models.user, {
          onDelete: 'CASCADE',
          as: 'fromUser',
          foreignKey: 'fromUserId',
        });
        Chat.belongsTo(models.user, {
          onDelete: 'CASCADE',
          as: 'toUser',
          foreignKey: 'toUserId',
        });
      },
    },
  });

  return Chat;
};