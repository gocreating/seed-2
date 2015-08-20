import React from 'react';
import TodoActions from '../../actions/TodoActions';

const ENTER_KEY_CODE = 13;

export default class Todo extends React.Component {
  _onBtnRemoveClick() {
    TodoActions.destroy(this.props.id);
  }

  render() {
    return <li>
      {this.props.text}
      <button onClick={this._onBtnRemoveClick.bind(this)}>x</button>
    </li>;
  }
};