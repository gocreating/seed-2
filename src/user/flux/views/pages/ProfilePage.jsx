import React from 'react';

import loginRequired from '../../decorators/loginRequired';
import AppLayout from '../layouts/AppLayout.jsx';

@loginRequired()
export default class ProfilePage extends React.Component {
  render() {
    return <AppLayout>
      <h1>Profile</h1>
      <p>{this.props.token}</p>
    </AppLayout>;
  }
};