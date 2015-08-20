import alt from '../alt';

class UserActions {
  constructor() {
    this.generateActions(
      'setIdSuccess',
      'setIdFail',
      'setName'
    );
  }

  setId(ids) {
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