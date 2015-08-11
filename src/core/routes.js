require('babel/register');

import React from 'react';
import {Route, DefaultRoute} from 'react-router';

var DefaultLayout = require('./flux/views/layouts/defaultLayout.jsx');

export default (
  <Route path="/" handler={DefaultLayout}>
    <DefaultRoute
      handler={require('./flux/views/pages/homePage.jsx')} />
    <Route
      path="about"
      handler={require('./flux/views/pages/aboutPage.jsx')} />
  </Route>
);