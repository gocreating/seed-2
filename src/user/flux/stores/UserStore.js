import alt from '../../../core/flux/alt';
import UserActions from '../actions/UserActions';

class UserStore {
  constructor() {
    this.bindActions(UserActions);
    this.input = {
      username: '',
      password: '',
    };

    if (process.env.BROWSER) {
      // client-side render
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      // server-side render
      this.token = '';
      this.user = {};
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
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  onLoginFail(res) {
    console.log('login fail');
  }

  onLogoutDone(res) {
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  onLogoutFail(res) {
    console.log('logout fail');
  }
}

export default alt.createStore(UserStore, 'UserStore');