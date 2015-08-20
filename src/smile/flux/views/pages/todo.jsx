import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import TodoStore from '../../stores/TodoStore';
import TodoActions from '../../actions/TodoActions';
var TodoItem = require('../components/todoItem.jsx');

const ENTER_KEY_CODE = 13;

class Todo extends React.Component {
  static getStores() {
    return [TodoStore];
  }

  static getPropsFromStores() {
    return TodoStore.getState();
  }

  componentDidMount() {
    TodoActions.downloadTodos();
  }

  _onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      const id = (
        +new Date() +
        Math.floor(Math.random() * 999999)
      ).toString(36);
      TodoActions.create({
        id: id,
        text: event.target.value,
      });
    }
  }

  render() {
    return <div>
      <h1>Todo</h1>
      <input
        type="text"
        value={this.props.currentInput}
        onKeyDown={this._onKeyDown.bind(this)} />
      <ul>
        {this.props.todos.map((todo) => (
          <TodoItem key={todo.id} id={todo.id} text={todo.text} />
        ))}
      </ul>
    </div>;
  }
};

export default connectToStores(Todo);