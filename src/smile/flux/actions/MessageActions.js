import alt from '../alt';

var $ = require('jquery');

class MessageActions {
  constructor() {
    this.generateActions(
      'downloadSuccess',
      'downloadFail',
      'updateUserInput',
      'updateUserInput',
      'sendSuccess',
      'sendFail'
    );
  }

  download(fromId, toId) {
    return $.ajax({
      method: 'GET',
      url: '/api/messages',
      data: {
        fromUserId: fromId,
        toUserId: toId,
      },
      success: function(res) {
        this.actions.downloadSuccess(res);
      }.bind(this),
      error: function(res) {
        // console.log(JSON.parse(res.responseText));
        // this.actions.downloadTodosFail(res);
        this.actions.downloadSuccess(JSON.parse(res.responseText));
      }.bind(this),
    });
  }

  send(fromId, toId, text) {
    return $.ajax({
      method: 'POST',
      url: '/api/messages',
      data: {
        fromUserId: fromId,
        toUserId: toId,
        text: text,
      },
      success: function(res) {
        this.actions.sendSuccess(res);
      }.bind(this),
      error: function(res) {
        // console.log(JSON.parse(res.responseText));
        // this.actions.downloadTodosFail(res);
        this.actions.sendSuccess(JSON.parse(res.responseText));
      }.bind(this),
    });
  }
}

export default alt.createActions(MessageActions);