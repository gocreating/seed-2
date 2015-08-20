import alt from '../alt';
import UserActions from '../actions/UserActions'
import $ from 'jquery';

class UserStore {
  constructor() {
    this.bindActions(UserActions);
    this.userId = 0;
    this.fromId = 0;
    this.fromUserName = '';
    this.toId = 0;
    this.toUserName = '';
  }

  onSetIdSuccess(data) {
    this.userId = parseInt(data.fromId);
    this.fromId = parseInt(data.fromId);
    this.toId = parseInt(data.toId);
  }

  onSetName(data) {
    this.fromUserName = data.fromUserName;
    this.toUserName = data.toUserName;
  }
}

export default alt.createStore(UserStore, 'UserStore');