import React from 'react';

import connectToStores from 'alt/utils/connectToStores';
import UserStore from '../stores/UserStore';

import UnauthorizedPage from '../views/pages/UnauthorizedPage.jsx';

export default options => {
  return DecoratedComponent => {
    @connectToStores
    class LoginRequired extends React.Component {
      static getStores() {
        return [UserStore];
      }

      static getPropsFromStores() {
        return UserStore.getState();
      }

      render() {
        if (this.props.token) {
          return (
            <DecoratedComponent />
          );
        } else {
          return <UnauthorizedPage />;
        }
      }
    };

    return LoginRequired;
  };
};