export default (sequelize, DataTypes) => {
  // var User = require('./userModel')(sequelize, DataTypes);

  const Article = sequelize.define('article', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
  }, {
    // Model tableName will be the same as the model name
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        Article.belongsTo(models.user, {
          onDelete: 'CASCADE',
          as: 'author',
          foreignKey: 'authorUserId',
        });
      },
    },
  });

  return Article;
};