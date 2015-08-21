import alt from '../alt';

var $ = require('jquery');

class ArticleActions {
  constructor() {
    this.generateActions(
      'downloadAllSuccess',
      'downloadAllFail',
      'downloadByIdSuccess',
      'downloadByIdFail',
      'updateNewTitle',
      'updateNewContent',
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

  downloadById(id) {
    return $.ajax({
      method: 'GET',
      url: '/api/articles/' + id,
      success: function(res) {
        this.actions.downloadByIdSuccess(res);
      }.bind(this),
      error: function(res) {
        this.actions.downloadByIdFail(res);
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