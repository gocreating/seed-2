import React from 'react';

import connectToStores from 'alt/utils/connectToStores';
import UserStore from '../../stores/UserStore';
import UserActions from '../../actions/UserActions';

import AppLayout from '../layouts/AppLayout.jsx';

@connectToStores
export default class LoginPage extends React.Component {
  static getStores() {
    return [UserStore];
  }

  static getPropsFromStores() {
    return UserStore.getState();
  }

  _onInputChange(changedInput, e) {
    let inputPair = {};
    inputPair[changedInput] = e.target.value;
    UserActions.updateInput(inputPair);
  }

  _onSubmit(e) {
    e.preventDefault();
    UserActions.login({
      username: this.props.input.loginUsername,
      password: this.props.input.loginPassword,
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
            value={this.props.input.loginUsername}
            onChange={this._onInputChange.bind(this, 'loginUsername')} />
        </div>

        <div>
          <input
            type="password"
            placeholder="password"
            value={this.props.input.loginPassword}
            onChange={this._onInputChange.bind(this, 'loginPassword')} />
        </div>

        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </AppLayout>;
  }
};