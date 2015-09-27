import alt from '../alt';

var $ = require('jquery');

class TodoActions {
  constructor() {
    this.generateActions(
      'updateCurrentInput',
      'createSuccess',
      'createFail',
      'downloadSuccess',
      'downloadFail',
      'destroySuccess',
      'destroyFail'
    );
  }

  create(todo) {
    return $.ajax({
      method: 'POST',
      url: '/api/todos',
      data: todo,
      success: function(res) {
        this.actions.createSuccess(res);
      }.bind(this),
      error: function(res) {
        this.actions.createFail(res);
      }.bind(this),
    });
  }

  download() {
    return $.ajax({
      method: 'GET',
      url: '/api/todos',
      data: {},
      success: function(res) {
        this.actions.downloadSuccess(res);
      }.bind(this),
      error: function(res) {
        this.actions.downloadFail(res);
      }.bind(this),
    });
  }

  destroy(id) {
    return $.ajax({
      method: 'DELETE',
      url: '/api/todos/' + id,
      data: {},
      success: function(res) {
        this.actions.destroySuccess(res);
      }.bind(this),
      error: function(res) {
        this.actions.destroyFail(res);
      }.bind(this),
    });
  }
}

export default alt.createActions(TodoActions);