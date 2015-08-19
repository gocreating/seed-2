require('babel/register');

import React from 'react';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

var AppLayout = require('./flux/views/layouts/appLayout.jsx');
var pathPrefix = require('./settings').installedApps.core.pathPrefix;

export default (
  <Route path={pathPrefix} handler={AppLayout}>
    <DefaultRoute
      handler={require('./flux/views/pages/homePage.jsx')} />
    <Route
      path="about"
      handler={require('./flux/views/pages/aboutPage.jsx')} />
  </Route>
);