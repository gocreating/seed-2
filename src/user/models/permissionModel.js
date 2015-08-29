export default (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    name: DataTypes.STRING,
  }, {
    // Model tableName will be the same as the model name
    freezeTableName: true,
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Permission.belongsToMany(models.Group, {
          through: models.GroupPermission,
        });
      },
    },
  });

  return Permission;
};