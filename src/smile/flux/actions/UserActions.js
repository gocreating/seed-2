import alt from '../alt';

function getParameterByName(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ?
    '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

class UserActions {
  constructor() {
    this.generateActions(
      'setIdSuccess',
      'setIdFail',
      'setName'
    );
  }

  setId() {
    const ids = {
      fromId: getParameterByName('from'),
      toId: getParameterByName('to'),
    };

    this.actions.setIdSuccess({...ids});
    $.ajax({
      method: 'GET',
      url: `/api/users/${ids.fromId}/name`,
      data: {},
      success: function(fromUserName) {
        $.ajax({
          method: 'GET',
          url: `/api/users/${ids.toId}/name`,
          data: {},
          success: function(toUserName) {
            this.actions.setName({
              fromUserName: fromUserName,
              toUserName: toUserName,
            });
          }.bind(this),
        });
      }.bind(this),
    });
  }
}

export default alt.createActions(UserActions);