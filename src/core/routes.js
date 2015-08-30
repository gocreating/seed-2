import React from 'react';
import {Location, Locations} from 'react-router-component';

const pathPrefix = require('./settings.common').installedApps.core.pathPrefix;

export default class App extends React.Component {
  render() {
    return <Locations path={this.props.path}>
      <Location
        path={`${pathPrefix}/`}
        handler={require('./flux/views/pages/HomePage.jsx')} />
      <Location
        path={`${pathPrefix}/about`}
        handler={require('./flux/views/pages/AboutPage.jsx')} />
    </Locations>;
  }
};