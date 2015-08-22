import React from 'react';
import UserStore from '../../stores/UserStore';

export default class MessageItem extends React.Component {
  render() {
    let pull = '';
    if (this.props.fromUserId == UserStore.getState().fromId) {
      pull = 'pull-right';
    } else {
      pull = 'pull-left';
    }
    return <li>
      <span className={'speaker ' + pull}>
        {
          this.props.fromUserId == UserStore.getState().fromId?
          UserStore.getState().fromUserName:
          UserStore.getState().toUserName
        }
      </span>
      <span className={'text ' + pull}>
        {this.props.text}
        {
          this.props.text == this.props.textTranslate?
          '':
          '(' + this.props.textTranslate + ')'
        }
      </span>
    </li>;
  }
};