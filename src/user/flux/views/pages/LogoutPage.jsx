import React from 'react';

import UserActions from '../../actions/UserActions';

import AppLayout from '../layouts/AppLayout.jsx';

class LogoutPage extends React.Component {
  componentDidMount() {
    UserActions.logout();
  }

  render() {
    return <AppLayout />;
  }
};

export default LogoutPage;