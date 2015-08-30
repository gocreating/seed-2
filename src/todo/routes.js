import React from 'react';
import {Location, Locations} from 'react-router-component';

const pathPrefix = require('../core/settings.common').installedApps.todo.pathPrefix;

export default class App extends React.Component {
  render() {
    return <Locations path={this.props.path}>
      <Location
        path={`${pathPrefix}`}
        handler={require('./flux/views/pages/TodoPage.jsx')} />
    </Locations>;
  }
};