import alt from '../alt';

var $ = require('jquery');

class TodoActions {
  constructor() {
    this.generateActions(
      // 'updateCurrentInput',
      'create',
      'downloadTodosSuccess',
      'downloadTodosFail',
      'destroy'
    );
  }

  downloadTodos() {
    return $.ajax({
      method: 'GET',
      url: '/api/todos',
      data: {},
      success: function(res) {
        this.actions.downloadTodosSuccess(res);
      }.bind(this),
      error: function(res) {
        this.actions.downloadTodosFail(res);
      }.bind(this),
    });
  }
}

export default alt.createActions(TodoActions);