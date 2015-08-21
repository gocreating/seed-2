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
    const userParams = `from=${this.props.fromId}&to=${this.props.toId}`;
    const links = [{
      title: 'Record',
      to: `/smile/record`,
    }, {
      title: 'Blog',
      to: `/smile/blog?${userParams}`,
    }, {
      title: 'Chat',
      to: `/smile/chat?${userParams}`,
    }, {
      title: 'Information',
      to: `/smile/information`,
    }, {
      title: 'Profile',
      to: `/smile/profile`,
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

// NavTab.defaultProps = {
//   links: [{
//     title: 'Record',
//     to: `/smile/record`,
//   }, {
//     title: 'Blog',
//     to: `/smile/blog?from=${UserStore.getState().fromId}&to=${UserStore.getState().toId}`,
//   }, {
//     title: 'Chat',
//     to: `/smile/chat`,
//   }, {
//     title: 'Information',
//     to: `/smile/information`,
//   }, {
//     title: 'Profile',
//     to: `/smile/profile`,
//   }, ],
// };

export default connectToStores(NavTab);