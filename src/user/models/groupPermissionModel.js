export default (sequelize, DataTypes) => {
  const GroupPermission = sequelize.define('GroupPermission', {
  }, {
    // Model tableName will be the same as the model name
    freezeTableName: true,
    timestamps: false,
  });

  return GroupPermission;
};