import React from 'react';

import connectToStores from 'alt/utils/connectToStores';
import UserStore from '../../stores/UserStore';
import UserActions from '../../actions/UserActions';

import AppLayout from '../layouts/AppLayout.jsx';

@connectToStores
class LoginPage extends React.Component {
  static getStores() {
    return [UserStore];
  }

  static getPropsFromStores() {
    return UserStore.getState();
  }

  _onTxtUsernameChange(e) {
    UserActions.updateInput({username: e.target.value});
  }

  _onTxtPasswordChange(e) {
    UserActions.updateInput({password: e.target.value});
  }

  _onSubmit(e) {
    e.preventDefault();
    UserActions.login({
      username: this.props.input.username,
      password: this.props.input.password,
    });
  }

  render() {
    return <AppLayout>
      <h1>Login</h1>

      <form onSubmit={this._onSubmit.bind(this)}>
        <div>
          <input
            type="text"
            placeholder="username"
            value={this.props.input.username}
            onChange={this._onTxtUsernameChange.bind(this)} />
        </div>

        <div>
          <input
            type="text"
            placeholder="password"
            value={this.props.input.password}
            onChange={this._onTxtPasswordChange.bind(this)} />
        </div>

        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </AppLayout>;
  }
};

export default LoginPage;