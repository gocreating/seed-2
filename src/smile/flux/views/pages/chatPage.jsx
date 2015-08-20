import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import MessageStore from '../../stores/MessageStore';
import UserStore from '../../stores/UserStore';
import MessageActions from '../../actions/MessageActions';
import UserActions from '../../actions/UserActions';
import MessageItem from '../components/messageItem.jsx';
import SmileLayout from '../layouts/smileLayout.jsx';

const ENTER_KEY_CODE = 13;

function getParameterByName(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ?
    '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

class ChatPage extends React.Component {
  static getStores() {
    return [MessageStore, UserStore];
  }

  static getPropsFromStores() {
    return MessageStore.getState();
  }

  componentDidMount() {
    UserActions.setId({
      fromId: getParameterByName('from'),
      toId: getParameterByName('to'),
    });
    MessageActions.download(
      UserStore.getState().fromId,
      UserStore.getState().toId
    );
  }

  _onChange(e) {
    MessageActions.updateUserInput(e.target.value);
  }

  _onKeyDown(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      MessageActions.send(
        UserStore.getState().fromId,
        UserStore.getState().toId,
        this.props.userInput
      );
      MessageActions.updateUserInput('');
    }
  }

  render() {
    return <SmileLayout>
      <h1>醫師諮詢</h1>
      <ul>
        {this.props.messages.map((msg, idx) => (
          <MessageItem key={idx} {...msg} />
        ))}
      </ul>
      <input
        type="text"
        value={this.props.userInput}
        onChange={this._onChange.bind(this)}
        onKeyDown={this._onKeyDown.bind(this)} />
    </SmileLayout>;
  }
};

export default connectToStores(ChatPage);