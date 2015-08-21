import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import MessageStore from '../../stores/MessageStore';
import UserStore from '../../stores/UserStore';
import MessageActions from '../../actions/MessageActions';
import UserActions from '../../actions/UserActions';
import MessageItem from '../components/messageItem.jsx';
import SmileLayout from '../layouts/smileLayout.jsx';

const ENTER_KEY_CODE = 13;

class BlogPage extends React.Component {
  static getStores() {
    return [MessageStore];
  }

  static getPropsFromStores() {
    return MessageStore.getState();
  }

  componentDidMount() {
    UserActions.setId();
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
      <div className="chat-container">
        <h1>交流</h1>
        <ul className="message-list">
          {this.props.messages.map((msg, idx) => (
            <MessageItem key={idx} {...msg} />
          ))}
        </ul>
        <input
          type="text"
          value={this.props.userInput}
          onChange={this._onChange.bind(this)}
          onKeyDown={this._onKeyDown.bind(this)} />
      </div>
    </SmileLayout>;
  }
};

export default connectToStores(BlogPage);