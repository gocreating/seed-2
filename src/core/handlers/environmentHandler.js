import express      from 'express';
import path         from 'path';
import favicon      from 'serve-favicon';
import morgan       from 'morgan';
import bodyParser   from 'body-parser';
import cookieParser from 'cookie-parser';

import {installedApps} from '../settings';

export default (app) => {
  /**
   * serve favicon and static files
   */
  app.use(favicon(path.resolve(__dirname, '../public/favicon.ico')));
  app.use(express.static(path.resolve(__dirname, '../../public')));
  for (let appName in installedApps) {
    console.log(path.resolve(__dirname, '../../', appName, 'public'));
    app.use(
      installedApps[appName].pathPrefix.toLowerCase(),
      express.static(path.resolve(__dirname, '../../', appName, 'public'))
    );
  }

  // @ifndef TEST
  /**
   * logger
   */
  app.use(morgan(
    ':remote-addr\t' +
    ':status ' +
    ':method ' +
    ':url\t' +
    ':res[content-length] - ' +
    ':response-time ms'
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
};