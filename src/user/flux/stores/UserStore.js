import alt from '../../../core/flux/alt';
import UserActions from '../actions/UserActions';

class UserStore {
  constructor() {
    this.bindActions(UserActions);
    this.input = {
      username: '',
      password: '',
    };
    this.user = {};

    if (process.env.BROWSER) {
      // client-side render
      this.token = localStorage.getItem('token');
    } else {
      // server-side render
      this.token = '';
    }
  }

  onUpdateInput(newInput) {
    if (newInput.username !== undefined) {
      this.input.username = newInput.username;
    }
    if (newInput.password !== undefined) {
      this.input.password = newInput.password;
    }
  }

  onLoginDone(res) {
    this.token = res.data.bearerToken;
    this.user = res.data.user;
    localStorage.setItem('token', this.token);
    console.log(res);
  }

  onLoginFail(res) {
    console.log('login fail');
    console.log(res);
  }

  onLogoutDone(res) {
    this.token = '';
    localStorage.removeItem('token');
    console.log(res);
  }

  onLogoutFail(res) {
    console.log('logout fail');
    console.log(res);
  }
}

export default alt.createStore(UserStore, 'UserStore');