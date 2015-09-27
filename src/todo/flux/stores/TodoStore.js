import alt from '../alt';
import TodoActions from '../actions/TodoActions';

class TodoStore {
  constructor() {
    this.bindActions(TodoActions);
    this.currentInput = '';
    this.todos = [];
  }

  onDownloadSuccess(todos) {
    this.todos = this.todos.concat(todos);
  }

  onUpdateCurrentInput(newInput) {
    this.currentInput = newInput;
  }

  onCreateSuccess(todo) {
    this.currentInput = '';
    this.todos = this.todos.concat(todo);
  }

  onDestroySuccess(destroyedTodo) {
    this.todos = this.todos.filter((todo) => {
      return todo.id != destroyedTodo.id;
    });
  }
}

export default alt.createStore(TodoStore, 'TodoStore');