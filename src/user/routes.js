import React from 'react';
import {Location, Locations} from 'react-router-component';
import CaptureClicks from 'react-router-component/lib/CaptureClicks';

const pathPrefix = require('../core/settings.common').installedApps.user.pathPrefix;

export default class App extends React.Component {
  render() {
    return <CaptureClicks>
      <Locations path={this.props.path}>
        <Location
          path={`${pathPrefix}`}
          handler={require('./flux/views/pages/UserPage.jsx')} />
        <Location
          path={`${pathPrefix}/login`}
          handler={require('./flux/views/pages/LoginPage.jsx')} />
        <Location
          path={`${pathPrefix}/logout`}
          handler={require('./flux/views/pages/LogoutPage.jsx')} />
        <Location
          path={`${pathPrefix}/profile`}
          handler={require('./flux/views/pages/ProfilePage.jsx')} />
      </Locations>
    </CaptureClicks>;
  }
};