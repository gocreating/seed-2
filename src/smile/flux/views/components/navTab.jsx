import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import {Link} from 'react-router';
import UserStore from '../../stores/UserStore';

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
      title: 'record',
      to: `/smile/record?${userParams}`,
    }, {
      title: 'blog',
      to: `/smile/blog?${userParams}`,
    }, {
      title: 'chat',
      to: `/smile/chat?${userParams}`,
    }, {
      title: 'information',
      to: `/smile/information?${userParams}`,
    }, {
      title: 'profile',
      to: `/smile/profile?${userParams}`,
    }, ];

    return (
      <ul className="nav-tab">
        {links.map((link, idx) => {
          return <li key={idx}>
            <Link to={link.to}>
              <img src={`/smile/nav_icon/${link.title}.png`} />
            </Link>
          </li>;
        })}
      </ul>
    );
  }
};

export default connectToStores(NavTab);