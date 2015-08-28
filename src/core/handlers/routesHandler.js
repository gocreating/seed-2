import fs from 'fs';
import path from 'path';
import React from 'react';
import Helmet from 'react-helmet';

import {installedApps} from '../settings';
import models from '../models';
import errors from '../errors';

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
        __dirname, '../../', appName, 'routes.js'
      );

      if (fs.existsSync(routesPath)) {
        const App = require(routesPath);
        app.get(pathPrefix + '\/?*', (req, res, next) => {
          try {
            const html = React.renderToString(<App path={req.path} />);
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
          } catch (err) {
            // no routes matched in currently iterated app
            return next();
          }
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

  // 404 page not found
  app.use((req, res, next) => {
    next(new errors.PageNotFound());
  });
};