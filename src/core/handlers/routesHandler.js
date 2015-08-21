// import errors from '../errors/';
import React from 'react';
import Router from 'react-router';
import Helmet from 'react-helmet';
import fs from 'fs';
import path from 'path';

import routes from '../routes';
import {installedApps} from '../settings';
import models from '../models';

export default (app) => {
  const isSSR = true;

  for (let appName in installedApps) {
    const appDir = path.resolve(__dirname, '../../', appName);
    const apiRoutesPath = path.resolve(appDir, 'apiRoutes.js');
    if (fs.existsSync(apiRoutesPath)) {
      var apiRoutes = require(apiRoutesPath);
      apiRoutes(app, models);
    }
  }

  // server-side render
  if (isSSR) {
    for (let appName in installedApps) {
      const pathPrefix = installedApps[appName].pathPrefix;
      const routesPath = path.resolve(
        __dirname,
        '../../',
        appName,
        'routes.js'
      );

      if (fs.existsSync(routesPath)) {
        const routes = require(routesPath);
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
              let head = Helmet.rewind();
              res.send(
                '<!DOCTYPE html>' +
                '<head>' +
                  `<title>${head.title}</title>${head.meta}${head.link}` +
                '</head>' +
                '<body>' +
                html +
                '</body>'
              );
            }
          });
        });
      }
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