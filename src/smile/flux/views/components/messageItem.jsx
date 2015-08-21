import React from 'react';
import UserStore from '../../stores/UserStore';

export default class MessageItem extends React.Component {
  render() {
    return <li>
      {
        this.props.fromUserId == UserStore.getState().fromId?
        UserStore.getState().fromUserName:
        UserStore.getState().toUserName
      }:
      {this.props.text}
    </li>;
  }
};