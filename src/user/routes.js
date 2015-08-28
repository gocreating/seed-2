import React from 'react';
import {Location, Locations} from 'react-router-component';

import AppLayout from './flux/views/layouts/appLayout.jsx';

const pathPrefix = require('../core/settings').installedApps.user.pathPrefix;

export default class App extends React.Component {
  render() {
    return <Locations path={this.props.path}>
      <Location
        path={`${pathPrefix}`}
        handler={require('./flux/views/pages/user.jsx')} />
      <Location
        path={`${pathPrefix}/profile`}
        handler={require('./flux/views/pages/profile.jsx')} />
    </Locations>;
  }
};