import jwt      from 'jwt-simple';
import moment   from 'moment';
import settings from '../../core/settings.server';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    // Model tableName will be the same as the model name
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        User.belongsTo(models.Group, {
          as: 'group',
        });
      },

      auth: (username, password, models, cb) => {
        User
          .findAll({
            where: {
              username: username,
              password: password,
            },
            attributes: ['id', 'name', 'username'],
            include: [{
              model: models.Group,
              as: 'group',
              attributes: ['name'],
              include: [{
                model: models.Permission,
                attributes: ['name'],
              }, ],
            }, ],
          })
          .then(user => {
            cb(user[0]);
          });
      },
    },
    instanceMethods: {
      // DON'T use arrow function syntax in instanceMethods
      // see README for more information
      getBearerToken: function() {
        const token = jwt.encode({
          user: {
            id: this.id,
            name: this.name,
            username: this.username,
          },
          expiration: moment()
            .add(
              settings.user.bearerToken.expiration.split(' ')[0],
              settings.user.bearerToken.expiration.split(' ')[1]
            )
            .valueOf(),
        }, settings.user.bearerToken.secret);

        return token;
      },
    },
  });

  return User;
};