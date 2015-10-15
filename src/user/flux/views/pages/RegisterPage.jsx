import React from 'react';

import connectToStores from 'alt/utils/connectToStores';
import UserStore from '../../stores/UserStore';
import UserActions from '../../actions/UserActions';

import AppLayout from '../layouts/AppLayout.jsx';

@connectToStores
export default class RegisterPage extends React.Component {
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
    UserActions.register({
      name: this.props.input.registerName,
      username: this.props.input.registerUsername,
      password: this.props.input.registerPassword,
    });
  }

  render() {
    return <AppLayout>
      <h1>Register</h1>

      <form onSubmit={this._onSubmit.bind(this)}>
        <div>
          <input
            type="text"
            placeholder="name"
            value={this.props.input.registerName}
            onChange={this._onInputChange.bind(this, 'registerName')} />
        </div>

        <div>
          <input
            type="text"
            placeholder="username"
            value={this.props.input.registerUsername}
            onChange={this._onInputChange.bind(this, 'registerUsername')} />
        </div>

        <div>
          <input
            type="password"
            placeholder="password"
            value={this.props.input.registerPassword}
            onChange={this._onInputChange.bind(this, 'registerPassword')} />
        </div>

        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </AppLayout>;
  }
};