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

  componentDidMount() {
    console.log(this.props.user);
  }

  render() {
    return <AppLayout>
      <h1>Profile</h1>
      <p>This is a private page, only authenticated user can access</p>
      <dl>
        <dt>User Information</dt>
        <dd>
          <dl>
            <dt>Id</dt>
            <dd>{this.props.user.id}</dd>

            <dt>Name</dt>
            <dd>{this.props.user.name}</dd>

            <dt>Username</dt>
            <dd>{this.props.user.username}</dd>

            <dt>Group</dt>
            <dd>{this.props.user.group.name}</dd>

            <dt>Permissions</dt>
            <dd>
              <ul>
                {this.props.user.group.Permissions.map(perm => {
                  return <li>{perm.name}</li>;
                })}
              </ul>
            </dd>
          </dl>
        </dd>

        <dt>Token</dt>
        <dd>{this.props.token}</dd>
      </dl>
    </AppLayout>;
  }
};