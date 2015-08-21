import alt from '../alt';

var $ = require('jquery');

class InformationActions {
  constructor() {
    this.generateActions(
      'downloadAllSuccess',
      'downloadAllFail',
      'downloadByIdSuccess',
      'downloadByIdFail'
    );
  }

  downloadAll() {
    return $.ajax({
      method: 'GET',
      url: '/api/informations',
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
      url: '/api/informations/' + id,
      success: function(res) {
        this.actions.downloadByIdSuccess(res);
      }.bind(this),
      error: function(res) {
        this.actions.downloadByIdFail(res);
      }.bind(this),
    });
  }
}

export default alt.createActions(InformationActions);