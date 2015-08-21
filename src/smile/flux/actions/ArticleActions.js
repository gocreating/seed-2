import alt from '../alt';

var $ = require('jquery');

class ArticleActions {
  constructor() {
    this.generateActions(
      'downloadAllSuccess',
      'downloadAllFail',
      'updateUserInput',
      'postSuccess',
      'postFail'
    );
  }

  downloadAll() {
    return $.ajax({
      method: 'GET',
      url: '/api/articles',
      success: function(res) {
        this.actions.downloadAllSuccess(res);
      }.bind(this),
      error: function(res) {
        this.actions.downloadAllFail(res);
      }.bind(this),
    });
  }

  post(authorUserId, title, content) {
    return $.ajax({
      method: 'POST',
      url: '/api/articles',
      data: {
        authorUserId: authorUserId,
        title: title,
        content: content,
      },
      success: function(res) {
        this.actions.postSuccess(res);
      }.bind(this),
      error: function(res) {
        this.actions.postFail(res);
      }.bind(this),
    });
  }
}

export default alt.createActions(ArticleActions);