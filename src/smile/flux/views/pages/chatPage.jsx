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

  // componentWillUpdate() {
  //   var node = this.getDOMNode();
  //   this.shouldScrollBottom = node.scrollTop +
  //     node.offsetHeight === node.scrollHeight;
  // }

  // componentDidUpdate() {
  //   if (this.shouldScrollBottom) {
  //     var node = this.getDOMNode();
  //     node.scrollTop = node.scrollHeight;
  //   }
  // }

  render() {
    return <SmileLayout>
      <div className="chat-container">
        <ul className="message-list">
          {this.props.messages.map((msg, idx) => (
            <MessageItem key={idx} {...msg} />
          ))}
        </ul>
        <input
          className="inputbox"
          type="text"
          value={this.props.userInput}
          onChange={this._onChange.bind(this)}
          onKeyDown={this._onKeyDown.bind(this)} />
      </div>
    </SmileLayout>;
  }
};

export default connectToStores(ChatPage);