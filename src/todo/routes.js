import React from 'react';
import {Location, Locations} from 'react-router-component';
import CaptureClicks from 'react-router-component/lib/CaptureClicks';

const pathPrefix = require('../core/settings.common').installedApps.todo.pathPrefix;

export default class App extends React.Component {
  render() {
    return <CaptureClicks>
      <Locations path={this.props.path}>
        <Location
          path={`${pathPrefix}`}
          handler={require('./flux/views/pages/TodoPage.jsx')} />
      </Locations>
    </CaptureClicks>;
  }
};