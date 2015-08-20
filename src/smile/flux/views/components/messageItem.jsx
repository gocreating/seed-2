import React from 'react';
import UserStore from '../../stores/UserStore';
import MessageActions from '../../actions/MessageActions';

const ENTER_KEY_CODE = 13;

export default class Todo extends React.Component {
  render() {
    return <li>
      {
        this.props.fromUserId === UserStore.getState().userId?
        UserStore.getState().fromUserName:
        UserStore.getState().toUserName
      }:
      {this.props.text}
    </li>;
  }
};