export default (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    text: DataTypes.STRING,
  }, {
    // Model tableName will be the same as the model name
    freezeTableName: true,
  });

  return Todo;
};