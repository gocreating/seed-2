require('babel/register');

import React from 'react';
import {Route, DefaultRoute} from 'react-router';

var App = require('./flux/views/app.jsx');

export default (
  <Route path="/" handler={App}>
    <DefaultRoute
      handler={require('./flux/views/pages/homePage.jsx')} />
    <Route
      path="about"
      handler={require('./flux/views/pages/aboutPage.jsx')} />
  </Route>
);