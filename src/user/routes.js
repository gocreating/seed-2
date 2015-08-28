import React from 'react';
import {Route, Routes, DefaultRoute, NotFoundRoute} from 'react-router';

var AppLayout = require('./flux/views/layouts/appLayout.jsx');
var pathPrefix = require('../core/settings').installedApps.user.pathPrefix;

export default (
  <Route path={pathPrefix} handler={AppLayout}>
    <DefaultRoute
      handler={require('./flux/views/pages/user.jsx')} />
    <Route
      path="profile"
      handler={require('./flux/views/pages/profile.jsx')} />
  </Route>
);