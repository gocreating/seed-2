import React from 'react';
import TodoStore from '../../stores/TodoStore';
import TodoActions from '../../actions/TodoActions';

const ENTER_KEY_CODE = 13;

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = TodoStore.getState();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    TodoStore.listen(this._onChange);
  }

  componentWillUnmount() {
    TodoStore.unlisten(this._onChange);
  }

  _onChange() {
    this.setState(TodoStore.getState());
  }

  _onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      const id = (
        +new Date() +
        Math.floor(Math.random() * 999999)
      ).toString(36);
      TodoActions.updateTodo(id, event.target.value);
    }
  }

  render() {
    return <div>
      <h1>Todo</h1>
      <input
          type="text"
          onKeyDown={this._onKeyDown} />
      <ul>
        {this.state.todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>;
  }
};