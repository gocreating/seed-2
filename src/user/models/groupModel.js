export default (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING,
  }, {
    // Model tableName will be the same as the model name
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        Group.belongsToMany(models.Permission, {
          through: models.GroupPermission,
        });
      },
    },
  });

  return Group;
};