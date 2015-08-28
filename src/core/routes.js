import React from 'react';
import {Location, Locations} from 'react-router-component';

import AppLayout from './flux/views/layouts/appLayout.jsx';

const pathPrefix = require('./settings').installedApps.core.pathPrefix;

export default class App extends React.Component {
  render() {
    return <Locations path={this.props.path}>
      <Location
        path={`${pathPrefix}/`}
        handler={require('./flux/views/pages/homePage.jsx')} />
      <Location
        path={`${pathPrefix}/about`}
        handler={require('./flux/views/pages/aboutPage.jsx')} />
    </Locations>;
  }
};