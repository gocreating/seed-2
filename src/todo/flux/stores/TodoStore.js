import alt from '../alt';
import TodoActions from '../actions/TodoActions'

class TodoStore {
  constructor() {
    this.bindActions(TodoActions);
    this.todos = [];
  }

  onDownloadTodosSuccess(todos) {
    this.todos = this.todos.concat(todos);
  }

  onCreate(todo) {
    this.todos = this.todos.concat(todo);
    console.log(this.todos);
  }

  onDestroy(id) {
    this.todos = this.todos.filter((todo) => {
      return todo.id != id;
    });
  }
}

export default alt.createStore(TodoStore, 'TodoStore');