export default (sequelize, DataTypes) => {
  const Todo = sequelize.define('todo', {
    text: DataTypes.STRING,
  }, {
    // Model tableName will be the same as the model name
    freezeTableName: true,
  });

  Todo
    .sync({force: true})
    .then(() => {
      // Table created
      return Todo.create({
        text: 'This is a todo app test',
      });
    });

  return Todo;
};