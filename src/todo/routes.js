import React from 'react';
import {Location, Locations} from 'react-router-component';

import AppLayout from './flux/views/layouts/appLayout.jsx';

const pathPrefix = require('../core/settings').installedApps.todo.pathPrefix;

export default class App extends React.Component {
  render() {
    return <Locations path={this.props.path}>
      <Location
        path={`${pathPrefix}`}
        handler={require('./flux/views/pages/todoPage.jsx')} />
    </Locations>;
  }
};