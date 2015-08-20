// import errors from '../errors/';
import React from 'react';
import Router from 'react-router';
import routes from '../routes';
import {installedApps} from '../settings';
var models  = require('../models');

export default (app) => {
  const isSSR = true;

  app.get('/api/todos', (req, res) => {
    models.todo
      .findAll()
      .then(function(todos) {
        res.json(todos);
      });
  });

  // server-side render
  if (isSSR) {
    for (let appName in installedApps) {
      const pathPrefix = installedApps[appName].pathPrefix;
      const routes = require('../../' + appName + '/routes');
      app.get(pathPrefix + '\/?*', (req, res, next) => {
        Router.run(routes, req.path, (Handler, state) => {
          const element = React.createElement(Handler, state);
          const html = React.renderToString(element, state);
          if (html.length < 120) {
            // the path does not match current routing rules
            // so pass down to the next app.get
            return next();
          } else {
            // const html = React.renderToString(<Handler {...state} />);
            res.send('<!DOCTYPE html>' + html);
          }
        });
      });
    }

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

  // app.post('/api/user/login', User.api.login);

  // 404 page not found
  app.use((req, res, next) => {
    console.log('404');
    res.send('404');
    // next(new errors.pageNotFound());
  });
};