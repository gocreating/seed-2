import alt from '../alt';

var $ = require('jquery');

class TodoActions {
  constructor() {
    this.generateActions(
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
        // console.log(JSON.parse(res.responseText));
        // this.actions.downloadTodosFail(res);
        this.actions.downloadTodosSuccess(JSON.parse(res.responseText));
      }.bind(this),
    });
  }
}

export default alt.createActions(TodoActions);