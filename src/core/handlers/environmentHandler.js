import express      from 'express';
import path         from 'path';
import favicon      from 'serve-favicon';
import morgan       from 'morgan';
import bodyParser   from 'body-parser';
import cookieParser from 'cookie-parser';

import tokenParser from '../../user/middlewares/tokenParser';
import {installedApps} from '../settings.server';

export default (app) => {
  /**
   * serve favicon and static files
   */
  app.use(favicon(path.resolve(__dirname, '../public/favicon.ico')));
  app.use(express.static(path.resolve(__dirname, '../../public')));
  for (let appName in installedApps) {
    app.use(
      installedApps[appName].pathPrefix.toLowerCase(),
      express.static(path.resolve(__dirname, '../../', appName, 'public'))
    );
  }

  // @ifndef TEST
  /**
   * logger
   */
  morgan.token('colorStatus', (req, res) => {
    const status = res.statusCode;
    let color = '';

    if (status < 200) {
      // 1xx
      color = '\x1b[0m';
    } else if (status < 300) {
      // 2xx
      color = '\x1b[0;32m';
    } else if (status < 400) {
      // 3xx
      color = '\x1b[1;33m';
    } else if (status < 500) {
      // 4xx
      color = '\x1b[0;31m';
    } else {
      // 5xx
      color = '\x1b[0;35m';
    }

    return color + status + '\x1b[0m';
  });

  app.use(morgan(
    '\x1b[1;30m' + '[:date[iso]] ' +
    '\x1b[0m'    + ':remote-addr\t' +
                   ':colorStatus ' +
                   ':method ' +
                   ':url\t' +
    '\x1b[0m'    + ':res[content-length] - ' +
    '\x1b[0;36m' + ':response-time ms' +
    '\x1b[0m'
  ));
  // @endif

  /**
   * parser
   */

  // form value parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false,
  }));

  // cookie parser
  app.use(cookieParser());

  // token parser
  app.use(tokenParser());
};