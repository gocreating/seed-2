import React from 'react';

import connectToStores from 'alt/utils/connectToStores';
import UserStore from '../../stores/UserStore';

import loginRequired from '../../decorators/loginRequired';
import AppLayout from '../layouts/AppLayout.jsx';

@loginRequired()
@connectToStores
export default class ProfilePage extends React.Component {
  static getStores() {
    return [UserStore];
  }

  static getPropsFromStores() {
    return UserStore.getState();
  }

  render() {
    console.log(this.props.user);
    return <AppLayout>
      <h1>Profile</h1>
      <p>This is a private page, only authenticated user can access</p>
      <dl>
        <dt>Token</dt>
        <dd>{this.props.token}</dd>
      </dl>
    </AppLayout>;
  }
};