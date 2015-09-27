import React from 'react';
import {Location, Locations} from 'react-router-component';
import CaptureClicks from 'react-router-component/lib/CaptureClicks';

const pathPrefix = require('./settings.common').installedApps.core.pathPrefix;

export default class App extends React.Component {
  render() {
    return <CaptureClicks>
      <Locations path={this.props.path}>

        <Location
          path={`${pathPrefix}/about`}
          handler={require('./flux/views/pages/AboutPage.jsx')} />
      </Locations>
    </CaptureClicks>;
  }
};