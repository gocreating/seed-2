export default (app, models) => {
  app.rest('/api/users', ':id(\\d+)', models.User, 'id');

  // login
  app.post('/api/users/login', (req, res, next) => {
    models.User.auth(
      req.body.username,
      req.body.password,
      models,
      user => {
        if (user) {
          const bearerToken = user.getBearerToken();
          res.cookie('access_token', bearerToken);
          res.json({
            data: {
              bearerToken: bearerToken,
              user: user,
            },
            errors: [],
          });
        } else {
          res.json({
            errors: [
              {
                title: 'cannot login',
                detail: 'either the username or the password is wrong',
              },
            ],
          });
        }
      }
    );
  });

  // logout
  app.get('/api/users/logout', (req, res, next) => {
    res.clearCookie('access_token');
    res.json({
      errors: [],
    });
  });
};