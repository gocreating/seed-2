// import errors from '../errors/';
import React from 'react';
import Router from 'react-router';
import routes from '../routes';
import {installedApps} from '../settings';

export default (app) => {
  const isSSR = true;

  // server-side render
  if (isSSR) {
    installedApps.forEach(function(appName) {
      const routes = require('../../' + appName + '/routes');
      app.get('/' + appName + '\/?*', (req, res) => {
        Router.run(routes, req.path, (Handler, state) => {
          const element = React.createElement(Handler, state);
          const html = React.renderToString(element, state);
          // const html = React.renderToString(<Handler {...state} />);
          res.send('<!DOCTYPE html>' + html);
        });
      });
    });

  // client-side render
  } else {
    app.get('/*', (req, res) => {
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
          </head>
          <body>
            <script src="http://localhost:8080/js/core/bundle.js"></script>
          </body>
        </html>
      `);
    });
  }

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