import alt from '../../../core/flux/alt';
import React from 'react';
import {Location} from 'react-router-component';

var $ = require('jquery');

class UserActions {
  constructor() {
    this.generateActions(
      'updateInput',
      'registerDone',
      'registerFail',
      'loginDone',
      'loginFail',
      'logoutDone',
      'logoutFail',
    );
  }

  register(input) {
    return $.ajax({
      method: 'POST',
      url: '/api/users',
      data: input,
    })
    .done(res => {
      if (res.errors.length === 0) {
        this.actions.registerDone(res);
        location.href = '/user/profile';
      } else {
        this.actions.registerFail(res);
      }
    }.bind(this))
    .fail(jqXHR => {
      this.actions.registerFail(jqXHR.responseText);
    }.bind(this));
  }

  login(input) {
    return $.ajax({
      method: 'POST',
      url: '/api/users/login',
      data: input,
    })
    .done(res => {
      if (res.errors.length === 0) {
        this.actions.loginDone(res);
        location.href = '/user/profile';
      } else {
        this.actions.loginFail(res);
      }
    }.bind(this))
    .fail(jqXHR => {
      this.actions.loginFail(jqXHR.responseText);
    }.bind(this));
  }

  logout() {
    return $.ajax({
      method: 'GET',
      url: '/api/users/logout',
    })
    .done(res => {
      if (res.errors.length === 0) {
        this.actions.logoutDone(res);
        location.href = '/';
      } else {
        this.actions.logoutFail(res);
      }
    }.bind(this))
    .fail(jqXHR => {
      this.actions.logoutFail(jqXHR.responseText);
    }.bind(this));
  }
}

export default alt.createActions(UserActions);