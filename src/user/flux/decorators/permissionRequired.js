import React from 'react';

import connectToStores from 'alt/utils/connectToStores';
import UserStore from '../stores/UserStore';

import ForbiddenPage from '../views/pages/ForbiddenPage.jsx';

export default requiredPermissions => {
  return DecoratedComponent => {
    @connectToStores
    class permissionRequired extends React.Component {
      static getStores() {
        return [UserStore];
      }

      static getPropsFromStores() {
        return UserStore.getState();
      }

      render() {
        let userPermissions = this.props.user.group.Permissions.map(
          permissionObj => permissionObj.name
        );

        if (requiredPermissions instanceof Array) {
          for (let requiredPermission of requiredPermissions) {
            if (userPermissions.indexOf(requiredPermission) === -1) {
              return <ForbiddenPage />;
            }
          }
        } else {
          if (userPermissions.indexOf(requiredPermissions) === -1) {
            return <ForbiddenPage />;
          }
        }

        return <DecoratedComponent />;
      }
    };

    return permissionRequired;
  };
};