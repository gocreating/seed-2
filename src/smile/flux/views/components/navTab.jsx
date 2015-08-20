import React from 'react';
import {Link} from 'react-router';

if (process.env.BROWSER) {
  require('../../../public/less/navTab.less');
}

export default class NavTab extends React.Component {
  render() {
    return (
      <ul className="nav-tab">
        {this.props.links.map((link, idx) => {
          return <li key={idx}>
            <Link to={link.to}>{link.title}</Link>
          </li>;
        })}
      </ul>
    );
  }
};

NavTab.defaultProps = {
  links: [{
    title: 'Record',
    to: `/smile/record`,
  }, {
    title: 'Blog',
    to: `/smile/blog`,
  }, {
    title: 'Chat',
    to: `/smile/chat`,
  }, {
    title: 'Information',
    to: `/smile/information`,
  }, {
    title: 'Profile',
    to: `/smile/profile`,
  }, ],
};