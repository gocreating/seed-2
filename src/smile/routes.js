require('babel/register');

import React from 'react';
import {Route, Routes, DefaultRoute, NotFoundRoute} from 'react-router';

var AppLayout = require('./flux/views/layouts/appLayout.jsx');
var pathPrefix = require('../core/settings').installedApps.smile.pathPrefix;

export default (
  <Route path={pathPrefix} handler={AppLayout}>
    <DefaultRoute
      handler={require('./flux/views/pages/chatPage.jsx')} />

    <Route path="blog">
      <DefaultRoute
        handler={require('./flux/views/pages/blogPage.jsx')} />
      <Route
        path="new"
        handler={require('./flux/views/pages/newArticlePage.jsx')} />
      <Route
        path=":articleId"
        handler={require('./flux/views/pages/articlePage.jsx')} />
    </Route>

    <Route
      path="chat"
      handler={require('./flux/views/pages/chatPage.jsx')} />

    <Route path="information">
      <DefaultRoute
        handler={require('./flux/views/pages/informationPage.jsx')} />
      <Route
        path=":informationId"
        handler={require('./flux/views/pages/informationDetailPage.jsx')} />
    </Route>

    <Route
      path="record"
      handler={require('./flux/views/pages/recordPage.jsx')} />
  </Route>
);