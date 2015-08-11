// import errors from '../errors/';
import React from 'react';
import Router from 'react-router';
import routes from '../routes';

const reactRouterController = (req, res) => {
  Router.run(routes, req.path, (Handler, state) => {
    const element = React.createElement(Handler);
    const html = React.renderToString(element);
    res.send('<!DOCTYPE html>' + html);
  });
};

export default (app) => {
  // app.get('/*', reactRouterController);
  app.get('/*', (req, res) => {
    res.send(`
      <html>
        <head>
        </head>
        <body>
          <div id="react-container"></div>
          <script src="http://localhost:3001/core/js/bundle.js"></script>
        </body>
      </html>
    `);
  });

  // // general routing
  // app.get('/',      reactRouterController);
  // app.get('/about', reactRouterController);

  // // exampple routing
  // app.get('/todo',  reactRouterController);

  // // user routing
  // app.get ('/user/register',  reactRouterController);
  // app.get ('/user/login',     reactRouterController);
  // app.get ('/user/logout',    User.logout);
  // app.get ('/user/profile',   userModule.middleware.requireLogin,
  //                             reactRouterController);
  // app.post('/api/user',       User.api.create);
  // app.post('/api/user/login', User.api.login);

  // // 404 page not found
  // app.use((req, res, next) => {
  //   next(new errors.pageNotFound());
  // });
};