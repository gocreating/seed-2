import fs from 'fs';
import path from 'path';
import {installedApps} from '../settings.server';

export default (app) => {
  for (let appName in installedApps) {
    const appDir = path.resolve(__dirname, '../../', appName);
    const errHandlerPath = path.resolve(appDir, 'errors/handler.js');
    if (fs.existsSync(errHandlerPath)) {
      var errHandler = require(errHandlerPath);
      errHandler(app);
    }
  }

  app.use((err, req, res, next) => {
    if (err) {
      switch (err.constructor.name) {
        case 'Database': {
          console.log('Database Error');
          break;
        }
        default: {
          console.log('Unhandled Error:', err.name);
          console.log(err.stack);

          res.status(err.status || 500);

          // send the error
          // if (req.xhr || req.get('content-type') == 'application/json') {
          res.json({
            errors: [
              {
                title: err.title || '',
                detail: err.detail || '',
                stack: err.stack.split('\n'),
              },
            ],
          });

          // default error reporting page
          // } else {
          //   res.render('error/report', {
          //     message: err.title,
          //     stack: err.stack,
          //   });
          // }
        }
      }

    }
  });
};