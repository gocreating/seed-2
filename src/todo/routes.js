import React from 'react';
import {Route, Routes, DefaultRoute, NotFoundRoute} from 'react-router';

var AppLayout = require('./flux/views/layouts/appLayout.jsx');
var pathPrefix = require('../core/settings').installedApps.todo.pathPrefix;

export default (
  <Route path={pathPrefix} handler={AppLayout}>
    <DefaultRoute
      handler={require('./flux/views/pages/todo.jsx')} />
  </Route>
);