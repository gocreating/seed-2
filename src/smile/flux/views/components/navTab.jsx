import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import {Link} from 'react-router';
import UserStore from '../../stores/UserStore';

if (process.env.BROWSER) {
  require('../../../public/less/navTab.less');
}

class NavTab extends React.Component {
  static getStores() {
    return [UserStore];
  }

  static getPropsFromStores() {
    return UserStore.getState();
  }

  render() {
    const userParams = this.props.userParams;
    const links = [{
      title: 'Record',
      to: `/smile/record?${userParams}`,
    }, {
      title: 'Blog',
      to: `/smile/blog?${userParams}`,
    }, {
      title: 'Chat',
      to: `/smile/chat?${userParams}`,
    }, {
      title: 'Information',
      to: `/smile/information?${userParams}`,
    }, {
      title: 'Profile',
      to: `/smile/profile?${userParams}`,
    }, ];

    return (
      <ul className="nav-tab">
        {links.map((link, idx) => {
          return <li key={idx}>
            <Link to={link.to}>{link.title}</Link>
          </li>;
        })}
      </ul>
    );
  }
};

export default connectToStores(NavTab);