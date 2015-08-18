require('babel/register');

import React from 'react';
import {Route, Routes, DefaultRoute, NotFoundRoute} from 'react-router';

var AppLayout = require('./flux/views/layouts/appLayout.jsx');

export default (
  <Route path="/" handler={AppLayout}>
    <Route
      path="user"
      handler={require('./flux/views/user.jsx')} />
  </Route>
);